import React, { Component } from 'react';
import styles from './App.module.css';
//import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { Composers } from '../components/Composers/Composers';
import { Cockpit } from '../components/Cockpit/Cockpit';
//import {dailyInput} from './Data/DataTxt/Data';


class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor');
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount');
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount')
  }

  shouldComponentUpdate( nextProps, nextState ) {
    return nextState.composers !== this.state.composers ||
      nextState.showComposers !== this.state.showComposers;
  }
  
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
    console.log('[App.js] Inside Render');
    
    let composers = null;

    if (this.state.showComposers) {
      composers = (
        <Composers 
          composers={this.state.composers}
          clicked={this.deleteComposerHandler}
          changed={this.composerChangeHandler} />
      );
    }
    
    return (
        <div className={styles.App}>
          <button onClick={() => {this.setState({showComposers: true})}}>Show Composers</button>
          <Cockpit 
            showComposers={this.state.showComposers}
            composers={this.state.composers}
            clicked={this.toggleComposerHandler}/>
          {composers}        
        </div>

    );
  }
}

export default App;
