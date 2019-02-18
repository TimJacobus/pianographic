import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Composer.module.css';
import Aux from '../../../hoc/WithClass';
import exportWrap from '../../../hoc/exportWrap';
import AuthContext from '../../../context/auth-context';

class Composer extends Component {
	constructor(props) {
		super(props);
		this.inputElementRef = React.createRef();
	}

	static contextType = AuthContext;
	
	componentDidMount() {
		this.inputElementRef.current.focus();
	}
	
	render() {
		return (
			<Aux>
			 {this.context.authenticated ? ( 
				 <p>A composer is you!</p> 
				) : ( 
				 <p>Git gud.</p>
				)}		
				
				<p onClick={this.props.click}>
					I'm {this.props.name} and I wrote in a {this.props.era} style. {this.props.children}
				</p>
				<input 
					type='text' 
					ref={this.inputElementRef}
					onChange={this.props.changed} 
					value={this.props.name} />
			</Aux> 
		);
	}
} 	

Composer.propTypes = {
	click: PropTypes.func,
	name: PropTypes.string,
	age: PropTypes.number,
	changed: PropTypes.func
};

export default exportWrap(Composer, styles.Composer);