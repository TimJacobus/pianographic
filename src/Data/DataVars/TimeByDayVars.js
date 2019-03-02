import { timeByDay } from '../DataTxt/Data';


//    FUNCTIONS

//  A quick function convert all the time values to minutes, which is what we'll work with for the remainder of the app. I could've used a for loop to avoid the entry[0] repetition. Don't know what would've been better.
//  If I were to use a for loop, I could make it much more multi-functional. Perhaps by spreading each entry [...entry] and calling a slice on that, using the index to replace the correct array entry.

const timeConverter = (input, index) => {
   return input.map(entry => [entry[0], entry[index].split(':')])
    .map(entry => [entry[0], entry[index].map(index => parseInt(index, 10))])
    .map(entry => [entry[0], entry[1][0]*60, entry[1][1]])
    .map(entry => [entry[0], entry[1]+entry[2]]);
}

//  Calculates the daily average.

const averagePerDay = (input, index) => {
  const totalMinutes =  input.map(entry => entry[index]).reduce((a,b) => a + b);
  return Math.round(totalMinutes / input.length);
}

//  This function converts minutes to hh:mm:ss, with ss always being 00. Use this throughout to quickly convert back for display purposes.

export const minutesToTimeConverter = (data) => {
  let totalMinutes = data;
  let hours = 0;
  let minutes = 0;
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
  return hours === 1 && minutes !== 1 
    ? `${hours} hour and ${minutes} minutes`
    : hours === 1 && minutes === 1
      ? `${hours} hour and ${minutes} minute`
      : minutes === 1
       ? `${hours} hours and ${minutes} minute`
       : `${hours} hours and ${minutes} minutes`;
}

//  This function returns an object with keys (months) and values (time spent per month).

const timePerMonth = () => {
  const dateObj = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
  }
  const dateKeys = Object.keys(dateObj).map(entry => parseInt(entry));
  const returnObj = {};

  const month = timeByDayMinutes.map(entry => 
    [parseInt(entry[0].split('/').slice(1, 2)),
    entry[1]]);
  
  for (let i = 0; i < dateKeys.length; i++) {
    const monthArr = month.filter(entry => entry[0] === i+1).map(entry => entry[1]);
    returnObj[dateObj[i+1]] = monthArr.reduce((a, b) => a + b);
  }
  return returnObj;
}

//  This function returns an object with keys (months) and values (average time spent per month).

const averagePerMonth = () => {
  const returnObj = {};
  const dateKeys = Object.keys(totalTimePerMonth);

  const month = timeByDayMinutes.map(entry => 
    [parseInt(entry[0].split('/').slice(1, 2)),
    entry[1]]);

  for (let i = 0; i < dateKeys.length; i++) {
    const monthArr = month.filter(entry => entry[0] === i+1).map(entry => entry[1]);

    returnObj[dateKeys[i]] = Math.round(totalTimePerMonth[dateKeys[i]]/monthArr.length);
  }
  return returnObj;
}


//  This function creates an object. It has keys (months) and values (objects). Each object value has keys (hours practised) and values (number of days that amount of time was practised).
//  0 means no practice, 1 means between 1 and 60 minutes, 2 means between 61 and 120, etc.
const dailyPracMonth = () => {
  const dateObj = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
  }
  const dateKeys = Object.keys(dateObj).map(entry => parseInt(entry));
  const returnObj = {};

  const month = timeByDayMinutes.map(entry => 
    [parseInt(entry[0].split('/').slice(1, 2)),
    entry[1]]);

  for (let i = 0; i < dateKeys.length; i++) {
    const monthObj = {
      0: month.filter(entry => entry[0] === dateKeys[i] && entry[1] === 0).length,
      1: month.filter(entry => entry[0] === dateKeys[i] && (entry[1] > 0 && entry[1] <= 60)).length,
      2: month.filter(entry => entry[0] === dateKeys[i] && (entry[1] > 60 && entry[1] <= 120)).length,
      3: month.filter(entry => entry[0] === dateKeys[i] && (entry[1] > 120 && entry[1] <= 180)).length,
      4: month.filter(entry => entry[0] === dateKeys[i] && (entry[1] > 180 && entry[1] <= 240)).length,
      5: month.filter(entry => entry[0] === dateKeys[i] && (entry[1] > 240 && entry[1] <= 300)).length
    }
    returnObj[dateObj[i+1]] = monthObj;
  }
  return returnObj;
}

//  This function adds up all the days on which you practised a certain amount of time.
const howMuchPracc = (time) => {
  const dataKeys = Object.keys(hoursPractisedPerDay);
  let count = 0;

  for (let i = 0; i < dataKeys.length; i++) {
    count = count + hoursPractisedPerDay[dataKeys[i]][time];
  }
  return count;
}

//  This function creates an object with keys (months) and values (the amount of days spent practising the input value).
const howMuchPraccMonth = (time) => {
  const dataKeys = Object.keys(hoursPractisedPerDay);
  const returnObj = {};

  for (let i = 0; i < dataKeys.length; i++) {
    returnObj[dataKeys[i]] = hoursPractisedPerDay[dataKeys[i]][time]
  }
  return returnObj;
}

//    VARIABLES

//  timeByDayMinutes converts timeByDay to an array with values in minutes at [1].
//  dailyAverage displays the average amount of time practised per day.
export const timeByDayMinutes = timeConverter(timeByDay, 1);
export const dailyAverage = averagePerDay(timeByDayMinutes, 1);

export const totalTimePerMonth = timePerMonth();
export const averageTimePerMonth = averagePerMonth();

export const hoursPractisedPerDay = dailyPracMonth();

export const daysWith0Prac = howMuchPracc(0);
export const daysWith1Prac = howMuchPracc(1);
export const daysWith2Prac = howMuchPracc(2);
export const daysWith3Prac = howMuchPracc(3);
export const daysWith4Prac = howMuchPracc(4);
export const daysWith5Prac = howMuchPracc(5);

export const months0Prac = howMuchPraccMonth(0);
export const months1Prac = howMuchPraccMonth(1);
export const months2Prac = howMuchPraccMonth(2);
export const months3Prac = howMuchPraccMonth(3);
export const months4Prac = howMuchPraccMonth(4);
export const months5Prac = howMuchPraccMonth(5);