'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeByMonthCopy = exports.restMinutesInYear = exports.hoursInYear = exports.totalMinutesInYear = exports.timeToMinutes = undefined;

var _Data = require('../DataTxt/Data');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//    FUNCTIONS

//  The only purpose of timeToMinutes is to take an array of time values (h:mm:ss / hh:mm:ss / hhh:mm:ss) and converting it to a total amount of minutes. 
//  If you want to know the total amount of time spent on a specific thing, you first create a filtered array with the timeSpentOn method, and then you use timeToMinutes to convert it to minutes.

//  NOTE: in the restMinutes constant, I map every entry to entry * 1. I do this because each entry sits in its own array, and I want to remove that inner array. There must be a better way of doing that.

var timeToMinutes = exports.timeToMinutes = function timeToMinutes(input, index) {
  var splitArr = input.map(function (entry) {
    return entry[index];
  }).map(function (entry) {
    return entry.split(':');
  }).map(function (entry) {
    return entry.map(function (index) {
      return parseInt(index, 10);
    });
  });

  var hoursInMinutes = splitArr.map(function (time) {
    return time.slice(0, 1);
  }).map(function (entry) {
    return entry * 60;
  });

  var restMinutes = splitArr.map(function (time) {
    return time.slice(1, 2);
  }).map(function (entry) {
    return entry * 1;
  });

  return hoursInMinutes.reduce(function (a, b) {
    return a + b;
  }) + restMinutes.reduce(function (a, b) {
    return a + b;
  });
};

//    VARIABLES

var totalMinutesInYear = exports.totalMinutesInYear = timeToMinutes(_Data.timeByMonth, 1);
var hoursInYear = exports.hoursInYear = Math.floor(totalMinutesInYear / 60);
var restMinutesInYear = exports.restMinutesInYear = totalMinutesInYear - hoursInYear * 60;
var timeByMonthCopy = exports.timeByMonthCopy = [].concat(_toConsumableArray(_Data.timeByMonth)); //This array can be used to make a graph or something, probably.
//# sourceMappingURL=MonthVars.js.map