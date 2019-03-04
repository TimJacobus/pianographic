'use strict';

//In this file I'll take the variables from datavariables.js and turn them into things that can be displayed.

var dataVars = require('../DataVars/Datavariables.js');

//totalTimeYear stores the time practised as a string. The output is '558:22'.
var totalTimeYear = dataVars.hoursInYear + ':' + dataVars.restMinutesInYear;

//averagePerDay and averagePerMonth hold a value nested inside a string, separating the numbers with a colon. I think that's the cleanest way to store these variables.
//The average is taken over the total amount of days in that time period.
var averagePerDay = Math.floor(dataVars.minutesPractised / (365 * 60)) + ':' + Math.round((dataVars.minutesPractised / (365 * 60) - Math.floor(dataVars.minutesPractised / (365 * 60))) * 60);
var averagePerMonth = Math.floor(dataVars.minutesPractised / 12 / 60) + ':' + Math.round((dataVars.minutesPractised / 12 / 60 - Math.floor(dataVars.minutesPractised / 12 / 60)) * 60);
//# sourceMappingURL=Displayvariables.js.map