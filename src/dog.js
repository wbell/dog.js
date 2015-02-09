(function(global) {
  'use strict';

  // Dog constructor
  //-----------------
  function Dog(params) {

    // If initialized without the `new` keyword
    // detect and re-initialize properly to prevent
    // pollution of the global namespace.
    if (!(this instanceof Dog)) {
      return new Dog(params);
    }

    // Cache reference to `this`.
    var _this = this;

    // Set params to object literal if left `undefined`.
    params = params || {};

    // Set public static properties on `Dog`.
    this.owner = params.owner || "Jessica";
    this.name = params.name || "Crap Dog";
    this.age = params.age || 13;
    this.color = params.color || "doo doo brown";
    this.breed = params.breed || "Turd Terrier";
    this.hobbies = params.hobbies || ["destroying furniture", "knocking the kids over", "dragging my butt on the white carpet"];

    // Add sounds with an [IIFE](http://en.wikipedia.org/wiki/Immediately-invoked_function_expression).
    this.sounds = (function(sounds) {
      if (sounds instanceof Array) {
        return _this.defaultSounds.concat(sounds);
      }

      if (typeof sounds === "string") {
        return _this.defaultSounds.concat(sounds.split(","));
      }

      return _this.defaultSounds;
    })(params.sounds);

  }

  // Prototype properties
  //------------------------
  // These properties and methods are shared amongst all instances of `Dog`.
  // They change accross the board when the prototype changes.

  // Array: Typical dog sounds.
  Dog.prototype.defaultSounds = ["woof", "bow wow", "growl"];

  // Method for generating dog bio. Returns a string.
  Dog.prototype.bio = function() {
    var paragraph = [];

    paragraph.push(sentences.intro(this));
    paragraph.push(sentences.description(this));
    paragraph.push(sentences.activities(this));

    return paragraph.join(" ");
  };

  // Method for barking it up. Returns a string, or string gets fed to a callback function.
  Dog.prototype.bark = function(str, cb) {
    var prefix = this.name + ' says: ',
      ret = prefix + ((typeof str === 'string') ? str : randomValue(this.sounds));

    if(typeof cb === 'function'){
      return cb(ret);
    } else {
      return ret;
    }

  };


  // Private methods
  //--------------------

  // Object used for generating sentences.
  var sentences = {
    intro: function(dog) {
      return "Hey guys I'm " + dog.owner + "'s canine companion, " + dog.name + ".";
    },
    description: function(dog) {
      return "I am a " + dog.age + " year old " + dog.color + " '" + dog.breed + "'.";
    },
    activities: function(dog) {
      var hobbies = (typeof dog.hobbies === "string" ? dog.hobbies : dog.hobbies.join(" and "));
      var sounds = (function(sounds) {
        var ss = [randomValue(sounds) + "!", randomValue(sounds) + "!"];
        return ss.join(" ");
      })(dog.sounds);

      return "My favorite activities include " + hobbies + ". " +
        "Plus I stay up all night going \"" + sounds + "\", " +
        "destroying any chance of " + dog.owner.split(' ')[0] + " getting 8hrs of sleep. >;]";
    }
  };

  // Utility functions
  function randomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }


  // Global Binding/Exports
  //-------------------------

  // AMD
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return Dog;
    });

    // Node and other CommonJS-like environments that support module.exports.
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Dog;

    // Browser
  } else {
    global.Dog = Dog;
  }

})(this);
