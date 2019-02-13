'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.started2018InProgress = exports.started2017InProgress = exports.started2018finished2018 = exports.started2017finished2018 = exports.piecesPerBook = exports.timePerBook = exports.timePerComposer = exports.piecesPerComposer = exports.musicObjectByBook = exports.musicObjectByComposer = exports.timeOnSightReading = exports.timeOnTechnique = exports.timeOnMusic = exports.timeOnRepertoire = exports.timeOnLessons = exports.timeByMonthCopy = exports.restMinutesInYear = exports.hoursInYear = exports.totalMinutesInYear = undefined;

var _Data = require('../DataTxt/Data');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //This file will hold all the variables which are created from the objects in data.js. These variables will be used to create data which I can display.

//    FUNCTIONS

//    TIME BY MONTH FUNCTIONS

//  The only purpose of timeToMinutes is to take an array of time values (h:mm:ss / hh:mm:ss / hhh:mm:ss) and converting it to a total amount of minutes. 
//  If you want to know the total amount of time spent on a specific thing, you first create a filtered array with the timeSpentOn method, and then you use timeToMinutes to convert it to minutes.

//  NOTE: in the restMinutes constant, I map every entry to entry * 1. I do this because each entry sits in its own array, and I want to remove that inner array. There must be a better way of doing that.

var timeToMinutes = function timeToMinutes(input, index) {
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

//    DAILY INPUT FUNCTIONS

//  timeSpentOn takes an input file, an index at which the entry to search for is, and the term for which we want to search. It returns an array with all the entries that 
//  match the searchFor argument at the given entry index.

var timeSpentOn = function timeSpentOn(input, index, searchFor) {
  return input.filter(function (entry) {
    return entry[index] === searchFor;
  });
};

//    MUSIC FUNCTIONS

//  The musicObject function creates an object, which basically only works if it gets the right input at the right places.
//  It displays, for each composer, which books were studied, how long was spent, and how many pieces were learned.
//  I've opted against using a parameter for both this function and the next one, since its specific purpose is to create an object out of the music object anyway.

var musicObjectCreator = function musicObjectCreator() {
  var listOfComposers = [].concat(_toConsumableArray(new Set(_Data.music.map(function (entry) {
    return entry[0];
  }))));
  var musicObj = {};

  for (var i = 0; i < listOfComposers.length; i++) {
    var composerArr = timeSpentOn(_Data.music, 0, listOfComposers[i]);

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

var bookObjectCreator = function bookObjectCreator() {
  var listOfBooks = [].concat(_toConsumableArray(new Set(_Data.music.map(function (entry) {
    return entry[1];
  }))));
  var musicObj = {};

  for (var i = 0; i < listOfBooks.length; i++) {
    var booksArr = timeSpentOn(_Data.music, 1, listOfBooks[i]);

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

//  This function takes three arguments, obj (either of the musicObject objects), index (the index of the key in the music object) and searchFor (what you want to display). 

var specificObjectCreator = function specificObjectCreator(obj, index, searchFor) {
  var listOfKeys = [].concat(_toConsumableArray(new Set(_Data.music.map(function (entry) {
    return entry[index];
  }))));
  var dataCopy = Object.assign({}, obj);

  for (var i = 0; i < listOfKeys.length; i++) {
    dataCopy[listOfKeys[i]] = dataCopy[listOfKeys[i]][searchFor];
  }
  return dataCopy;
};

//    REPERTOIRE FUNCTONS

//  I've opted against adding a third parameter for the dataset you want to use. This is because it only really works to filter the repertoire file anyway; it makes more sense to directly access repertoire in the function.
//  The learnedInYear function takes two arguments: the starting year and the completion year. It's set up to work only if the input data txt file has the dates at the right indexes.
//  The third parameter, year 2, is optional. If it's passed as an argument, the first line of code runs. If it isn't passed, the second line of code is run.
//  The first line returns an array of entries which match both years at the given input. A ternary expression is used to account for the possibility of [5] of each entry being an empty string.
//  The second line returns an array of entries which were started in a certain year, but were not yet completed at the end of last year.

var learnedInYear = function learnedInYear(year1, year2) {
  return year2 ? _Data.repertoire.filter(function (entry) {
    return entry[5] !== undefined ? entry[4].includes(year1) && entry[5].includes(year2) : null;
  }) : _Data.repertoire.filter(function (entry) {
    return entry[4].includes(year1) && !entry[5];
  });
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
var musicObjectByComposer = exports.musicObjectByComposer = musicObjectCreator();
var musicObjectByBook = exports.musicObjectByBook = bookObjectCreator();

//  Four more specific objects. Each has a number of keys (composers / books) and each key has one value (a number, either pieces or minutes). 
//  These objects will make data manipulation much easier.
var piecesPerComposer = exports.piecesPerComposer = specificObjectCreator(musicObjectByComposer, 0, 'pieces');
var timePerComposer = exports.timePerComposer = specificObjectCreator(musicObjectByComposer, 0, 'time');
var timePerBook = exports.timePerBook = specificObjectCreator(musicObjectByBook, 1, 'time');
var piecesPerBook = exports.piecesPerBook = specificObjectCreator(musicObjectByBook, 1, 'pieces');

//    REPERTOIRE VARIABLES

//The following four variables each store an array. Each array stores a self-explanatory set of repertoire pieces. All are included and all are included only once.
var started2017finished2018 = exports.started2017finished2018 = learnedInYear(2017, 2018);
var started2018finished2018 = exports.started2018finished2018 = learnedInYear(2018, 2018);
var started2017InProgress = exports.started2017InProgress = learnedInYear(2017);
var started2018InProgress = exports.started2018InProgress = learnedInYear(2018);

console.log(musicObjectByBook);

//[0] holds the composer's name
//[1] holds the Book name / Opus number
//[2] holds the No. of the piece
//[3] holds the name of the piece
//[4] holds the date it was first learned (PP date)
//[5] holds the date it was finished / recorded and uploaded to YouTube

//Given the information provided, I could create variables holding the following information:

//Number of pieces by each composer
//Average time it took to learn a piece in days
//An object which holds all the pieces started for each month
//An object which holds all the pieces finished in each month
//# sourceMappingURL=Datavariables.js.map