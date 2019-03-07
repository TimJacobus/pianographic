import React from 'react';

import classes from './GeneralComposers.module.css';
import Composer from './Composer/Composer';

//  It can't be avoided that all props here are to be manually set. Everything that can be set dynamically, is done so in Composer.js.

const composers = () =>  (
  <div className={classes.Composers}>
    <h1>Favourite Composers of the Year</h1>
    <div className={classes.ComposerCards}>
      <Composer 
        lastName="Bartok" 
        favBook="Mikrokosmos Book 3" 
        favPiece="Quasi Adagio (For Children, No. 3)" />
      <Composer 
        lastName="Bach" 
        favBook="Notebook for Anna Magdalena Bach" 
        favPiece="Menuet fait par Mons. Böhm" />   
      <Composer 
        lastName="Tansman" 
        favBook="Happy Time Book 1" 
        favPiece="Dreams" />
      <Composer 
        lastName="Takacs" 
        favBook="From Far Away Places, Op. 111" 
        favPiece="Ballad of the Bad Knight" />
      <Composer 
        lastName="Kabalevsky" 
        favBook="24 Pieces for Children, Op. 39" 
        favPiece="Waltz (No. 23)" />  
      <Composer 
        lastName="Koechlin" 
        favBook="12 Easy Pieces, Op. 208" 
        favPiece="Valse" />
    </div>
  </div>
);

export default composers;