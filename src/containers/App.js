import React, { Component } from 'react';

import classes from './App.module.css';
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

export default App;
