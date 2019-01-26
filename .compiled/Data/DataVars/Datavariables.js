'use strict';

var _Data = require('../DataTxt/Data');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //This file will hold all the variables which are created from the objects in data.js. These variables will be used to create data which I can display.

//    CALCULATION FUNCTIONS

//  timeToMinutes converts a time value of hh:mm:ss to minutes. It takes two arguments: an array and the index at which each time value is stored at each entry.
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

//    TIMEBYMONTH VARIABLES

//  The values these variables hold are pretty self-explanatory. 
var totalMinutesInYear = timeToMinutes(_Data.timeByMonth, 1);
var hoursInYear = Math.floor(totalMinutesInYear / 60);
var restMinutesInYear = totalMinutesInYear - hoursInYear * 60;
var timeByMonthCopy = [].concat(_toConsumableArray(_Data.timeByMonth)); //This array can be used to make a graph or something, probably.
//# sourceMappingURL=Datavariables.js.map