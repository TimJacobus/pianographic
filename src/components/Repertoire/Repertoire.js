import React from 'react';

import classes from './Repertoire.module.css';
import ComposerFaces from './ComposerFaces/ComposerFaces';

import { started2017Finished2018, started2018Finished2018, started2017InProgress, started2018InProgress, averageDaysToLearnRep } from '../../Data/DataVars/RepVars';

const repertoire = () => {
  
  //  daysToMonth roughly converts days to a value of 'x months and y days'. It's not perfect, but it's sufficient.
  const daysToMonth = (dayInput) => {
    let days = 0;
    let months = 0;
    let startDays = dayInput;

    while (startDays > 0) {
      if (startDays >= 30) {
        months++;
        startDays = startDays - 30;
      }
      if (startDays >= 1) {
        days++;
        startDays--;
      }
    }
    return `${months} months and ${days} days`;
  }
 
  return (
    <div className={classes.OuterDiv}>
      <h1>Repertoire</h1>
      <div className={classes.InnerDiv}>
        <div className={classes.Explanation}>
          <h3>To turn a piece into repertoire, I repeatedly relearned and laid aside a piece of music. I spent relatively little time actually practising the piece.</h3>
          <h3>This method of letting time pass and letting myself forget the music worked really well to ingrain the piece long-term.</h3>
        </div>
        <div className={classes.Specification}>
          <h3>The first repertoire piece completed and recorded was {started2017Finished2018[4][3]} by Thomas Dunhill on 21 April 2018.</h3>
          <h3>Of the <span>{started2017Finished2018.length + started2017InProgress.length}</span> repertoire pieces that were started in 2017, <span>{started2017Finished2018.length}</span> were recorded in 2018, and <span>{started2017InProgress.length}</span> were carried over into 2019.</h3>
          <h3>Of the <span>{started2018Finished2018.length + started2018InProgress.length}</span> repertoire pieces that were started in 2018, <span>{started2018Finished2018.length}</span> were recorded in 2018, and <span>{started2018InProgress.length}</span> were carried over into 2019.</h3>
          <h3>It took an average time of <span>{daysToMonth(averageDaysToLearnRep)}</span> to go from having initially learned a piece to recording and completing it as repertoire.</h3>
        </div>
        <div className={classes.ComposerFaces}>
          <h1>Number of repertoire pieces per composer.</h1>
          <ComposerFaces />
        </div>
      </div>
    </div>
  );
};

export default repertoire;