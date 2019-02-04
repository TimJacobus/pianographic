'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeOnSightReading = exports.timeOnTechnique = exports.timeOnMusic = exports.timeOnRepertoire = exports.timeOnLessons = exports.timeByMonthCopy = exports.restMinutesInYear = exports.hoursInYear = exports.totalMinutesInYear = undefined;

var _Data = require('../DataTxt/Data');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //This file will hold all the variables which are created from the objects in data.js. These variables will be used to create data which I can display.

//    FUNCTIONS

//  timeToMinutes converts a time value of hh:mm:ss to minutes. It takes two arguments: an array and the index at which each time value is stored at each entry.
//  This function is going to have trouble when there's an hour value with a single digit (h:mm:ss) or more than two digits (hhh:mm:ss). You should use regex.
//  Write a regex that slices before the first :, and write a regex that slices after the first but before the second :. 
var timeToMinutes = function timeToMinutes(timeArray, index) {
  return timeArray.map(function (entry) {
    return entry[index];
  }).map(function (time) {
    return time.slice(0, 2);
  }).map(function (hours) {
    return parseInt(hours, 10);
  }).reduce(function (a, b) {
    return a + b;
  }) * 60 + timeArray.map(function (entry) {
    return entry[index];
  }).map(function (time) {
    return time.slice(3, 5);
  }).map(function (minutes) {
    return parseInt(minutes, 10);
  }).reduce(function (a, b) {
    return a + b;
  });
};

//  An alternative timeToMinutes function which converts the time value to minutes, but doesn't remove other elements from the array.
//  I need to access the entry at the provided index and convert it to to a value in minutes within a single return statement. 


//  timeSpentOn takes an input file, an index at which the entry to search for is, and the term for which we want to search. It returns an array with all the entries that 
//  match the searchFor argument at the given entry index.

var timeSpentOn = function timeSpentOn(input, index, searchFor) {
  return input.filter(function (entry) {
    return entry[index] === searchFor;
  });
};

//    VARIABLES


//    TIMEBYMONTH VARIABLES

//  The values these variables hold are pretty self-explanatory. 
var totalMinutesInYear = exports.totalMinutesInYear = timeToMinutes(_Data.timeByMonth, 1);
var hoursInYear = exports.hoursInYear = Math.floor(totalMinutesInYear / 60);
var restMinutesInYear = exports.restMinutesInYear = totalMinutesInYear - hoursInYear * 60;
var timeByMonthCopy = exports.timeByMonthCopy = [].concat(_toConsumableArray(_Data.timeByMonth)); //This array can be used to make a graph or something, probably.


//    DAILYINPUT VARIABLES

//  The idea is that I store values in minutes here. In the DisplayVars file, I will turn them into a hh:mm value. This hh:mm value is used for the tooltip, the minutes is 
//  used to display the actual data.
var timeOnLessons = exports.timeOnLessons = timeToMinutes(timeSpentOn(_Data.dailyInput, 0, 'Piano Lesson'), 1);
var timeOnRepertoire = exports.timeOnRepertoire = timeToMinutes(timeSpentOn(_Data.dailyInputFull, 1, 'Repertoire'), 3);
var timeOnMusic = exports.timeOnMusic = timeToMinutes(timeSpentOn(_Data.dailyInput, 0, 'Music'), 1);
var timeOnTechnique = exports.timeOnTechnique = timeToMinutes(timeSpentOn(_Data.dailyInput, 0, 'Technique'), 1);
var timeOnSightReading = exports.timeOnSightReading = timeToMinutes(timeSpentOn(_Data.dailyInput, 0, 'Sight Reading'), 1);

//    MUSIC VARIABLES

//    music holds an array, each entry being another array. 
//    [0] Holds the composer's name.
//    [1] Holds the book, which needs manual refining in the Displayvars before it can be used.
//    [2] Holds the time spent on that book.
//    [3] Holds the number of pieces learned from that book.

//    What to display, then? 

//    Creating a new array with the time values converted to minutes, so I can actually make calculations with it.

//    composerObject resorts the array into an object with key-value pairs.


var composerObject = _Data.music.reduce(function (composer, line) {
  composer[line[0]] = composer[line[0]] || [];
  composer[line[0]].push({
    book: line[1],
    number: line[2],
    speed: line[3]
  });
  return composer;
}, {});

//    Number of works by composer.
//    Time per composer.
//    Average time per piece/book.
//    Average time per piece/composer.
//# sourceMappingURL=Datavariables.js.map