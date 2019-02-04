import React, { Component } from 'react';
import styles from './Composer.module.css';

export class Composer extends Component {
	constructor(props) {
		super(props);
		console.log('[Composer.js] Inside Constructor');
  }
  
  
  render() {
		return (
			<div className={styles.Composer}>
				<p onClick={this.props.click}>I'm {this.props.name} and I wrote in a {this.props.era} style. {this.props.children}</p>
				<input type='text' onChange={this.props.changed} value={this.props.name} />
			</div>  
			);
	}
} 	
