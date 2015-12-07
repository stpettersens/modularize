/*
        modularize
        Simple utility to wrap JavaScript code into AMD modules.

        Copyright 2015 Sam Saint-Pettersen.

        Released under the MIT License.
*/

/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/chalk/chalk.d.ts" />

import fs = require('fs');
import chalk = require('chalk');

class Modularize {

	private version: string;
	private colors: boolean;
	private verbose: boolean;
	private dependencies: string[];
	private input: string;
	private output: string;

	/**
	 * Print an error message.
	 * @param message Error message to print.
	*/
	private printError(message: string): void {
		if (this.colors) {
			console.log(chalk.bold.red(message));
		}
		else console.log(message);
	}

	/**
	 * Print an information message.
	 * @param message Informatiom message to print.
	*/
	private printInfo(message: string): void {
		if (this.colors) {
			console.log(chalk.gray(message));
		}
		else console.log(message);
	}

	/**
	 * Highlight some text.
	 * @param text Text to highlight.
	 * @returns Hilighted text.
	*/
	private hilight(text: string): any {
		if (this.colors) {
			return chalk.yellow(text);
		}
		return text;
	}

	/**
 	 * Some text to embolden.
 	 * @param text Text to embolden.
 	 * @returns Bold text.
	*/
	private embolden(text: string): any {
	        if (this.colors) {
	            return chalk.bold.white(text);
	        }
	        return text;
	}
	
	/**
	 * Display help information and exit.
	*/
	private displayHelp(): void {
		this.printInfo('Simple utility to wrap JavaScript code into AMD modules.');
		this.printInfo(`Copyright 2015 Sam Saint-Pettersen ${this.hilight('[MIT License].')}`)
		console.log(`\nUsage: ${this.embolden('modularize')} input output [[\'dependency:symbol\']][-q|--quiet][-n|--no-colors]`);
		console.log('[-h|--help|-v|--version]');
		console.log('\n input                     : Input file to wrap as a module.');
		console.log(' output                    : Output file wrapped as a module.');
		console.log(' [\'dependency:symbol\']     : Array of dependency:symbol(s).');
		console.log(' -q | --quiet              : Be less verbose (only error output).');
		console.log(' -c | --no-colors          : Don\'t use colorful output.');
		console.log(' -h | --help               : Display this usage information and exit.');
		console.log(' -v | --version            : Display application version and exit.');
	}

	/**
	 * Display version and exit.
	*/
	private displayVersion(): void {
		this.printInfo('modularize v. ' + this.version);
		process.exit(0);
	}
	
	/**
	 * Compile the output.
	*/
	private compile(): void {
		let lines = new Array<string>();
		let reqs = new Array<string>();
		let syms = new Array<string>();

		this.dependencies.map(function(dependency: string) {
			let rs: string[] = dependency.split(':');
			reqs.push(rs[0]);
			syms.push(rs[1]);
		});

		reqs = reqs.map(function(req: string) {
			return "'" + req + "'";
		});

		let content: string = fs.readFileSync(this.input, 'utf8');
		lines = content.split('\n');
		lines = lines.map(function(line: string) {
			return '\t' + line;
		})
		lines.unshift(`require([${reqs.join(',')}], function(${syms.join(',')}) {`);
		lines.push('});');
		fs.writeFileSync(this.output, lines.join('\n'));
    }

    /**
     * Modularize implements functionality of modularize  program.
     * @constructor
     * @param input JavaScript file to wrap as a module.
     * @param dependencies Array of dependencies for module. 
    */
    constructor(input: string, output: string, dependencies: string, option?: string) {

		this.version = '0.1';
		this.colors = true;
		this.verbose = true;
		this.dependencies = new Array<string>();
		this.input = input;
		this.output = output;

		if (option == '-q' || option == '--quiet')
			this.verbose = false;

		if (option == '-c' || option == '--no-colors')
			this.colors = false;

		if (dependencies  != null && dependencies.charAt(0) == '[') {
			this.dependencies = JSON.parse(dependencies.replace(/'/g, '"'));
		}

		if(input == '-h' || input == '--help') {
			this.displayHelp();
			process.exit(0);
		}
		else if(input == '-v' || input == '--version') {
			this.displayVersion();
		}

		if(input == null || input.charAt(0) == '-') {
			this.printError('Please specify a valid input file.\n');
			this.displayHelp();
			process.exit(1);
		}

		if(output == null || output.charAt(0) == '-') {
			this.printError('Please specifiy an output file.\n');
			this.displayHelp();
			process.exit(1);
		}

		if(this.verbose) 
			this.printInfo(`Wrapping as module: ${this.embolden(input)}`);

		this.compile();
	}
}
export = Modularize;
