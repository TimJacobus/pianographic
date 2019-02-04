import React, { Component } from 'react';

import { Composer } from './Composer/Composer';

export class Composers extends Component {
  constructor(props) {
		super(props);
		console.log('[Composers.js] Inside Constructor');
  }

  shouldComponentUpdate( nextProps, nextState ) {
    return nextProps.composers !== this.props.composers ||
      nextProps.changed !== this.props.changed ||
      nextProps.clicked !== this.props.clicked;
  }
  
  render() {
    console.log('[Composers.js] Inside Render')
    
    return this.props.composers.map(( composer, index ) => {
      return <Composer 
        click={() => this.props.clicked(index)}
        name={composer.name}
        era={composer.era}
        key={composer.id}
        changed={(event) => this.props.changed(event, composer.id)} />
    });
  }
}