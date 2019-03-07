import React from 'react';

import classes from './Time.module.css';
import TotalTime from './TotalTime/TotalTime';
import TimeMonth from './TimeMonth/TimeMonth';

const time = () => (
  <div className={classes.Time}>
    <TotalTime />
    <TimeMonth />
  </div>
);

export default time;