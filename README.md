# dog.js

[![Build Status](https://travis-ci.org/wbell/dog.js.svg?branch=master)](https://travis-ci.org/wbell/dog.js) [![Coverage Status](https://coveralls.io/repos/wbell/dog.js/badge.svg)](https://coveralls.io/r/wbell/dog.js) [![Dependency Status](https://david-dm.org/wbell/dog.js.svg)](https://david-dm.org/wbell/dog.js) [![npm version](https://badge.fury.io/js/dog.js.svg)](http://badge.fury.io/js/dog.js)

Excercise in travis ci, unit testing, code coverage, and npm. Ultimately a pointless javascript module with all of that dog flavor you love.

## Setup

`npm install dog.js`

## Usage

    var Dog = require('dog.js');

    var myDog = new Dog();

    console.log(myDog.bio());

## API

### Constructor: _new Dog(opts)_
Returns an instance of the dog class; aka a new doggie to play with!

#### opts
Type: `object`

Required: _no_

##### opts.owner
_Name of the dog's owner_

Type: `string`

Default: `"Jessica"`

##### opts.name
_Name of the dog_

Type: `string`

Default: `"Crap Dog"`

##### opts.age
_The dog's age in years_

Type: `number`

Default: `13`

##### opts.color
_Color of the dog_

Type: `string`

Default: `"doo doo brown"`

##### opts.breed
_The dog's breed_

Type: `string`

Default: `"Turd Terrier"`

##### opts.hobbies
_A list of the dog's hobbies_

Type: `array` or `string`

Default: `["destroying furniture", "knocking the kids over", "dragging my butt on the white carpet"]`

##### opts.sounds
_List of sounds that the dog makes_

Type: `array`

Default: `["woof", "bow wow", "growl"]`

### Methods

#### .bio()
_Returns a short bio of the dog instance you have created with `new Dog(opts)`_

Return Type: `string`

## To do:

- Add bark method
- Add method of getting dog photo using an api
- Make defaults less gross