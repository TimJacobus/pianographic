import React, { Component } from 'react';

import classes from './App.module.css';

import exportWrap from '../hoc/exportWrap';
import InfoBody from './InfoBody/InfoBody';


class App extends Component {
  
  render() {    
    return (
      <div className={classes.App}>
        <InfoBody />
      </div>

    );
  }
}


//http://paletton.com/#uid=3090Q0kllllaFw0g0qFqFg0w0aF

export default App;
