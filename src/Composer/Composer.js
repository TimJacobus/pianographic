import React from 'react';
import './Composer.css';

const composer = (props) => {
    return (
    <div className='Composer'>
    	<p onClick={props.click}>I'm {props.name} and I wrote in a {props.era} style. {props.children}</p>
			<input type='text' onChange={props.changed} value={props.name} />
    </div>  
		);
	};

export default composer;