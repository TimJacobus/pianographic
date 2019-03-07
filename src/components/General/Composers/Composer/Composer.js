import React from 'react';

import classes from './Composer.module.css';

import { timePerComposer, piecesPerComposer, musicObjectByComposer, composerFullnameObj } from '../../../../Data/DataVars/MusicVars';
import { repPiecesByComposerObj } from '../../../../Data/DataVars/RepVars';
import { minutesToTimeConverter } from '../../../../Data/DataVars/TimeByDayVars';

const composer = (props) => {
  const imgAlt = `A picture of the composer ${composerFullnameObj[props.lastName]}.` 
  
  //  Outputting a dynamic paragraph, using a ternary expression to account for instances where there was only 1 book (to not have '... from 1 books').
  let piecesFromBooks;
  musicObjectByComposer[props.lastName]['books'].length > 1 
    ? piecesFromBooks = <p>Learned {piecesPerComposer[props.lastName]} pieces from {musicObjectByComposer[props.lastName]['books'].length} books.</p>
    : piecesFromBooks = <p>Learned {piecesPerComposer[props.lastName]} pieces from {musicObjectByComposer[props.lastName]['books'].length} book.</p>;

  //  Same reason as above for the ternary expression.
  let repPieces;
  repPiecesByComposerObj[props.lastName].length !== 1
    ? repPieces = <p>Converted {repPiecesByComposerObj[props.lastName].length} pieces into repertoire.</p>
    : repPieces = <p>Converted {repPiecesByComposerObj[props.lastName].length} piece into repertoire.</p>

  return (
    <div className={classes.Outer}>
      <h2>{composerFullnameObj[props.lastName]}</h2>
      <div className={classes.Box}>
        <div className={classes.InnerLeft}>    
          <img src={require(`../../../../assets/Composers/${props.lastName}.jpg`)} alt={imgAlt} />
        </div>
        <div className={classes.InnerRight}>
          <p>Spent {minutesToTimeConverter(timePerComposer[props.lastName])} learning new material.</p>
          {piecesFromBooks}
          {repPieces}
          <p>Favourite book: {props.favBook}.</p>
          <p>Favourite piece: {props.favPiece}.</p>
        </div>
      </div>
    </div>
  )

};

export default composer;