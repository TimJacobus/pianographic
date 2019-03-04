import React from 'react';

import classes from './TimeMonth.module.css';
import Month from './Month/Month';

const timeMonth = () => {
  return (
    <div className={classes.TimeMonth}>
      <h1>The Months</h1>
      <div className={classes.TimeMonthContainer}>
        <Month month="January" />
        <Month month="February" />
        <Month month="March" />
        <Month month="April" />
        <Month month="May" />
        <Month month="June" />
        <Month month="August" />
        <Month month="July" />
        <Month month="September" />
        <Month month="October" />
        <Month month="November" />
        <Month month="December" />
      </div>
    </div>

  );
}

export default timeMonth;