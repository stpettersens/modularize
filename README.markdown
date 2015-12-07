# modularize
[![Build Status](https://travis-ci.org/stpettersens/modularize.png?branch=master)](https://travis-ci.org/stpettersens/modularize)
[![npm version](https://badge.fury.io/js/modularize.svg)](http://npmjs.org/package/modularize)
[![Dependency Status](https://david-dm.org/stpettersens/modularize.png?theme=shields.io)](https://david-dm.org/stpettersens/modularize) [![Development Dependency Status](https://david-dm.org/stpettersens/modularize/dev-status.png?theme=shields.io)](https://david-dm.org/stpettersens/modularize#info=devDependencies)

> :white_medium_square: Simple utility to wrap JavaScript code into AMD modules.

##### Install:

`npm install -g modularize`

##### Usage: 

```
Usage: modularize input output [['dependency:symbol']][-q|--quiet][-n|--no-colors]
[-h|--help|-v|--version]

 input                     : Input file to wrap as a module.
 output                    : Output file wrapped as a module.
 ['dependency:symbol']     : Array of dependency:symbol(s).
 -q | --quiet              : Be less verbose (only error output).
 -c | --no-colors          : Don't use colorful output.
 -h | --help               : Display this usage information and exit.
 -v | --version            : Display application version and exit.
 ```

##### Using Gulp or Grunt?

:tropical_drink: [gulp-modularize](http://github.com/stpettersens/gulp-modularize)
:boar: [grunt-vuecc](http://github.com/stpettersens/grunt-modularize)
