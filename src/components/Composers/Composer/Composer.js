import React, { Component } from 'react';
import styles from './Composer.module.css';
import Aux from '../../../hoc/WithClass';
import exportWrap from '../../../hoc/exportWrap';

class Composer extends Component {
  render() {
		return (
			<Aux>
				<p onClick={this.props.click}>
					I'm {this.props.name} and I wrote in a {this.props.era} style. {this.props.children}
				</p>
				<input 
					type='text' 
					onChange={this.props.changed} 
					value={this.props.name} />
			</Aux> 
		);
	}
} 	

export default exportWrap(Composer, styles.Composer);