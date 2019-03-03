import React from 'react';

import classes from './TimeMonth.module.css';
import Month from './Month/Month';

const timeMonth = () => {
  return (
    <div className={classes.TimeMonth}>
      <h1>The Months</h1>
      <div className={classes.TimeMonthContainer}>
        <Month imgLink="https://i.imgur.com/ZffLhaP.png" month="January" />
        <Month imgLink="https://i.imgur.com/4eHdQzT.png" month="February" />
        <Month imgLink="https://i.imgur.com/QTJ6Le1.png" month="March" />
        <Month imgLink="https://i.imgur.com/XpsJgD7.png" month="April" />
        <Month imgLink="https://i.imgur.com/f4lxhao.png" month="May" />
        <Month imgLink="https://i.imgur.com/D0h9tkr.png" month="June" />
        <Month imgLink="https://i.imgur.com/Vr05GFm.png" month="July" />
        <Month imgLink="https://i.imgur.com/8pXNfw8.png" month="August" />
        <Month imgLink="https://i.imgur.com/SqFTXui.png" month="September" />
        <Month imgLink="https://i.imgur.com/Nkn7pfr.png" month="October" />
        <Month imgLink="https://i.imgur.com/doe9u31.png" month="November" />
        <Month imgLink="https://i.imgur.com/33T3Naq.png" month="December" />
      </div>
    </div>

  );
}

export default timeMonth;

//https://imgur.com/a/J3mUc9v