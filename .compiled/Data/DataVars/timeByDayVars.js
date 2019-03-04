'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.months5Prac = exports.months4Prac = exports.months3Prac = exports.months2Prac = exports.months1Prac = exports.months0Prac = exports.daysWith5Prac = exports.daysWith4Prac = exports.daysWith3Prac = exports.daysWith2Prac = exports.daysWith1Prac = exports.daysWith0Prac = exports.hoursPractisedPerDay = exports.averageTimePerMonth = exports.totalTimePerMonth = exports.dailyAverage = exports.timeByDayMinutes = exports.minutesToTimeConverter = undefined;

var _Data = require('../DataTxt/Data');

//    FUNCTIONS

//  A quick function convert all the time values to minutes, which is what we'll work with for the remainder of the app. I could've used a for loop to avoid the entry[0] repetition. Don't know what would've been better.
//  If I were to use a for loop, I could make it much more multi-functional. Perhaps by spreading each entry [...entry] and calling a slice on that, using the index to replace the correct array entry.

var timeConverter = function timeConverter(input, index) {
  return input.map(function (entry) {
    return [entry[0], entry[index].split(':')];
  }).map(function (entry) {
    return [entry[0], entry[index].map(function (index) {
      return parseInt(index, 10);
    })];
  }).map(function (entry) {
    return [entry[0], entry[1][0] * 60, entry[1][1]];
  }).map(function (entry) {
    return [entry[0], entry[1] + entry[2]];
  });
};

//  Calculates the daily average.

var averagePerDay = function averagePerDay(input, index) {
  var totalMinutes = input.map(function (entry) {
    return entry[index];
  }).reduce(function (a, b) {
    return a + b;
  });
  return Math.round(totalMinutes / input.length);
};

//  This function converts minutes to hh:mm:ss, with ss always being 00. Use this throughout to quickly convert back for display purposes.

var minutesToTimeConverter = exports.minutesToTimeConverter = function minutesToTimeConverter(data) {
  var totalMinutes = data;
  var hours = 0;
  var minutes = 0;
  while (totalMinutes > 0) {
    if (totalMinutes >= 60) {
      hours++;
      totalMinutes = totalMinutes - 60;
    }
    if (totalMinutes < 60) {
      minutes++;
      totalMinutes--;
    }
  }
  return hours + ' hours and ' + minutes + ' minutes';
};

//  This function returns an object with keys (months) and values (time spent per month).

var timePerMonth = function timePerMonth() {
  var dateObj = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
  };
  var dateKeys = Object.keys(dateObj).map(function (entry) {
    return parseInt(entry);
  });
  var returnObj = {};

  var month = timeByDayMinutes.map(function (entry) {
    return [parseInt(entry[0].split('/').slice(1, 2)), entry[1]];
  });

  var _loop = function _loop(i) {
    var monthArr = month.filter(function (entry) {
      return entry[0] === i + 1;
    }).map(function (entry) {
      return entry[1];
    });
    returnObj[dateObj[i + 1]] = monthArr.reduce(function (a, b) {
      return a + b;
    });
  };

  for (var i = 0; i < dateKeys.length; i++) {
    _loop(i);
  }
  return returnObj;
};

//  This function returns an object with keys (months) and values (average time spent per month).

var averagePerMonth = function averagePerMonth() {
  var returnObj = {};
  var dateKeys = Object.keys(totalTimePerMonth);

  var month = timeByDayMinutes.map(function (entry) {
    return [parseInt(entry[0].split('/').slice(1, 2)), entry[1]];
  });

  var _loop2 = function _loop2(i) {
    var monthArr = month.filter(function (entry) {
      return entry[0] === i + 1;
    }).map(function (entry) {
      return entry[1];
    });

    returnObj[dateKeys[i]] = Math.round(totalTimePerMonth[dateKeys[i]] / monthArr.length);
  };

  for (var i = 0; i < dateKeys.length; i++) {
    _loop2(i);
  }
  return returnObj;
};

//  This function creates an object. It has keys (months) and values (objects). Each object value has keys (hours practised) and values (number of days that amount of time was practised).
//  0 means no practice, 1 means between 1 and 60 minutes, 2 means between 61 and 120, etc.
var dailyPracMonth = function dailyPracMonth() {
  var dateObj = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
  };
  var dateKeys = Object.keys(dateObj).map(function (entry) {
    return parseInt(entry);
  });
  var returnObj = {};

  var month = timeByDayMinutes.map(function (entry) {
    return [parseInt(entry[0].split('/').slice(1, 2)), entry[1]];
  });

  var _loop3 = function _loop3(i) {
    var monthObj = {
      0: month.filter(function (entry) {
        return entry[0] === dateKeys[i] && entry[1] === 0;
      }).length,
      1: month.filter(function (entry) {
        return entry[0] === dateKeys[i] && entry[1] > 0 && entry[1] <= 60;
      }).length,
      2: month.filter(function (entry) {
        return entry[0] === dateKeys[i] && entry[1] > 60 && entry[1] <= 120;
      }).length,
      3: month.filter(function (entry) {
        return entry[0] === dateKeys[i] && entry[1] > 120 && entry[1] <= 180;
      }).length,
      4: month.filter(function (entry) {
        return entry[0] === dateKeys[i] && entry[1] > 180 && entry[1] <= 240;
      }).length,
      5: month.filter(function (entry) {
        return entry[0] === dateKeys[i] && entry[1] > 240 && entry[1] <= 300;
      }).length
    };
    returnObj[dateObj[i + 1]] = monthObj;
  };

  for (var i = 0; i < dateKeys.length; i++) {
    _loop3(i);
  }
  return returnObj;
};

//  This function adds up all the days on which you practised a certain amount of time.
var howMuchPracc = function howMuchPracc(time) {
  var dataKeys = Object.keys(hoursPractisedPerDay);
  var count = 0;

  for (var i = 0; i < dataKeys.length; i++) {
    count = count + hoursPractisedPerDay[dataKeys[i]][time];
  }
  return count;
};

//  This function creates an object with keys (months) and values (the amount of days spent practising the input value).
var howMuchPraccMonth = function howMuchPraccMonth(time) {
  var dataKeys = Object.keys(hoursPractisedPerDay);
  var returnObj = {};

  for (var i = 0; i < dataKeys.length; i++) {
    returnObj[dataKeys[i]] = hoursPractisedPerDay[dataKeys[i]][time];
  }
  return returnObj;
};

//    VARIABLES

//  timeByDayMinutes converts timeByDay to an array with values in minutes at [1].
//  dailyAverage displays the average amount of time practised per day.
var timeByDayMinutes = exports.timeByDayMinutes = timeConverter(_Data.timeByDay, 1);
var dailyAverage = exports.dailyAverage = averagePerDay(timeByDayMinutes, 1);

var totalTimePerMonth = exports.totalTimePerMonth = timePerMonth();
var averageTimePerMonth = exports.averageTimePerMonth = averagePerMonth();

var hoursPractisedPerDay = exports.hoursPractisedPerDay = dailyPracMonth();

console.log(hoursPractisedPerDay);

var daysWith0Prac = exports.daysWith0Prac = howMuchPracc(0);
var daysWith1Prac = exports.daysWith1Prac = howMuchPracc(1);
var daysWith2Prac = exports.daysWith2Prac = howMuchPracc(2);
var daysWith3Prac = exports.daysWith3Prac = howMuchPracc(3);
var daysWith4Prac = exports.daysWith4Prac = howMuchPracc(4);
var daysWith5Prac = exports.daysWith5Prac = howMuchPracc(5);

var months0Prac = exports.months0Prac = howMuchPraccMonth(0);
var months1Prac = exports.months1Prac = howMuchPraccMonth(1);
var months2Prac = exports.months2Prac = howMuchPraccMonth(2);
var months3Prac = exports.months3Prac = howMuchPraccMonth(3);
var months4Prac = exports.months4Prac = howMuchPraccMonth(4);
var months5Prac = exports.months5Prac = howMuchPraccMonth(5);
//# sourceMappingURL=TimeByDayVars.js.map