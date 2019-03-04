import React from 'react';

import classes from './Book.module.css';
import { timePerBook, piecesPerBook } from '../../../Data/DataVars/MusicVars';
import { minutesToTimeConverter } from '../../../Data/DataVars/TimeByDayVars';

const book = (props) => {
  const composerDirAlt = `A picture of the composer ${props.composer}.`;
  const bookDirAlt = `A picture of the book ${props.book}`;
  
  return (
    <div className={classes.OuterDiv}>
      <h3>{props.book} by {props.composer}</h3>
      <div className={classes.InnerDiv}>
        <div className={classes.BookContainer}>
          <img src={require(`../../../assets/Books/${props.composerDir}/${props.bookDir}.jpg`)} alt={bookDirAlt} /> 
        </div>
        <div className={classes.RightBlock}>
          <div className={classes.ComposerContainer}>
            <img src={require(`../../../assets/Composers/${props.composerDir}.jpg`)} alt={composerDirAlt}/>
          </div>
          <p>Total time spent: {minutesToTimeConverter(timePerBook[props.objKey])}</p>
          <p>Total number of pieces learned: {piecesPerBook[props.objKey]}</p>
          <p>Average time per piece: {minutesToTimeConverter((timePerBook[props.objKey]/piecesPerBook[props.objKey]))}</p>
        </div>
      </div>
    </div>

  );
}

export default book;