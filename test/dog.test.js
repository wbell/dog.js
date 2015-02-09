var chai = require('chai'),
  spies = require('chai-spies'),
  loadModule = require('./module-loader').loadModule;

  chai.use(spies);

var should = chai.should(),
  expect = chai.expect,
  assert = chai.assert;

var Dog = require('../src/dog');

describe('Dog', function() {
  var dog = null;

  describe('Constructor', function() {

    afterEach(function() {
      dog = null;
      Dog.prototype.defaultSounds = ["woof", "bow wow", "growl"];
    });

    it('should be an instance of Dog', function(){
      dog = new Dog();

      expect(dog).to.be.an.instanceof(Dog);
    });

    it('should be an instance of Dog when initialized without "new"', function(){
      dog = Dog();

      expect(dog).to.be.an.instanceof(Dog);
    });

    it('should have some default properties set', function() {
      dog = new Dog();

      expect(dog.owner).to.equal('Jessica');
      expect(dog.name).to.equal('Crap Dog');
      expect(dog.age).to.be.a('number');
      expect(dog.age).to.equal(13);
      expect(dog.color).to.equal('doo doo brown');
      expect(dog.breed).to.equal('Turd Terrier');
      expect(dog.hobbies).to.have.length(3);
      expect(dog.defaultSounds).to.have.length(3);
      expect(dog.sounds).to.have.length(3);

    });

    it('should populate properties correctly when options are passed', function() {
      dog = new Dog({
        owner: "Willie Bell",
        name: "Sparky",
        age: 2,
        color: "greenish burgundy",
        breed: "Alpha Mutt",
        hobbies: ["eating human food", "sleeping on the evidence"],
        sounds: ["brap", "derp"]
      });

      expect(dog.owner).to.equal('Willie Bell');
      expect(dog.name).to.equal('Sparky');
      expect(dog.age).to.be.a('number');
      expect(dog.age).to.equal(2);
      expect(dog.color).to.equal('greenish burgundy');
      expect(dog.breed).to.equal('Alpha Mutt');
      expect(dog.hobbies).to.have.length(2);
      expect(dog.sounds).to.have.length(5);
    });

    it('should allow you to overwrite the default sounds array', function(){
      Dog.prototype.defaultSounds = ["woof", "bow wow", "growl", "howl"];

      dog = new Dog();

      expect(dog.defaultSounds).to.have.length(4);
      expect(dog.sounds).to.have.length(4);
    });

    it('should accept sounds as a comma separated list', function(){
      dog = new Dog({
        sounds: "brap, derp"
      });

      expect(dog.sounds).to.have.length(5);
    });

  });

  describe('#bio()', function() {
    afterEach(function() {
      dog = null;
    });

    it('should return a few sentences describing the dog', function() {
      dog = new Dog();

      var bio = dog.bio();

      expect(bio).to.be.a('string');
      expect(bio.split('.')).to.have.length(5);

    });

    it('should accept an array of hobbies', function(){
      dog = new Dog({
        hobbies: ["farting", "killing", "pimping"]
      });

      var bio = dog.bio();

      expect(bio.indexOf("farting and killing and pimping")).to.be.a('number').and.not.equal(-1);
    });

    it('should accept a string of hobbies', function(){
      dog = new Dog({
        hobbies: "farting, killing, and pimping"
      });

      var bio = dog.bio();

      expect(bio.indexOf("farting, killing, and pimping")).to.be.a('number').and.not.equal(-1);
    });
  });

  describe('#bark()', function() {
    var dog = new Dog();

    it('should bark out what you tell it to', function(){
      var bark1 = dog.bark('my man!');

      expect(bark1).to.equal('Crap Dog says: my man!');
    });

    it('should bark dog things on its own', function(){
      var bark2 = dog.bark();

      expect(bark2).to.match(/(woof|bow wow|growl)/);
    });

    it('should run barked things through callback when possible', function(){
      var spy = chai.spy();
      var bark3 = dog.bark("TEST", spy);

      expect(spy).to.have.been.called();
      expect(spy).to.have.been.called.with('Crap Dog says: TEST');

    });
  });

});

describe("Exports", function(){

  describe("AMD", function(){

    it('should export as an AMD module when "define" and "define.amd" are defined', function(){
      var spy = chai.spy();

      var define = function(func){
        spy("Dog class");
      };

      define.amd = true;

      var mockDog = loadModule('./src/dog.js', {define:define});

      expect(spy).to.have.been.called();
      expect(spy).to.have.been.called.with("Dog class");

    });
  });

  describe("Node", function(){

    it('should have the Dog class on its module exports', function(){
      var mockDog = loadModule('./src/dog.js', {}).module.exports;
      var _doggy = new mockDog();
      var doggy = new Dog();

      expect(_doggy.name).to.equal(doggy.name);
    });

  });

  describe("Browser", function(){

    it('should export as a global var when "define" and "module" are missing', function(){

      var mockDog = loadModule('./src/dog.js', {define:null, module:{exports:null}, this:{}});

      expect(mockDog).to.have.property('Dog');

    });
  });

});
