/*
	modularize
	Simple utility to wrap JavaScript code into AMD modules.

	Copyright 2015 Sam Saint-Pettersen.

	Released under the MIT License.
*/
import modularize = require('./modularize-lib');
new modularize(process.argv[2], process.argv[3], process.argv[4]);

