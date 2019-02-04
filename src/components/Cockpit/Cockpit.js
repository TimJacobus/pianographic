import React from 'react';
import styles from './Cockpit.module.css';


export const Cockpit = (props) => {
  
  let classes = [];
  let btnClass = '';

  if (props.showComposers) {
    btnClass = styles.Red;
  }

  if (props.composers.length <= 2) {
    classes.push(styles.red);
  }
  if (props.composers.length <= 1) {
    classes.push(styles.bold);
  }
  
  return (
    <div className={styles.Cockpit}>
      <h1>Piano Graphic 2018</h1>
      <p className={classes.join(' ')}>There are three composer cards.</p>
      <button 
        className={btnClass}
        onClick={props.clicked}>Toggle Composer Cards</button>
    </div>
  );
}