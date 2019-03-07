import React from 'react';

import classes from './ComposerFace.module.css';

const composerFace = (props) => {
  const composerFaceAlt = `A picture of ${props.composerFace}.`;
  
  return (
    <div className={classes.Container}>
      <img className={classes.Faces} src={require(`../../../../assets/Composers/${props.composer}.jpg`)} alt={composerFaceAlt}/>
    </div>
  );
}; 

export default composerFace;