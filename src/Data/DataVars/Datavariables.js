//This file will hold all the variables which are created from the objects in data.js. These variables will be used to create data which I can display.

import { timeByMonth, dailyInput, dailyInputFull, music, repertoire, timeByDay } from '../DataTxt/Data';

//    FUNCTIONS


//    TIME BY MONTH FUNCTIONS

//  The only purpose of timeToMinutes is to take an array of time values (h:mm:ss / hh:mm:ss / hhh:mm:ss) and converting it to a total amount of minutes. 
//  If you want to know the total amount of time spent on a specific thing, you first create a filtered array with the timeSpentOn method, and then you use timeToMinutes to convert it to minutes.

//  NOTE: in the restMinutes constant, I map every entry to entry * 1. I do this because each entry sits in its own array, and I want to remove that inner array. There must be a better way of doing that.

const timeToMinutes = (input, index) => {
  const splitArr = input.map(entry => entry[index])
  .map(entry => entry.split(':'))
  .map(entry => entry.map(index => parseInt(index, 10)));
  
  const hoursInMinutes = splitArr.map(time => time.slice(0,1))
    .map(entry => entry * 60);
  
  const restMinutes = splitArr.map(time => time.slice(1,2))
    .map(entry => entry * 1);        
 
  return hoursInMinutes.reduce((a, b) => a + b) + restMinutes.reduce((a, b) => a + b);
};


//    DAILY INPUT FUNCTIONS

//  timeSpentOn takes an input file, an index at which the entry to search for is, and the term for which we want to search. It returns an array with all the entries that 
//  match the searchFor argument at the given entry index.

const timeSpentOn = (input, index, searchFor) => {
  return input.filter(entry => entry[index] === searchFor);
};


//    MUSIC FUNCTIONS

//  The musicObjectCreator function creates an object, which basically only works if it gets the right input at the right places.
//  It displays, for each composer, which books were studied, how long was spent, and how many pieces were learned.
//  I've opted against using a parameter for both this function and the next one, since its specific purpose is to create an object out of the music object anyway.

const musicObjectCreator = () => {
  const listOfComposers = [...new Set(music.map(entry => entry[0]))];
  const musicObj = {};
  
  for (let i = 0; i < listOfComposers.length; i++) {
    const composerArr = timeSpentOn(music, 0, listOfComposers[i]); 

    musicObj[listOfComposers[i]] = {
      books: composerArr.map(entry => entry[1]),
      time: timeToMinutes(composerArr, 2),
      pieces: composerArr.map(entry => parseInt(entry[3])).reduce((a, b) => a + b) ? composerArr.map(entry => parseInt(entry[3])).reduce((a, b) => a + b) : 0
    };
  };
  return musicObj;
};

//  This function creates an object which holds keys (book names) and values (objects with time spent & number of pieces). This object is used to calculate the average per book.

const bookObjectCreator = () => {
  const listOfBooks = [...new Set(music.map(entry => entry[1]))];
  const bookObj = {};
  
  for (let i = 0; i < listOfBooks.length; i++) {
    const booksArr = timeSpentOn(music, 1, listOfBooks[i]); 

    bookObj[listOfBooks[i]] = {
      time: timeToMinutes(booksArr, 2),
      pieces: booksArr.map(entry => parseInt(entry[3])).reduce((a, b) => a + b) ? booksArr.map(entry => parseInt(entry[3])).reduce((a, b) => a + b) : 0
    };
  };
  return bookObj;
};

//  This function takes three arguments, obj (either of the musicObject objects), index (the index of the key in the music object) and searchFor (what you want to display). 

 const specificObjectCreator = (obj, index, searchFor) => {
  const listOfKeys = [...new Set(music.map(entry => entry[index]))];
  const dataCopy = Object.assign({}, obj);

  for (let i = 0; i < listOfKeys.length; i++) {
    dataCopy[listOfKeys[i]] = dataCopy[listOfKeys[i]][searchFor];
  };
  return dataCopy;
};

//    REPERTOIRE FUNCTONS

//  I've opted against adding a third parameter for the dataset you want to use. This is because it only really works to filter the repertoire file anyway; it makes more sense to directly access repertoire in the function.
//  The learnedInYear function takes two arguments: the starting year and the completion year. It's set up to work only if the input data txt file has the dates at the right indexes.
//  The second parameter, year 2, is optional. If it's passed as an argument, the first line of code runs. If it isn't passed, the second line of code runs.
//  The first line returns an array of entries which match both years at the given input. A ternary expression is used to account for the possibility of [5] of each entry being an empty string.
//  The second line returns an array of entries which were started in a certain year, but were not yet completed at the end of last year.

const learnedInYear = (year1, year2) => {
  return year2 ? repertoire.filter(entry => entry[5] !== undefined ? entry[4].includes(year1) && entry[5].includes(year2) : null) 
    : repertoire.filter(entry => entry[4].includes(year1) && !entry[5]);
};

//  A quick Date Converter, to help me make some calculations with the Date object. 
//  This function specifically only correctly converts the data it expects. You can easily turn this into a more general appliance if you need.

const daysBetweenDates = (data) => {  
  return data.map((date) => {
    const dateConverter = (date) => {
      let split = date.split('-').map(x => parseInt(x));
      return new Date(split[0], (split[1]-1), (split[2]+1));
    }

    const dateDiff = (first, second) => {
      return Math.round((second-first)/(1000*60*60*24))
    }

    return [date[0], date[1], date[2], date[3], dateDiff(dateConverter(date[4]), dateConverter(date[5]))+1];
  });
};


//  This function takes an unknown number of arguments. 
//  A for loop iterates through the arguments and creates an array out of each argument. Each array has two entries, [0] holds the total time for all pieces, [1] holds the number of pieces.
//  These arrays get pushed into the tempArr array. Inside the return statement, we sum the total time at [0] and the number of pieces at [1], and then divide the total time by the total number of pieces.

const averageNumberOfDays = (...arr) => {
  let tempArr = [];
  for (let i = 0; i < arr.length; i++) {
    const avArr = (data) => {
      let daysArr = data.map(entry => entry[4]);
      return [
        daysArr.reduce((a, b) => a + b),
        daysArr.length
      ];
    }
    tempArr.push(avArr(arr[i]));
  };
  return Math.round((tempArr.map(entry => entry[0]).reduce((a, b) => a + b))/tempArr.map(entry => entry[1]).reduce((a, b) => a + b));
};

//  This function creates an object. Its keys are the composers, and each key has an array as a value. Each entry of this array is another array containing a work that's been learned.
//  The keys are set to just the last name of the composer. If I ever want access to the full name of a composer, I'll just create a separate object or array.
//  The .substring(1) method is used to remove the double quotes, looks a bit better.

const repertoireObjectCreator = () => {
  const listOfComposers = [...new Set(repertoire.map(entry => entry[0]))];
  const repObj = {};
  
  for (let i = 0; i < listOfComposers.length; i++) {
    const composerArr = timeSpentOn(repertoire, 0, listOfComposers[i]); 

    repObj[listOfComposers[i].split(',')[0].substring(1)] = 
      composerArr.map(entry => entry[0] === listOfComposers[i] ? entry.slice(1, 4) : null)
  };
  return repObj;
};


//  This function takes the result of repertoireObjectCreator and converts it to an object with keys (composers) and values (number of pieces).
//  This function works because the new set created has an equal amount of entries, sorted in the same order, as our dataKeys object.
const repPiecesByComposer = (obj) => {
  const listOfKeys = [...new Set(repertoire.map(entry => entry[0]))];
  let returnObj = {}
  let dataKeys = Object.keys(obj)

  for (let i = 0; i < listOfKeys.length; i++) {    
    returnObj[listOfKeys[i].split(',')[0].substring(1)] = obj[dataKeys[i]].length;
  }
  return returnObj;
}

//  This function creates an object with keys (months) and values (an array which stores a arary entries for each piece learned).
//  This function took a lot of time to make, so, without a doubt, it could be much improved in terms of efficiency.
//  repCopy maps each entry. If it has a value at [5], it targets entry[index] and splits the year from it. If [5] has no value, [4] is directly targeted.
//  Targeting [4] directly is not ideal, but I can't target [index] without it throwing an error, because [5] of the final entry is undefined. I get away with it, because if [5] has no value, there's no reason to ever
//  target another index than [4].
const dateRepObjCreator = (index, year) => {
  const dateObj = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
  }
  const dateKeys = Object.keys(dateObj);
  let returnObj = {};
  const repCopy = [...repertoire].map(entry => entry[5] !== undefined && entry[5] !== ''  
    ? [entry[0], entry[1], entry[2], entry[3], parseInt(entry[4].split('-').slice(1, 2)), parseInt(entry[5].split('-').slice(1, 2)), parseInt(entry[index].split('-').slice(0, 1))]
    : [entry[0], entry[1], entry[2], entry[3], parseInt(entry[4].split('-').slice(1, 2)), '', parseInt(entry[4].split('-').slice(0, 1))]);  

  for (let i = 0; i < dateKeys.length; i++) {
    for (let j = 0; j < repCopy.length; j++) {
      if (repCopy[j][index] !== undefined && repCopy[j][index] !== '') {
        returnObj[dateObj[i+1]] = repCopy.filter(entry => entry[index] == dateKeys[i] && entry[6] == year).map(entry => [entry[0].split(',')[0], entry[1], entry[2], entry[3]]) 
      }      
    }
  }
  return returnObj;
}

//  This function converts an object from the function above to an object of key (month) value (number of pieces) pairs.
const dateRepObjNum = (obj) => {
  const objCopy = Object.assign({}, obj);
  const objKeys = Object.keys(objCopy);
  const objValues = objKeys.map(key => obj[key]);
  const returnObj = {};

  for (let i = 0; i < objKeys.length; i++) {
    returnObj[objKeys[i]] = objValues[i].length
  } 
  return returnObj;
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
export const musicObjectByComposer = musicObjectCreator();
export const musicObjectByBook = bookObjectCreator();

//  Four more specific objects. Each has a number of keys (composers / books) and each key has one value (a number, either pieces or minutes). 
//  These objects will make data manipulation much easier.
export const piecesPerComposer = specificObjectCreator(musicObjectByComposer, 0, 'pieces');
export const timePerComposer = specificObjectCreator(musicObjectByComposer, 0, 'time');
export const timePerBook = specificObjectCreator(musicObjectByBook, 1, 'time');
export const piecesPerBook = specificObjectCreator(musicObjectByBook, 1, 'pieces');


//    REPERTOIRE VARIABLES

//  The following four variables each store an array. Each array stores a self-explanatory set of repertoire pieces. All are included and all are included only once.
export const started2017Finished2018 = learnedInYear(2017, 2018);
export const started2018Finished2018 = learnedInYear(2018, 2018);
export const started2017InProgress = learnedInYear(2017);
export const started2018InProgress = learnedInYear(2018);

//  These two variables each store an array similar to the arrays above, but it excludes any dates and, at the [4] entry, includes the number of days it took to learn each piece.
//  Note that this calculation starts only after initially learning the piece. This is important for the eventual display of data. 
export const daysToLearn2017 = daysBetweenDates(started2017Finished2018);
export const daysToLearn2018 = daysBetweenDates(started2018Finished2018);

//  Self explanatory variable, stores the average amount of days it took to learn a piece of repertoire.
export const averageDaysToLearnRep = averageNumberOfDays(daysToLearn2017, daysToLearn2018);

//  The obj stores an object with composer keys. Each key has an array as a value, storing all the pieces learned from that composer.
//  The numberOfPiecesPerComposer variable stores an object with composer keys and the number of pieces learned by that composer.
export const repPiecesByComposerObj = repertoireObjectCreator();
export const numberOfPiecesPerComposer = repPiecesByComposer(repPiecesByComposerObj)

//  The upper two variables store keysvalue pairs. The keys are months, the values are arrays with all the entries of everything that was started / finished during that month.
//  The lower two variable store key-value pairs. The keys are months, the values are the number of pieces started or finished during thah month.
export const startedInMonth = dateRepObjCreator(4, 2018);
export const finishedInMonth = dateRepObjCreator(5, 2018);

export const amountStartedInMonth = dateRepObjNum(startedInMonth);
export const amountFinishedInMonth = dateRepObjNum(finishedInMonth);
