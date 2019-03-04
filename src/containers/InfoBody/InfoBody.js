import React from 'react';

import classes from './InfoBody.module.css';

import Header from '../../components/Header/Header';
import General from '../../components/General/General';
import Time from '../../components/Time/Time';
import Books from '../../components/Books/Books';
import Repertoire from '../../components/Repertoire/Repertoire';


const infoBody = () => (
  <div className={classes.InfoBody}>
    <Header />
    <General />
    <Time />
    <Books />
    <Repertoire />
  </div>
)

export default infoBody;