var gulp       = require('gulp');
var gutil      = require('gulp-util');
var rename     = require('gulp-rename');
var insert     = require('gulp-insert');
var sh         = require('shelljs');
var concat = require('gulp-concat');
var csvtojson = require('gulp-csvtojson');
var ext_replace = require('gulp-ext-replace');
var argv = require('yargs').argv;
var jeditor = require("gulp-json-editor");
var cp = require('child_process');
var replace = require('gulp-replace');
var _ = require('lodash');


var ConsPropNature = require('./constants/prop-nature');


var taskNameCsv = 'csv';
var taskNameWatch = 'watch';

function editStat(item, resultRow, propName) {
	var splited = item.split("-");
	resultRow[propName + ConsPropNature.MIN_POSFIX] = parseInt(splited[0]);
	resultRow[propName + ConsPropNature.MAX_POSFIX] = parseInt(splited[1]);
}
function convertToNumberArray(item) {
	if (!!item) { // srting or non-zero
		var tmp = item.split(";");

		return tmp.map(function(v) {
			return parseInt(v);
		})
	} else if (item === 0) {
		return [0];
	} else {
		return [];
	}
}
function convertToStringArray(item) {
	if (!!item) {
		return item.split(";");
	} else {
		return [];
	}
}
function convertToBoolean(item) {
	return item === "TRUE";
}


gulp.task(taskNameCsv, function() {
	return gulp.src('./csv/*.csv')
		.pipe(csvtojson({
			toArrayString: true,
			delimiter: ["\t"],
			checkType: true,
			colParser: {
				/*
				Be careful, there is a hidden logic below assuming that "units" and "skills" csv have no
				identical column names (or same names but different parsing logic). If that case exists,
				you may need to 
				 */
				"id": "string",
				/*
					item - "1970-01-01"
					head - "birthday"
					resultRow - {name:"Joe"}
					row - ["Joe","1970-01-01"]
					colIdx - 1
				 */
				"skills": function(item, head, resultRow, row, colIdx) {
					if (item) {
						var splited = item.split(";"); // ['aaa-1', 'bbb-2', 'ccc']

						var mapped = _.map(splited, function(v) {
							var tmp = v.split("-");
							return [tmp[0], parseInt(tmp[1])];
						});

						return mapped;
					}

					return [];
				},
				"fire": function(item, head, resultRow, row, colIdx) {
					editStat(item, resultRow, ConsPropNature.FIRE);
					return item;
				},
				"land": function(item, head, resultRow, row, colIdx) {
					editStat(item, resultRow, ConsPropNature.LAND);
					return item;
				},
				"wind": function(item, head, resultRow, row, colIdx) {
					editStat(item, resultRow, ConsPropNature.WIND);
					return item;
				},
				"water": function(item, head, resultRow, row, colIdx) {
					editStat(item, resultRow, ConsPropNature.WATER);
					return item;
				},
				"moon": function(item, head, resultRow, row, colIdx) {
					editStat(item, resultRow, ConsPropNature.MOON);
					return item;
				},
				"weight": convertToNumberArray,
				"team_weight": convertToNumberArray,
				"team_weight_limit_arms": convertToStringArray,
				"limit_natures": convertToStringArray,
				"limit_arms": convertToStringArray,
				"limit_jobs": convertToStringArray,
				"limit_units": convertToStringArray
			}
		}))
		.pipe(gulp.dest('./output/json'))
		.pipe(insert.prepend('module.exports = '))
		.pipe(insert.append(';'))
		.pipe(ext_replace('.js'))
		.pipe(gulp.dest('./output/module'))
});


// Watch changes and compile instantly
gulp.task(taskNameWatch, function(done) {
	gulp.watch('./csv/*.csv', gulp.series(taskNameCsv));
	done();
});


gulp.task('init', gulp.series(taskNameCsv, taskNameWatch));