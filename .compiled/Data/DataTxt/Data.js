'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//                    ALL THE VARIABLES THAT HOLD OBJECTS CONVERTED FROM EXCEL WORKSHEETS

var fs = require('fs');

//The convertTxt function converts an Excel .txt import into an array.
var convertTxt = function convertTxt(txt) {
  return fs.readFileSync(txt, 'utf8').trim().replace(/\r/g, '').split('\n').map(function (line) {
    return line.split('\t');
  });
};

//Each constant stores a bare-bones array of data, which will be mutated at a later point.
var monthBreakdownData = convertTxt('./../DataTxt/monthbreakdown.txt');
var dailyInputData = convertTxt('./../DataTxt/dailyinput.txt');
var musicData = convertTxt('./../DataTxt/music.txt');
var repertoireData = convertTxt('./../DataTxt/repertoire.txt');
var timeByDayData = convertTxt('./../DataTxt/timebyday.txt');

//The timeByMonth variable holds an object, which has 12 keys, one for each month. Each key stores an array, and this array stores an object with a totalTime key and timePerDay key.


var timeByMonth = exports.timeByMonth = monthBreakdownData;
/*.reduce((month, line) => {
  month[line[0]] = month[line[0]] || [];
  month[line[0]].push({
    totalTime: line[1],
    timePerDay: line[2]
  })
  return month;
}, {});*/

var dailyInput = exports.dailyInput = dailyInputData.map(function (entry) {
  return [entry[0], entry[3]];
});

var music = exports.music = musicData;

var repertoire = exports.repertoire = repertoireData;

var timeByDay = exports.timeByDay = timeByDayData;
//# sourceMappingURL=Data.js.map