//This file will hold all the variables which are created from the objects in data.js. These variables will be used to create data which I can display.

import { timeByMonth, dailyInput, dailyInputFull, music, repertoire, timeByDay } from '../DataTxt/Data';

//    FUNCTIONS

//  The only purpose of timeToMinutes is to take an array of time values (h:mm:ss / hh:mm:ss / hhh:mm:ss) and converting it to a total amount of minutes. 
//  If you want to know the total amount of time spent on a specific thing, you first create a filtered array with the timeSpentOn method, and then you use timeToMinutes to convert it to minutes.

//  NOTE: in the restMinutes constant, I map every entry to entry * 1. I do this because each entry sits in its own array, and I want to remove that inner array. There must be a better way of doing that.

const timeToMinutes = (timeArray, index) => {
  const splitArr = timeArray.map(entry => entry[index])
  .map(entry => entry.split(':'))
  .map(entry => entry.map(index => parseInt(index, 10)));
  
  const hoursInMinutes = splitArr.map(time => time.slice(0,1))
    .map(entry => entry * 60);
  
  const restMinutes = splitArr.map(time => time.slice(1,2))
    .map(entry => entry * 1);        
 
  return hoursInMinutes.reduce((a, b) => a + b) + restMinutes.reduce((a, b) => a + b);
}


//  timeSpentOn takes an input file, an index at which the entry to search for is, and the term for which we want to search. It returns an array with all the entries that 
//  match the searchFor argument at the given entry index.

const timeSpentOn = (input, index, searchFor) => {
  return input.filter(entry => entry[index] === searchFor);
}


//  The musicObject function creates an object, which basically only works if it gets the right input at the right places.
//  It displays, for each composer, which books were studied, how long was spent, and how many pieces were learned.
//  The data argument that this function and the next function receive, is the music txt file.

const musicObjectCreator = (data) => {
  const listOfComposers = [...new Set(music.map(entry => entry[0]))];
  const musicObj = {};
  
  for (let i = 0; i < listOfComposers.length; i++) {
    const composerArr = timeSpentOn(data, 0, listOfComposers[i]); 

    musicObj[listOfComposers[i]] = {
      books: composerArr.map(entry => entry[1]),
      time: timeToMinutes(composerArr, 2),
      pieces: composerArr.map(entry => parseInt(entry[3])).reduce((a, b) => a + b) ? composerArr.map(entry => parseInt(entry[3])).reduce((a, b) => a + b) : 0
    }
  }
  return musicObj;
}

//  This function creates an object which holds keys (book names) and values (objects with time spent & number of pieces). This object is used to calculate the average per book.

const bookObjectCreator = (data) => {
  const listOfBooks = [...new Set(music.map(entry => entry[1]))];
  const musicObj = {};
  
  for (let i = 0; i < listOfBooks.length; i++) {
    const booksArr = timeSpentOn(data, 1, listOfBooks[i]); 

    musicObj[listOfBooks[i]] = {
      time: timeToMinutes(booksArr, 2),
      pieces: booksArr.map(entry => parseInt(entry[3])).reduce((a, b) => a + b) ? booksArr.map(entry => parseInt(entry[3])).reduce((a, b) => a + b) : 0
    }
  }
  return musicObj;
}

 //This function takes three arguments, obj (either of the musicObject objects), index (the index of the key in the music object) and searchFor (what you want to display). 

 const specificObjectCreator = (obj, index, searchFor) => {
  const listOfKeys = [...new Set(music.map(entry => entry[index]))];
  const dataCopy = Object.assign({}, obj);

  for (let i = 0; i < listOfKeys.length; i++) {
    dataCopy[listOfKeys[i]] = dataCopy[listOfKeys[i]][searchFor];
  }
  return dataCopy;
}


//    VARIABLES


//    TIMEBYMONTH VARIABLES

export const totalMinutesInYear = timeToMinutes(timeByMonth, 1);
export const hoursInYear = Math.floor(totalMinutesInYear/60);
export const restMinutesInYear = totalMinutesInYear - hoursInYear*60;
export const timeByMonthCopy = [...timeByMonth];     //This array can be used to make a graph or something, probably.


//    DAILYINPUT VARIABLES

//  The idea is that I store values in minutes here. In the DisplayVars file, I will turn them into a hh:mm value. This hh:mm value is used for the tooltip, the minutes is 
//  used to display the actual data.
export const timeOnLessons = timeToMinutes(timeSpentOn(dailyInput, 0, 'Piano Lesson'), 1);
export const timeOnRepertoire = timeToMinutes(timeSpentOn(dailyInputFull, 1, 'Repertoire'), 3);
export const timeOnMusic = timeToMinutes(timeSpentOn(dailyInput, 0, 'Music'), 1);
export const timeOnTechnique = timeToMinutes(timeSpentOn(dailyInput, 0, 'Technique'), 1);
export const timeOnSightReading = timeToMinutes(timeSpentOn(dailyInput, 0, 'Sight Reading'), 1);


//    MUSIC VARIABLES

//  The two root objects which store a lot of information.
export const musicObjectByComposer = musicObjectCreator(music);
export const musicObjectByBook = bookObjectCreator(music);

//  Four more specific objects. Each has a number of keys (composers / books) and each key has one value (a number, either pieces or minutes). 
//  These objects will make data manipulation much easier.
export const piecesPerComposer = specificObjectCreator(musicObjectByComposer, 0, 'pieces');
export const timePerComposer = specificObjectCreator(musicObjectByComposer, 0, 'time');
export const timePerBook = specificObjectCreator(musicObjectByBook, 1, 'time');
export const piecesPerBook = specificObjectCreator(musicObjectByBook, 1, 'pieces');

