import React, { Component } from 'react';
import './App.css';
import Composer from './Composer/Composer';
//import {dailyInput} from './Data/DataTxt/Data';


class App extends Component {
  state = {
    composers: [
      { id: 'id1', name: 'Bela Bartok', era: '20th Century' },
      { id: 'id2', name: 'Wolfgang Amadeus Mozart', era: 'Classical'},
      { id: 'id3', name: 'Johann Sebastian Bach', era: 'Baroque' }
    ],
    showComposers: false
  }
  
  composerChangeHandler = ( event, id ) => {
    const composerIndex = this.state.composers.findIndex(c => {
      return c.id === id;
    });

    const composer = {
      ...this.state.composers[composerIndex]
    };
    
    composer.name = event.target.value;

    const composers = [...this.state.composers];
    composers[composerIndex] = composer;

    this.setState( {composers: composers });
  }

  deleteComposerHandler = (composerIndex) => {
    const composers = [...this.state.composers];
    composers.splice(composerIndex, 1);
    this.setState({composers: composers});
  }

  toggleComposerHandler = () => {
    const doesShow = this.state.showComposers;
    this.setState( {
      showComposers: !doesShow
    });
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    let composers = null;

    if (this.state.showComposers) {
      composers = (
        <div>
          {this.state.composers.map((composer, index) => {
            return <Composer 
              click={() => this.deleteComposerHandler(index)}
              name={composer.name}
              era={composer.era}
              key={composer.id}
              changed={(event) => this.composerChangeHandler(event, composer.id)} />
          })}
        </div> 
      );

      style.backgroundColor = 'red';
    }

    let classes = [];
    if (this.state.composers.length <= 2) {
      classes.push('red');
    }
    if (this.state.composers.length <= 1) {
      classes.push('bold');
    }
    
    return (
        <div className="App">
          <h1>Piano Graphic 2018</h1>
          <p className={classes.join(' ')}>There are three composer cards.</p>
          <button 
            style={style}
            onClick={this.toggleComposerHandler}>Toggle Composer Cards</button>

          {composers}        

        </div>

    );
  }
}

export default App;
