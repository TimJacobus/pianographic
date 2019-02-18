import { timeByMonth } from '../DataTxt/Data';

//    FUNCTIONS

//  The only purpose of timeToMinutes is to take an array of time values (h:mm:ss / hh:mm:ss / hhh:mm:ss) and converting it to a total amount of minutes. 
//  If you want to know the total amount of time spent on a specific thing, you first create a filtered array with the timeSpentOn method, and then you use timeToMinutes to convert it to minutes.

//  NOTE: in the restMinutes constant, I map every entry to entry * 1. I do this because each entry sits in its own array, and I want to remove that inner array. There must be a better way of doing that.

export const timeToMinutes = (input, index) => {
  const splitArr = input.map(entry => entry[index])
  .map(entry => entry.split(':'))
  .map(entry => entry.map(index => parseInt(index, 10)));
  
  const hoursInMinutes = splitArr.map(time => time.slice(0,1))
    .map(entry => entry * 60);
  
  const restMinutes = splitArr.map(time => time.slice(1,2))
    .map(entry => entry * 1);        
 
  return hoursInMinutes.reduce((a, b) => a + b) + restMinutes.reduce((a, b) => a + b);
};


//    VARIABLES

export const totalMinutesInYear = timeToMinutes(timeByMonth, 1);
export const hoursInYear = Math.floor(totalMinutesInYear/60);
export const restMinutesInYear = totalMinutesInYear - hoursInYear*60;
export const timeByMonthCopy = [...timeByMonth];     //This array can be used to make a graph or something, probably.

