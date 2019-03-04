'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.piecesPerBook = exports.timePerBook = exports.timePerComposer = exports.piecesPerComposer = exports.musicObjectByBook = exports.musicObjectByComposer = undefined;

var _Data = require('../DataTxt/Data');

var _DayVars = require('./DayVars');

var _MonthVars = require('./MonthVars');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//    FUNCTIONS

//  The musicObjectCreator function creates an object, which basically only works if it gets the right input at the right places.
//  It displays, for each composer, which books were studied, how long was spent, and how many pieces were learned.
//  I've opted against using a parameter for both this function and the next one, since its specific purpose is to create an object out of the music object anyway.

var musicObjectCreator = function musicObjectCreator() {
  var listOfComposers = [].concat(_toConsumableArray(new Set(_Data.music.map(function (entry) {
    return entry[0];
  }))));
  var musicObj = {};

  for (var i = 0; i < listOfComposers.length; i++) {
    var composerArr = (0, _DayVars.timeSpentOn)(_Data.music, 0, listOfComposers[i]);

    musicObj[listOfComposers[i]] = {
      books: composerArr.map(function (entry) {
        return entry[1];
      }),
      time: (0, _MonthVars.timeToMinutes)(composerArr, 2),
      pieces: composerArr.map(function (entry) {
        return parseInt(entry[3]);
      }).reduce(function (a, b) {
        return a + b;
      }) ? composerArr.map(function (entry) {
        return parseInt(entry[3]);
      }).reduce(function (a, b) {
        return a + b;
      }) : 0
    };
  };
  return musicObj;
};

//  This function creates an object which holds keys (book names) and values (objects with time spent & number of pieces). This object is used to calculate the average per book.

var bookObjectCreator = function bookObjectCreator() {
  var listOfBooks = [].concat(_toConsumableArray(new Set(_Data.music.map(function (entry) {
    return entry[1];
  }))));
  var bookObj = {};

  for (var i = 0; i < listOfBooks.length; i++) {
    var booksArr = (0, _DayVars.timeSpentOn)(_Data.music, 1, listOfBooks[i]);

    bookObj[listOfBooks[i]] = {
      time: (0, _MonthVars.timeToMinutes)(booksArr, 2),
      pieces: booksArr.map(function (entry) {
        return parseInt(entry[3]);
      }).reduce(function (a, b) {
        return a + b;
      }) ? booksArr.map(function (entry) {
        return parseInt(entry[3]);
      }).reduce(function (a, b) {
        return a + b;
      }) : 0
    };
  };
  return bookObj;
};

//  This function takes three arguments, obj (either of the musicObject objects), index (the index of the key in the music object) and searchFor (what you want to display). 

var specificObjectCreator = function specificObjectCreator(obj, index, searchFor) {
  var listOfKeys = [].concat(_toConsumableArray(new Set(_Data.music.map(function (entry) {
    return entry[index];
  }))));
  var dataCopy = Object.assign({}, obj);

  for (var i = 0; i < listOfKeys.length; i++) {
    dataCopy[listOfKeys[i]] = dataCopy[listOfKeys[i]][searchFor];
  };
  return dataCopy;
};

//    VARIABLES

//  The two root objects which store a lot of information.
var musicObjectByComposer = exports.musicObjectByComposer = musicObjectCreator();
var musicObjectByBook = exports.musicObjectByBook = bookObjectCreator();

//  Four more specific objects. Each has a number of keys (composers / books) and each key has one value (a number, either pieces or minutes). 
//  These objects will make data manipulation much easier.
var piecesPerComposer = exports.piecesPerComposer = specificObjectCreator(musicObjectByComposer, 0, 'pieces');
var timePerComposer = exports.timePerComposer = specificObjectCreator(musicObjectByComposer, 0, 'time');
var timePerBook = exports.timePerBook = specificObjectCreator(musicObjectByBook, 1, 'time');
var piecesPerBook = exports.piecesPerBook = specificObjectCreator(musicObjectByBook, 1, 'pieces');
//# sourceMappingURL=MusicVars.js.map