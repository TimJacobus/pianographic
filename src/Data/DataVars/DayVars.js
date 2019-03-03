import { dailyInput, dailyInputFull } from '../DataTxt/Data';
import { timeToMinutes } from './MonthVars';


//    FUNCTIONS

//  timeSpentOn takes an input file, an index at which the entry to search for is, and the term for which we want to search. It returns an array with all the entries that 
//  match the searchFor argument at the given entry index.

export const timeSpentOn = (input, index, searchFor) => {
  return input.filter(entry => entry[index] === searchFor);
};

//    VARIABLES

//  The idea is that I store values in minutes here. In the DisplayVars file, I will turn them into a hh:mm value. This hh:mm value is used for the tooltip, the minutes is 
//  used to display the actual data.
export const timeOnLessons = timeToMinutes(timeSpentOn(dailyInput, 0, 'Piano Lesson'), 1);
export const timeOnRepertoire = timeToMinutes(timeSpentOn(dailyInputFull, 1, 'Repertoire'), 3);
export const timeOnMusic = timeToMinutes(timeSpentOn(dailyInput, 0, 'Music'), 1)-timeOnRepertoire;
export const timeOnTechnique = timeToMinutes(timeSpentOn(dailyInput, 0, 'Technique'), 1);
export const timeOnSightReading = timeToMinutes(timeSpentOn(dailyInput, 0, 'Sight Reading'), 1);