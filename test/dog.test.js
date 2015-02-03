var chai = require('chai'),
  should = chai.should(),
  expect = chai.expect,
  assert = chai.assert;

var Dog = require('../src/dog');

describe('Dog', function() {
  var dog = null;

  describe('constructor', function() {

    afterEach(function() {
      dog = null;
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
  });

});
