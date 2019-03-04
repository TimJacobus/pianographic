'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeByDay = exports.repertoire = exports.music = exports.dailyInputFull = exports.dailyInput = exports.timeByMonth = undefined;

var _monthbreakdown = require('./monthbreakdown.json');

var _monthbreakdown2 = _interopRequireDefault(_monthbreakdown);

var _dailyinput = require('./dailyinput.json');

var _dailyinput2 = _interopRequireDefault(_dailyinput);

var _music = require('./music.json');

var _music2 = _interopRequireDefault(_music);

var _repertoire = require('./repertoire.json');

var _repertoire2 = _interopRequireDefault(_repertoire);

var _timebyday = require('./timebyday.json');

var _timebyday2 = _interopRequireDefault(_timebyday);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//The timeByMonth variable holds an object, which has 12 keys, one for each month. Each key stores an array, and this array stores an object with a totalTime key and timePerDay key.


var timeByMonth = exports.timeByMonth = _monthbreakdown2.default; //                    ALL THE VARIABLES THAT HOLD OBJECTS CONVERTED FROM EXCEL WORKSHEETS

//  I FIXED IT, I FINALLY FUCKING FIXED IT. WHOOHOOOOO.


var dailyInput = exports.dailyInput = _dailyinput2.default.map(function (entry) {
  return [entry[0], entry[3]];
});

var dailyInputFull = exports.dailyInputFull = _dailyinput2.default;

var music = exports.music = _music2.default;

var repertoire = exports.repertoire = _repertoire2.default;

var timeByDay = exports.timeByDay = _timebyday2.default;
//# sourceMappingURL=Data.js.map