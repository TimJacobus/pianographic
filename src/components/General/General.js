import React from 'react';

import classes from './General.module.css';
import Time from './Time/GeneralTime';
import Composers from './Composers/GeneralComposers'

const general = () => (
  <div className={classes.General}>
      <Time />
      <div className={classes.InfoBlock}>
        <Composers />
      </div>
  </div>
);


export default general;