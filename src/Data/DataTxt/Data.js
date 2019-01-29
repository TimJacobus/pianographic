//                    ALL THE VARIABLES THAT HOLD OBJECTS CONVERTED FROM EXCEL WORKSHEETS

//THE PROBLEM HERE IS PROBABLY ABOUT AJAX OR SOMETHING

//const fs = require('fs');
import fs from 'fs';

//The convertTxt function converts an Excel .txt import into an array.
const convertTxt = (txt) => {
  return fs.readFileSync(txt, 'utf8')
    .trim()
    .replace(/\r/g, '')
    .split('\n')
    .map(line => line.split('\t'));
};

//Each constant stores a bare-bones array of data, which will be mutated at a later point.
const monthBreakdownData = convertTxt('./../DataTxt/monthbreakdown.txt');
const dailyInputData = convertTxt('./../DataTxt/dailyinput.txt');
const musicData = convertTxt('./../DataTxt/music.txt');
const repertoireData = convertTxt('./../DataTxt/repertoire.txt');
const timeByDayData = convertTxt('./../DataTxt/timebyday.txt');

//The timeByMonth variable holds an object, which has 12 keys, one for each month. Each key stores an array, and this array stores an object with a totalTime key and timePerDay key.


export const timeByMonth = monthBreakdownData;

export const dailyInput = dailyInputData
  .map(entry => {
    return [entry[0], entry[3]];
  });

export const music = musicData;

export const repertoire = repertoireData;

export const timeByDay = timeByDayData;
