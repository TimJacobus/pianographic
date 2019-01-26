'use strict';

var _Data = require('../DataTxt/Data');

//    CALCULATION FUNCTIONS

//  timeToMinutes converts a time value of hh:mm:ss to minutes. It takes two arguments: an array and the index at which each time value is stored at each entry.
var timeToMinutes = function timeToMinutes(timeArray, index) {};

//    TIMEBYMONTH VARIABLES

// totalTimePerMonth holds an array with the total time practised in each month, which is used to calculate the total time over the entire year.
//This file will hold all the variables which are created from the objects in data.js. These variables will be used to create data which I can display.

var totalTimePerMonth = Object.values(_Data.timeByMonth).map(function (x) {
  return x[0].totalTime;
});

// minutesPractised holds the amount of minutes I've spent practising in 2018. This will be used for many other calculations.
var minutesPractised = totalTimePerMonth.map(function (x) {
  return x.slice(0, 2);
}).map(function (x) {
  return parseInt(x, 10);
}).reduce(function (a, b) {
  return a + b;
}) * 60 + totalTimePerMonth.map(function (x) {
  return x.slice(3, 5);
}).map(function (x) {
  return parseInt(x, 10);
}).reduce(function (a, b) {
  return a + b;
});

//Two quick variables which translate the total amount of minutes into hours and rest minutes. These then can be used to un-function my functions. Marvelous.
var hoursInYear = Math.floor(minutesPractised / 60);
var restMinutesInYear = minutesPractised - hoursInYear * 60;

module.exports = {
  totalTimePerMonth: totalTimePerMonth,
  minutesPractised: minutesPractised,
  hoursInYear: hoursInYear,
  restMinutesInYear: restMinutesInYear
};
//# sourceMappingURL=Datavariables.js.map