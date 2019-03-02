import React from 'react';

import classes from './Composer.module.css';

import { timePerComposer, piecesPerComposer, musicObjectByComposer } from '../../../../Data/DataVars/MusicVars';
import { repPiecesByComposerObj } from '../../../../Data/DataVars/RepVars';
import { minutesToTimeConverter } from '../../../../Data/DataVars/TimeByDayVars';

const composer = (props) => {
  const imgAlt = `A picture of the composer ${props.composer}.` 
  
  let piecesFromBooks;
  musicObjectByComposer[props.lastName]['books'].length > 1 
    ? piecesFromBooks = <p>Learned {piecesPerComposer[props.lastName]} pieces from {musicObjectByComposer[props.lastName]['books'].length} books.</p>
    : piecesFromBooks = <p>Learned {piecesPerComposer[props.lastName]} pieces from {musicObjectByComposer[props.lastName]['books'].length} book.</p>;

  let repPieces;
  repPiecesByComposerObj[props.lastName].length !== 1
    ? repPieces = <p>Converted {repPiecesByComposerObj[props.lastName].length} pieces into repertoire.</p>
    : repPieces = <p>Converted {repPiecesByComposerObj[props.lastName].length} piece into repertoire.</p>

  return (
    <div className={classes.Outer}>
      <h2>{props.composer}</h2>
      <div className={classes.Box}>
        <div className={classes.InnerLeft}>    
          <img src={props.imgLink} alt={imgAlt} />
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