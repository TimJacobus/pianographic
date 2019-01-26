//This file will hold all the variables which are created from the objects in data.js. These variables will be used to create data which I can display.

import { timeByMonth, dailyInput, music, repertoire, timeByDay } from '../DataTxt/Data';

//    CALCULATION FUNCTIONS

//  timeToMinutes converts a time value of hh:mm:ss to minutes. It takes two arguments: an array and the index at which each time value is stored at each entry.
const timeToMinutes = (timeArray, index) => {

}


//    TIMEBYMONTH VARIABLES

// totalTimePerMonth holds an array with the total time practised in each month, which is used to calculate the total time over the entire year.
const totalTimePerMonth = Object.values(timeByMonth)
  .map(x => x[0].totalTime);

// minutesPractised holds the amount of minutes I've spent practising in 2018. This will be used for many other calculations.
const minutesPractised = totalTimePerMonth.map(x => x.slice(0,2))
  .map(x => parseInt(x, 10))
  .reduce((a, b) => a + b) * 60 +
  totalTimePerMonth.map(x => x.slice(3,5))
  .map(x => parseInt(x, 10))
  .reduce((a, b) => a + b);

//Two quick variables which translate the total amount of minutes into hours and rest minutes. These then can be used to un-function my functions. Marvelous.
const hoursInYear = Math.floor(minutesPractised/60);
const restMinutesInYear = minutesPractised - hoursInYear*60;



module.exports = {
  totalTimePerMonth: totalTimePerMonth,
  minutesPractised: minutesPractised,
  hoursInYear: hoursInYear,
  restMinutesInYear: restMinutesInYear
};
