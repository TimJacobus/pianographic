'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.amountFinishedInMonth = exports.amountStartedInMonth = exports.finishedInMonth = exports.startedInMonth = exports.numberOfPiecesPerComposer = exports.repPiecesByComposerObj = exports.averageDaysToLearnRep = exports.daysToLearn2018 = exports.daysToLearn2017 = exports.started2018InProgress = exports.started2017InProgress = exports.started2018Finished2018 = exports.started2017Finished2018 = undefined;

var _Data = require('../DataTxt/Data');

var _DayVars = require('./DayVars');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//    FUNCTIONS

//  I've opted against adding a third parameter for the dataset you want to use. This is because it only really works to filter the repertoire file anyway; it makes more sense to directly access repertoire in the function.
//  The learnedInYear function takes two arguments: the starting year and the completion year. It's set up to work only if the input data txt file has the dates at the right indexes.
//  The second parameter, year 2, is optional. If it's passed as an argument, the first line of code runs. If it isn't passed, the second line of code runs.
//  The first line returns an array of entries which match both years at the given input. A ternary expression is used to account for the possibility of [5] of each entry being an empty string.
//  The second line returns an array of entries which were started in a certain year, but were not yet completed at the end of last year.

var learnedInYear = function learnedInYear(year1, year2) {
  return year2 ? _Data.repertoire.filter(function (entry) {
    return entry[5] !== undefined ? entry[4].includes(year1) && entry[5].includes(year2) : null;
  }) : _Data.repertoire.filter(function (entry) {
    return entry[4].includes(year1) && !entry[5];
  });
};

//  A function which takes data as an argument, converts the dates to allow for JS usage, and calculates the amount of days between these two days.
//  This function specifically only correctly converts the data it expects. You can easily turn this into a more general appliance if you need.

var daysBetweenDates = function daysBetweenDates(data) {
  return data.map(function (entry) {
    var dateConverter = function dateConverter(date) {
      var split = date.split('-').map(function (x) {
        return parseInt(x);
      });
      return new Date(split[0], split[1] - 1, split[2] + 1);
    };

    var dateDiff = function dateDiff(first, second) {
      return Math.round((second - first) / (1000 * 60 * 60 * 24));
    };

    return [entry[0], entry[1], entry[2], entry[3], dateDiff(dateConverter(entry[4]), dateConverter(entry[5])) + 1];
  });
};

//  This function takes an unknown number of arguments. 
//  A for loop iterates through the arguments and creates an array out of each argument. Each array has two entries, [0] holds the total time for all pieces, [1] holds the number of pieces.
//  These arrays get pushed into the tempArr array. Inside the return statement, we sum the total time at [0] and the number of pieces at [1], and then divide the total time by the total number of pieces.

var averageNumberOfDays = function averageNumberOfDays() {
  for (var _len = arguments.length, arr = Array(_len), _key = 0; _key < _len; _key++) {
    arr[_key] = arguments[_key];
  }

  var tempArr = [];
  for (var i = 0; i < arr.length; i++) {
    var avArr = function avArr(data) {
      var daysArr = data.map(function (entry) {
        return entry[4];
      });
      return [daysArr.reduce(function (a, b) {
        return a + b;
      }), daysArr.length];
    };
    tempArr.push(avArr(arr[i]));
  };
  return Math.round(tempArr.map(function (entry) {
    return entry[0];
  }).reduce(function (a, b) {
    return a + b;
  }) / tempArr.map(function (entry) {
    return entry[1];
  }).reduce(function (a, b) {
    return a + b;
  }));
};

//  This function creates an object. Its keys are the composers, and each key has an array as a value. Each entry of this array is another array containing a work that's been learned.
//  The keys are set to just the last name of the composer. If I ever want access to the full name of a composer, I'll just create a separate object or array.

var repertoireObjectCreator = function repertoireObjectCreator() {
  var listOfComposers = [].concat(_toConsumableArray(new Set(_Data.repertoire.map(function (entry) {
    return entry[0];
  }))));
  var repObj = {};

  for (var i = 0; i < listOfComposers.length; i++) {
    var composerArr = (0, _DayVars.timeSpentOn)(_Data.repertoire, 0, listOfComposers[i]);

    repObj[listOfComposers[i].split(',')[0]] = composerArr.map(function (entry) {
      return entry.slice(1, 4);
    });
  };
  return repObj;
};

//  This function takes the result of repertoireObjectCreator and converts it to an object with keys (composers) and values (number of pieces).
var repPiecesByComposer = function repPiecesByComposer(obj) {
  var returnObj = {};
  var dataKeys = Object.keys(obj);

  for (var i = 0; i < dataKeys.length; i++) {
    returnObj[dataKeys[i]] = obj[dataKeys[i]].length;
  }
  return returnObj;
};

//  This function creates an object with keys (months) and values (an array which stores a arary entries for each piece learned).
//  repCopy maps each entry. repCopy maps a new array of each piece that's learned. [4] holds the month in which it was started, [5] holds the month in which it was finished, and [6] holds the year 
//  from the date stored at index. This year will be used to check whether the piece was started/finished in the year we passed as an argument.
var dateRepObjCreator = function dateRepObjCreator(index, year) {
  var dateObj = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
  };
  var dateKeys = Object.keys(dateObj);
  var returnObj = {};

  var repCopy = [].concat(_toConsumableArray(_Data.repertoire)).map(function (entry) {
    return entry[5] !== undefined ? [entry[0], entry[1], entry[2], entry[3], parseInt(entry[4].split('-').slice(1, 2)), parseInt(entry[5].split('-').slice(1, 2)), parseInt(entry[index].split('-').slice(0, 1))] : [entry[0], entry[1], entry[2], entry[3], parseInt(entry[4].split('-').slice(1, 2)), null, parseInt(entry[index].split('-').slice(0, 1))];
  });

  var _loop = function _loop(i) {
    for (var j = 0; j < repCopy.length; j++) {
      if (repCopy[j][index] !== undefined) {
        // eslint-disable-next-line eqeqeq
        returnObj[dateObj[i + 1]] = repCopy.filter(function (entry) {
          return entry[index] == dateKeys[i] && entry[6] == year;
        }).map(function (entry) {
          return [entry[0].split(',')[0], entry[1], entry[2], entry[3]];
        });
      }
    }
  };

  for (var i = 0; i < dateKeys.length; i++) {
    _loop(i);
  }
  return returnObj;
};

//  This function converts an object from the function above to an object of key (month) value (number of pieces) pairs.
var dateRepObjNum = function dateRepObjNum(obj) {
  var objCopy = Object.assign({}, obj);
  var objKeys = Object.keys(objCopy);
  var objValues = objKeys.map(function (key) {
    return obj[key];
  });
  var returnObj = {};

  for (var i = 0; i < objKeys.length; i++) {
    returnObj[objKeys[i]] = objValues[i].length;
  }
  return returnObj;
};

//    VARIABLES

//  The following four variables each store an array. Each array stores a self-explanatory set of repertoire pieces. All are included and all are included only once.
var started2017Finished2018 = exports.started2017Finished2018 = learnedInYear(2017, 2018);
var started2018Finished2018 = exports.started2018Finished2018 = learnedInYear(2018, 2018);
var started2017InProgress = exports.started2017InProgress = learnedInYear(2017);
var started2018InProgress = exports.started2018InProgress = learnedInYear(2018);

//  These two variables each store an array similar to the arrays above, but it excludes any dates and, at the [4] entry, includes the number of days it took to learn each piece.
//  Note that this calculation starts only after initially learning the piece. This is important for the eventual display of data. 
var daysToLearn2017 = exports.daysToLearn2017 = daysBetweenDates(started2017Finished2018);
var daysToLearn2018 = exports.daysToLearn2018 = daysBetweenDates(started2018Finished2018);

//  Self explanatory variable, stores the average amount of days it took to learn a piece of repertoire.
var averageDaysToLearnRep = exports.averageDaysToLearnRep = averageNumberOfDays(daysToLearn2017, daysToLearn2018);

//  The obj stores an object with composer keys. Each key has an array as a value, storing all the pieces learned from that composer.
//  The numberOfPiecesPerComposer variable stores an object with composer keys and the number of pieces learned by that composer.
var repPiecesByComposerObj = exports.repPiecesByComposerObj = repertoireObjectCreator();
var numberOfPiecesPerComposer = exports.numberOfPiecesPerComposer = repPiecesByComposer(repPiecesByComposerObj);

//  The upper two variables store keysvalue pairs. The keys are months, the values are arrays with all the entries of everything that was started / finished during that month.
//  The lower two variable store key-value pairs. The keys are months, the values are the number of pieces started or finished during that month.
var startedInMonth = exports.startedInMonth = dateRepObjCreator(4, 2018);
var finishedInMonth = exports.finishedInMonth = dateRepObjCreator(5, 2018);

var amountStartedInMonth = exports.amountStartedInMonth = dateRepObjNum(startedInMonth);
var amountFinishedInMonth = exports.amountFinishedInMonth = dateRepObjNum(finishedInMonth);

console.log(repPiecesByComposerObj['Koechlin'].length);
//# sourceMappingURL=RepVars.js.map