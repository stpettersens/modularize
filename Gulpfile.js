/**
 * Gulpfile for modularize.
*/
var gulp = require('gulp'),
     tsc = require('gulp-typescript')
  rename = require('gulp-rename'),
  insert = require('gulp-insert');

var header = [ '/*','modularize',
'Simple utility to wrap JavaScript code into AMD modules.','',
'Copyright 2015 Sam Saint-Pettersen.','','Released under the MIT License.','*/','' ];

gulp.task('lib', function() {
 	return gulp.src('modularize-lib.ts')
 	.pipe(tsc({
 		module: 'commonjs',
 		removeComments: true
 	}))
 	.pipe(gulp.dest('.'))
 });

gulp.task('bin', function() {
    return gulp.src('modularize.ts')
    .pipe(tsc({
    	module: 'commonjs',
    	removeComments: true
    }))
    .pipe(insert.prepend(header.join('\n')))
    .pipe(insert.prepend('#!/usr/bin/env node\n'))
    .pipe(gulp.dest('.'))
    .pipe(rename('modularize'))
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['lib', 'bin'], function(){});
