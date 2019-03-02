import React from 'react';

import classes from './GeneralComposers.module.css';

import Composer from './Composer/Composer';

const composers = () => (
  <div className={classes.Composers}>
    <h1>Top Composers of the Year</h1>
    <div className={classes.ComposerCards}>
      <Composer 
        composer="Béla Bartók" 
        lastName="Bartok" 
        favBook="Mikrokosmos Book 3" 
        favPiece="Quasi Adagio (For Children, No. 3)" 
        imgLink="https://i.imgur.com/7DgerxT.jpg" />
      <Composer 
        composer="Johann Sebastian Bach" 
        lastName="Bach" 
        favBook="Notebook for Anna Magdalena Bach" 
        favPiece="Menuet fait par Mons. Böhm" 
        imgLink="https://i.imgur.com/qG9Ytrn.jpg" />   
      <Composer 
        composer="Alexandre Tansman" 
        lastName="Tansman" 
        favBook="Happy Time Book 1" 
        favPiece="Dreams" 
        imgLink="https://i.imgur.com/dm8Zwca.jpg"/>
      <Composer 
        composer="Jenő Takács" 
        lastName="Takacs" 
        favBook="From Far Away Places, Op. 111" 
        favPiece="Ballad of the Bad Knight" 
        imgLink="https://i.imgur.com/gyAjQW2.jpg"
        />
      <Composer 
        composer="Dmitri Kabalevsky" 
        lastName="Kabalevsky" 
        favBook="24 Pieces for Children, Op. 39" 
        favPiece="Waltz (No. 23)" 
        imgLink="https://i.imgur.com/LgKMQ0m.jpg" />  
      <Composer 
        composer="Charles Koechlin" 
        lastName="Koechlin" 
        favBook="12 Easy Pieces, Op. 208" 
        favPiece="Valse" 
        imgLink="https://i.imgur.com/It0fGAd.jpg" />
    </div>
  </div>
  
);

export default composers;

//https://imgur.com/a/Fn7LFEH