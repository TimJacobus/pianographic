//This file will hold all the variables which are created from the objects in data.js. These variables will be used to create data which I can display.

import { timeByMonth, dailyInput, music, repertoire, timeByDay } from '../DataTxt/Data';

//    CALCULATION FUNCTIONS

//  timeToMinutes converts a time value of hh:mm:ss to minutes. It takes two arguments: an array and the index at which each time value is stored at each entry.
const timeToMinutes = (timeArray, index) => {
  return timeArray.map(entry => entry[index])
  .map(time => time.slice(0,2))
  .map(hours => parseInt(hours, 10))
  .reduce((a, b) => a + b) * 60 +
  timeArray.map(entry => entry[index])
  .map(time => time.slice(3,5))
  .map(minutes => parseInt(minutes, 10))
  .reduce((a, b) => a + b);
}


//    TIMEBYMONTH VARIABLES

//  The values these variables hold are pretty self-explanatory. 
const totalMinutesInYear = timeToMinutes(timeByMonth, 1);
const hoursInYear = Math.floor(totalMinutesInYear/60);
const restMinutesInYear = totalMinutesInYear - hoursInYear*60;
const timeByMonthCopy = [...timeByMonth];     //This array can be used to make a graph or something, probably.






