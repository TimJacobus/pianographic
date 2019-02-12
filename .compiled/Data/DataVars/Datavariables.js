'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.musicObjectByBook = exports.musicObjectByComposer = exports.timeOnSightReading = exports.timeOnTechnique = exports.timeOnMusic = exports.timeOnRepertoire = exports.timeOnLessons = exports.timeByMonthCopy = exports.restMinutesInYear = exports.hoursInYear = exports.totalMinutesInYear = undefined;

var _Data = require('../DataTxt/Data');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //This file will hold all the variables which are created from the objects in data.js. These variables will be used to create data which I can display.

//    FUNCTIONS

//  The only purpose of timeToMinutes is to take an array of time values (h:mm:ss / hh:mm:ss / hhh:mm:ss) and converting it to a total amount of minutes. 
//  If you want to know the total amount of time spent on a specific thing, you first create a filtered array with the timeSpentOn method, and then you use timeToMinutes to convert it to minutes.

//  NOTE: in the restMinutes constant, I map every entry to entry * 1. I do this because each entry sits in its own array, and I want to remove that inner array. There must be a better way of doing that.

var timeToMinutes = function timeToMinutes(timeArray, index) {
  var splitArr = timeArray.map(function (entry) {
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

//  timeSpentOn takes an input file, an index at which the entry to search for is, and the term for which we want to search. It returns an array with all the entries that 
//  match the searchFor argument at the given entry index.

var timeSpentOn = function timeSpentOn(input, index, searchFor) {
  return input.filter(function (entry) {
    return entry[index] === searchFor;
  });
};

//  The musicObject function creates an object, which basically only works if it gets the right input at the right places.
//  It displays, for each composer, which books were studied, how long was spent, and how many pieces were learned.

var musicObjectCreator = function musicObjectCreator(data) {
  var listOfComposers = [].concat(_toConsumableArray(new Set(_Data.music.map(function (entry) {
    return entry[0];
  }))));
  var musicObj = {};

  for (var i = 0; i < listOfComposers.length; i++) {
    var composerArr = timeSpentOn(data, 0, listOfComposers[i]);

    musicObj[listOfComposers[i]] = {
      books: composerArr.map(function (entry) {
        return entry[1];
      }),
      time: timeToMinutes(composerArr, 2),
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
  }
  return musicObj;
};

//  This function creates an object which holds keys (book names) and values (objects with time spent & number of pieces). This object is used to calculate the average per book.

var bookObjectCreator = function bookObjectCreator(data) {
  var listOfBooks = [].concat(_toConsumableArray(new Set(_Data.music.map(function (entry) {
    return entry[1];
  }))));
  var musicObj = {};

  for (var i = 0; i < listOfBooks.length; i++) {
    var booksArr = timeSpentOn(data, 1, listOfBooks[i]);

    musicObj[listOfBooks[i]] = {
      time: timeToMinutes(booksArr, 2),
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
  }
  return musicObj;
};

//    VARIABLES


//    TIMEBYMONTH VARIABLES

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

//  The two root objects which store a lot of information.
var musicObjectByComposer = exports.musicObjectByComposer = musicObjectCreator(_Data.music);
var musicObjectByBook = exports.musicObjectByBook = bookObjectCreator(_Data.music);

//  Create, from the general objects above, more specific objects. You want an object with key-value pairs, like composer-time, composer-pieces, books-pieces, books-time. I think those four.
//  To create these objects, you can probably create a function which, with the right input arguments, can make these objects.


console.log();

//    music holds an array, each entry being another array. 
//    [0] Holds the composer's name.
//    [1] Holds the book, which needs manual refining in the Displayvars before it can be used.
//    [2] Holds the time spent on that book.
//    [3] Holds the number of pieces learned from that book.

//    What to display, then? 


//    Number of works by composer.
//    Time per composer.
//    Average time per piece/book.
//    Average time per piece/composer.
//# sourceMappingURL=Datavariables.js.map