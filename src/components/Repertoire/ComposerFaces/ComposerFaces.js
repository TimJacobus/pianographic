import React from 'react';

import ComposerFace from './ComposerFace/ComposerFace';
import ComposerFaceP from './ComposerFace/ComposerFaceP';
import classes from './ComposerFaces.module.css';

import { repPiecesByComposerObj } from '../../../Data/DataVars/RepVars';
import { composerFullnameObj } from '../../../Data/DataVars/MusicVars';

//  composerFaces outputs an array with composer name, each name represents one piece by that composer.
const composerFaces = () => {

  //  composerArr takes the repPiecesByComposerObj and turns it into an array with array entries, composer at [0] and no. of pieces at [1]. These entries get sorted based on the value at [1].
  const composerArr = () => {

    const keyValueArr = [];
    for (let entry in repPiecesByComposerObj) {
      keyValueArr.push([entry, repPiecesByComposerObj[entry].length])
    }
    keyValueArr.sort((a, b) => b[1] - a[1]);

    //  The returnArr will store the names, which get repeated based on the number stored at each entry[1].
    let returnArr = [];
    for (let i = 0; i < keyValueArr.length; i++) {
      let tempArr = new Array(keyValueArr[i][1]).fill(keyValueArr[i][0]);
      returnArr = returnArr.concat(tempArr);
    }
    return returnArr;    
  }

  const arrayOfFaces = composerArr();

  //  A method which takes a simplified composer name as a value and outputs the proper composer's last name, mainly used for Eastern-European composers with weird letters in their names.
  const properLastName = (composer) => {
    const arr = composerFullnameObj[composer].split(' ');
    return arr.slice(arr.length-1, arr.length).join('');
  }

  //  composerFaces gets returned by this component, and it contains a bunch of instances of either ComposerFace or ComposerFaceP. The difference between the two is the paragraph element with the composer's name.
  //  I didn't want the same name repeated a number of times, so only the first entry of that composer gets a name tag.
  const composerFaces = arrayOfFaces.map((composer, index) => {
    return arrayOfFaces[index-1] === arrayOfFaces[index] 
    ? <ComposerFace composer={composer} composerProper={properLastName(composer)} key ={index}/>
    : <ComposerFaceP composer={composer} composerProper={properLastName(composer)} key ={index}/>
  })
  
  return (
    <div className={classes.Container}>
      <div className={classes.ComposerFaces}>
        {composerFaces} 
      </div>
    </div>
  )
}

export default composerFaces;