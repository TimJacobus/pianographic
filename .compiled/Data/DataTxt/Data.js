'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeByDay = exports.repertoire = exports.music = exports.dailyInput = exports.timeByMonth = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//The convertTxt function converts an Excel .txt import into an array.
var convertTxt = function convertTxt(txt) {
  return _fs2.default.readFileSync(txt, 'utf8').trim().replace(/\r/g, '').split('\n').map(function (line) {
    return line.split('\t');
  });
};

//Each constant stores a bare-bones array of data, which will be mutated at a later point.
//                    ALL THE VARIABLES THAT HOLD OBJECTS CONVERTED FROM EXCEL WORKSHEETS

//const fs = require('fs');
var monthBreakdownData = convertTxt('./../DataTxt/monthbreakdown.txt');
var dailyInputData = convertTxt('./../DataTxt/dailyinput.txt');
var musicData = convertTxt('./../DataTxt/music.txt');
var repertoireData = convertTxt('./../DataTxt/repertoire.txt');
var timeByDayData = convertTxt('./../DataTxt/timebyday.txt');

//The timeByMonth variable holds an object, which has 12 keys, one for each month. Each key stores an array, and this array stores an object with a totalTime key and timePerDay key.


var timeByMonth = exports.timeByMonth = monthBreakdownData;

var dailyInput = exports.dailyInput = dailyInputData.map(function (entry) {
  return [entry[0], entry[3]];
});

var music = exports.music = musicData;

var repertoire = exports.repertoire = repertoireData;

var timeByDay = exports.timeByDay = timeByDayData;
//# sourceMappingURL=Data.js.map