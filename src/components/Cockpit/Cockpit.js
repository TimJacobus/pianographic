import React, { useEffect, useRef } from 'react';
import styles from './Cockpit.module.css';

const Cockpit = (props) => {
  const toggleBtnRef = useRef(null);

  // useEffect(() => {
  //   toggleBtnRef.current.click();
  // }, []);

  let classes = [];
  let btnClass = styles.Button;

  if (props.showComposers) {
    btnClass = [styles.Button, styles.Red].join(' ');
  }

  if (props.composers.length <= 2) {
    classes.push(styles.red);
  }
  if (props.composers.length <= 1) {
    classes.push(styles.bold);
  }
  
  return (
    <>
      <h1>Piano Graphic 2018</h1>
      <p className={classes.join(' ')}>There are three composer cards.</p>
      <button 
        // ref={toggleBtnRef}
        className={btnClass}
        onClick={props.clicked}>Toggle Composer Cards</button>
    </>
  );
}

export default React.memo(Cockpit);