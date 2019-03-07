import React from 'react';

import classes from './Books.module.css';
import Book from './Book/Book';

import { totalAmountOfPieces, bookFullnameObj, composerFullnameObj, musicObj } from '../../Data/DataVars/MusicVars';
import { minutesToTimeConverter } from '../../Data/DataVars/TimeByDayVars';
import { timeOnMusic } from '../../Data/DataVars/DayVars';

const books = () => {
  //  book takes two arguments and, depending on the arguments, displays the books that meet the requirements set by these arguments.
  const book = (minTime, maxTime) => {

    //  minutes converts hh:mm to minutes, something for which I should really create a more generally applicable function.
    const minutes = musicObj.map(entry => entry[2].split(':')
      .map(entry => parseInt(entry, 10)))
      .map(entry => [entry[0] * 60, entry[1]])
      .map(entry => entry[0] + entry[1]);

    //  turns musicObj into an array with a time value in minutes at [2]
    const musicMinutes = musicObj.map((entry, index) => [entry[0], entry[1], minutes[index], entry[3]]);

    //  filter musicMinutes, the requirement being that [3] must store an entry greater than 1 (more than 1 piece learned, down from 2). It's then sorted, the lowest average per piece being first.
    //  Lastly, we map this sorted array and only output entries based on minTime and maxTime. minTime is the floor for average time per piece, maxTime is the (non-inclusive) ceiling for average time per piece.
    //  If it meets the requirements, an instance of Book is returned. It has a couple of dynamic props which are used to display the right composer picture, book picture, data, and composer name.
    return musicMinutes.filter(entry => entry[3] > 1)
    .sort((a, b) => (a[2] / a[3]) - (b[2] / b[3]))
    .map(entry => (entry[2] / entry[3]) >= minTime && (entry[2] / entry[3]) < maxTime 
      ? <Book composerDir={entry[0]} bookDir={entry[1]} composer={composerFullnameObj[entry[0]]} book={bookFullnameObj[entry[1]]} key={entry[1]}/>
      : null);
  }
  
  return (
    <div className={classes.Books}>
      <h1>Books Breakdown</h1>
      <h2>Average time to learn a piece of music: {minutesToTimeConverter((timeOnMusic / totalAmountOfPieces))}.</h2>
      <br/>
      <h3>Listed below is a specification of the time spent initially learning pieces from each book.</h3>
      <h3>Further study of pieces to convert them to repertoire is not included.</h3>
      <h3>Only books from which I have learned at least two pieces are included.</h3>
      <div>
        <div className={classes.BookCategory}>
          <h2>Books With Up To 1 Hour / Piece Average</h2>
          <h4>These books contain short pieces which were easy relative to my abilities at the time.</h4>
          <h4>Useful for the repetition of previously learned concepts, which means solidifying both reading and playing technique, and developing musicality.</h4>
        </div>
        <div className={classes.BookContainer}>
          {book(0, 60)}
        </div>
        <div className={classes.BookCategory}>
          <h2>Books With 1 - 2.5 Hours / Piece Average</h2>
          <h4>The pieces in these books are somewhat longer, and/or were slightly more difficult relative to my abilities at the time.</h4>
          <h4>Useful for the repetition of previously learned concepts, sporadically presenting new technical challenges, and developing musicality.</h4>
        </div>
        <div className={classes.BookContainer}>
          {book(60, 150)}
        </div>
        <div className={classes.BookCategory}>
          <h2>Books With 2.5 - 4 Hours / Piece Average</h2>
          <h4>These books presented me with a perfect balance between technical, reading, and expression requirements.</h4>
          <h4>Repeating previously learned concepts, new technical challenges, opportunities to work on musicality, and good reading practice; these books had it all.</h4>
        </div>
        <div className={classes.BookContainer}>
          {book(150, 240)}
        </div>
        <div className={classes.BookCategory}>
          <h2>Books With 4+ Hours / Piece Average</h2>
          <h4>The pieces in these books were more challenging than average for a variety of reasons, the most common reason being a high tempo marking.</h4>
          <h4>Musicality, reading, or technical requirements made these pieces relatively hard. Thus, depending on the piece, one or more of these aspects of my playing got better.</h4>
        </div>
        <div className={classes.BookContainer}>
          {book(240, 1000)}
        </div>
      </div>
    </div>
  );
}

export default books; 