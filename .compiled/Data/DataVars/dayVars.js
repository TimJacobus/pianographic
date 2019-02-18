'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeOnSightReading = exports.timeOnTechnique = exports.timeOnMusic = exports.timeOnRepertoire = exports.timeOnLessons = exports.timeSpentOn = undefined;

var _Data = require('../DataTxt/Data');

var _MonthVars = require('./MonthVars');

//    FUNCTIONS

//  timeSpentOn takes an input file, an index at which the entry to search for is, and the term for which we want to search. It returns an array with all the entries that 
//  match the searchFor argument at the given entry index.

var timeSpentOn = exports.timeSpentOn = function timeSpentOn(input, index, searchFor) {
  return input.filter(function (entry) {
    return entry[index] === searchFor;
  });
};

//    VARIABLES

//  The idea is that I store values in minutes here. In the DisplayVars file, I will turn them into a hh:mm value. This hh:mm value is used for the tooltip, the minutes is 
//  used to display the actual data.
var timeOnLessons = exports.timeOnLessons = (0, _MonthVars.timeToMinutes)(timeSpentOn(_Data.dailyInput, 0, 'Piano Lesson'), 1);
var timeOnRepertoire = exports.timeOnRepertoire = (0, _MonthVars.timeToMinutes)(timeSpentOn(_Data.dailyInputFull, 1, 'Repertoire'), 3);
var timeOnMusic = exports.timeOnMusic = (0, _MonthVars.timeToMinutes)(timeSpentOn(_Data.dailyInput, 0, 'Music'), 1);
var timeOnTechnique = exports.timeOnTechnique = (0, _MonthVars.timeToMinutes)(timeSpentOn(_Data.dailyInput, 0, 'Technique'), 1);
var timeOnSightReading = exports.timeOnSightReading = (0, _MonthVars.timeToMinutes)(timeSpentOn(_Data.dailyInput, 0, 'Sight Reading'), 1);
//# sourceMappingURL=DayVars.js.map