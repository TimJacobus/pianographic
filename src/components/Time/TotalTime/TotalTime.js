import React from 'react';

import { totalMinutesInYear } from '../../../Data/DataVars/MonthVars';
import { minutesToTimeConverter } from '../../../Data/DataVars/TimeByDayVars';
import { timeOnLessons, timeOnRepertoire, timeOnMusic, timeOnTechnique, timeOnSightReading } from '../../../Data/DataVars/DayVars';
import classes from './TotalTime.module.css';

const totalTime = () => {
  return (
    <div className={classes.TotalTime}>
      <h1>Breaking Down Total Time Practised</h1>
      <div className={classes.YearBreakdown}>
        <h2>Practised for {minutesToTimeConverter(totalMinutesInYear+2)} in 2018.</h2>
        <div className={classes.YearSpecification}>
          <h3>{minutesToTimeConverter(timeOnMusic)} spent learning <span>new music</span>.</h3>
          <h3>{minutesToTimeConverter(timeOnRepertoire)} spent building a <span>repertoire</span>.</h3>
          <h3>{minutesToTimeConverter(timeOnLessons)} spent at just as many <span>lessons</span>.</h3>
          <h3>{minutesToTimeConverter(timeOnTechnique)} spent on <span>technique</span>.</h3>
          <h3>{minutesToTimeConverter(timeOnSightReading)} spent on <span>sight-reading</span>.</h3>
        </div>
      </div>
    </div>
  )
}

export default totalTime;