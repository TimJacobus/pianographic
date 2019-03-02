//                    ALL THE VARIABLES THAT HOLD OBJECTS CONVERTED FROM EXCEL WORKSHEETS

//  I FIXED IT, I FINALLY FUCKING FIXED IT. WHOOHOOOOO.


import monthBreakdownData from './monthbreakdown.json';
import dailyInputData from './dailyinput.json';
import musicData from './music.json';
import repertoireData from './repertoire.json';
import timeByDayData from './timebyday.json';


//The timeByMonth variable holds an object, which has 12 keys, one for each month. Each key stores an array, and this array stores an object with a totalTime key and timePerDay key.


export const timeByMonth = monthBreakdownData;

export const dailyInput = dailyInputData
  .map(entry => {
    return [entry[0], entry[3]];
  });

export const dailyInputFull = dailyInputData;

export const music = musicData;

export const repertoire = repertoireData;

export const timeByDay = timeByDayData;