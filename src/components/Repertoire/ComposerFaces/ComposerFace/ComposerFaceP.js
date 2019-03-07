import React from 'react';

import classes from './ComposerFace.module.css';

const composerFaceP = (props) => {
  const composerFaceAlt = `A picture of ${props.composerFace}.`;
  
  return (
    <div className={classes.Container}>
      <img className={classes.Faces} src={require(`../../../../assets/Composers/${props.composer}.jpg`)} alt={composerFaceAlt}/>
      <p>{props.composerProper}</p>
    </div>
  );
}; 

export default composerFaceP;