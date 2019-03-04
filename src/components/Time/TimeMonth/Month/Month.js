import React from 'react';

import classes from './Month.module.css';

import { totalTimePerMonth, averageTimePerMonth, minutesToTimeConverter, months0Prac } from '../../../../Data/DataVars/TimeByDayVars';
import { amountStartedInMonth, amountFinishedInMonth } from '../../../../Data/DataVars/RepVars';

const month = (props) => {
  let zeroPrac = <p>Missed {months0Prac[props.month]} days of practice.</p>

  if (months0Prac[props.month] === 1) {
    zeroPrac = <p>Missed {months0Prac[props.month]} day of practice.</p>
  }

  let repStarted = <p>Started working on {amountStartedInMonth[props.month]} repertoire pieces.</p>

  if (amountStartedInMonth[props.month] === 1) {
    repStarted = <p>Started working on {amountStartedInMonth[props.month]} repertoire piece.</p>
  }

  let repFinished = <p>Finished working on {amountFinishedInMonth[props.month]} repertoire pieces.</p>

  if (amountFinishedInMonth[props.month] === 1) {
    repFinished = <p>Finished working on {amountFinishedInMonth[props.month]} repertoire piece.</p>
  }
  
  return (
    <div className={classes.Outer}>
      <h2>{props.month}</h2>
      <div className={classes.MonthContainer}>
        <img src={require(`../../../../assets/Seasons/${props.month}.png`)} alt={props.month} />
        <div className={classes.InfoContainer}>
          <p>Time practised: {minutesToTimeConverter(totalTimePerMonth[props.month])}.</p>
          <p>Daily average: {minutesToTimeConverter(averageTimePerMonth[props.month])}.</p>
          {repStarted}
          {repFinished}
          {zeroPrac}
        </div>
      </div>   
    </div>
  );
}

export default month;