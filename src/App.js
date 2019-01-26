import React, { Component } from 'react';
import './App.css';
import Composer from './Composer/Composer';
import {dailyInput} from './Data/DataTxt/Data';

class App extends Component {
  state = {
    composers: [
      { name: 'Bela Bartok', era: '20th Century' },
      { name: 'Wolfgang Amadeus Mozart', era: 'Classical'},
      { name: 'Johann Sebastian Bach', era: 'Baroque' }
    ]
  };
  
  switchComposerHandler = (newName) => {
    this.setState( {
      composers: [
        { name: newName, era: '20th Century' },
        { name: 'Wolfgang Amadeus Mozart', era: 'Classical'},
        { name: 'Johann Sebastian Bach', era: 'Baroque' }
      ]
    });
  };

  composerChangeHandler = ( event ) => {
    this.setState( {
      composers: [
        { name: 'Bela Bartok', era: '20th Century' },
        { name: event.target.value, era: 'Classical'},
        { name: 'Johann Sebastian Bach', era: 'Baroque' }
      ]
    });
  };

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };
    
    return (
      <div className="App">
        <h1>Piano Graphic 2018</h1>

        <button 
          style={style}
          onClick={() => this.switchComposerHandler('Jeno Takacs')}>Change Composer</button>

        <Composer 
          name={this.state.composers[0].name} 
          era={this.state.composers[0].era} />
        <Composer 
          name={this.state.composers[1].name} 
          era={this.state.composers[1].era}
          click={this.switchComposerHandler.bind(this, 'Arnold Schoenberg')}
          changed={this.composerChangeHandler}>And my laugh is weird.</Composer>
        <Composer 
          name={this.state.composers[2].name} 
          era={this.state.composers[2].era} />
      </div>
    );
  };
};

export default App;
