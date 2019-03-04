import React from 'react';

import classes from './Books.module.css';
import Book from './Book/Book';

import { totalAmountOfPieces } from '../../Data/DataVars/MusicVars';
import { minutesToTimeConverter } from '../../Data/DataVars/TimeByDayVars';
import { timeOnMusic } from '../../Data/DataVars/DayVars';

const books = () => {
  return (
    <div className={classes.Books}>
      <h1>Books Breakdown</h1>
      <h2>Average time to learn a piece of music: {minutesToTimeConverter((timeOnMusic / totalAmountOfPieces))}.</h2>
      <br/>
      <h3>Listed below is the time spent on initially learning every piece from the book.</h3>
      <h3>Further study of pieces to convert them to repertoire is not included here.</h3>
      <div>
        <div className={classes.BookCategory}>
          <h2>Books With Up To 1 Hour / Piece Average</h2>
          <h4>These books contain short pieces and the pieces were easy relative to my abilities at the time I learned them.</h4>
          <h4>Useful for the repetition of previously learned concepts, which means solidifying both reading and playing technique, and developing musicality.</h4>
        </div>
        <div className={classes.BookContainer}>
          <Book composerDir='Turk' bookDir='Turk2' objKey='Turk book 2' composer='Daniel Gottlob Türk' book='60 Pieces for Aspiring Players Book 2'/> 
          <Book composerDir='Kadosa' bookDir='Kadosa55' objKey='Kadosa 55' composer='Pál Kadosa' book='55 Small Piano Pieces'/>
          <Book composerDir='Swinstead' bookDir='DunhillSwinstead' objKey='Swinstead Work and Play' composer='Felix Swinstead' book='Work and Play'/>
          <Book composerDir='Szabo' bookDir='Szabo1' objKey='Szabo 1' composer='Ferenc Szabó' book='Selected Piano Pieces Book 1'/> 
        </div>
        <div className={classes.BookCategory}>
          <h2>Books With 1 - 2.5 Hours / Piece Average</h2>
          <h4>The pieces in these books are somewhat longer, and were slightly more difficult relative to my abilities at the time.</h4>
          <h4>Useful for the repetition of previously learned concepts, sporadically presenting new technical challenges, and developing musicality.</h4>
        </div>
        <div className={classes.BookContainer}>
          <Book composerDir='Turk' bookDir='Turk1' objKey='Turk book 1' composer='Daniel Gottlob Türk' book='60 Pieces for Aspiring Players Book 1'/>
          <Book composerDir='Bartok' bookDir='Bartok10Easy' objKey='Bartok 10 Easy Pieces' composer='Béla Bartók' book='10 Easy Pieces'/>
          <Book composerDir='Goedicke' bookDir='Goedicke36' objKey='Goedicke 36' composer='Aleksandr Gedike' book='60 Easy Piano Pieces for Beginners Book 2'/>
          <Book composerDir='Boyle' bookDir='Boyle' objKey='Boyle In Times Past' composer='Rory Boyle' book='In Times Past'/>
          <Book composerDir='Takacs' bookDir='Takacs111' objKey='Takacs 111' composer='Jenő Takács' book='From Far Away Places'/>
          <Book composerDir='Takacs' bookDir='Takacs76' objKey='Takacs 76' composer='Jenő Takács' book='For Me'/>
        </div>
        <div className={classes.BookCategory}>
          <h2>Books With 2.5 - 4 Hours / Piece Average</h2>
          <h4>These books presented me with a perfect balance between technical, reading, and expression requirements.</h4>
          <h4>Repeating previously learned concepts, new technical challenges, opportunities to work on musicality, and good reading practice; these pieces had it all.</h4>
        </div>
        <div className={classes.BookContainer}>
          <Book composerDir='Koechlin' bookDir='Koechlin208' objKey='Koechlin 12 Petites Pieces Faciles' composer='Charles Koechlin' book='12 Small Easy Pieces'/>
          <Book composerDir='Tansman' bookDir='TansmanHappy1' objKey='Tansman Happy Time Book 1' composer='Alexandre Tansman' book='Happy Time Book 1'/>
          <Book composerDir='Bartok' bookDir='Mikrokosmos3' objKey='Mikrokosmos Book 3' composer='Béla Bartók' book='Mikrokosmos Book 3'/>
          <Book composerDir='Bartok' bookDir='BartokForChildren' objKey='Bartok Sz 42' composer='Béla Bartók' book='For Children'/>
          <Book composerDir='Gurlitt' bookDir='Gurlitt205' objKey='Gurlitt 205' composer='Cornelius Gurlitt' book='Little Flowers'/>
          <Book composerDir='Grechaninov' bookDir='Grechaninov98' objKey='Grechaninov 98' composer='Aleksandr Grechaninov' book="Children's Book"/>
          <Book composerDir='Schumann' bookDir='Schumann68' objKey='Schumann 68' composer='Robert Schumann' book='Album for the Young'/>
          <Book composerDir='Hassler' bookDir='Hassler38' objKey='Hassler 38' composer='Johann Wilhelm Hässler' book='50 Pieces for Beginners'/>
          <Book composerDir='Franck' bookDir='Franck' objKey='Franck 25 Pieces' composer='César Franck' book="25 Short Pieces from L'Organiste"/>
          <Book composerDir='Tchaikovsky' bookDir='Tchaikovsky39' objKey='Tchaikovsky 39' composer='Pyotr Ilyich Tchaikovsky' book='Album for the Young'/>
          <Book composerDir='Fuchs' bookDir='FuchsChildren' objKey="Fuchs Children's Pieces" composer='Robert Fuchs' book="Children's Pieces"/>
          <Book composerDir='Kabalevsky' bookDir='KabalevskyCollection' objKey='Kabalevsky 39' composer='Dmitri Kabalevsky' book='24 Pieces for Children'/>
        </div>

        <div className={classes.BookCategory}>
          <h2>Books With 4+ Hours / Piece Average</h2>
          <h4>The pieces in these books were more challenging than average for a variety of reasons, the most common reason being a high tempo marking.</h4>
          <h4>Musicality, reading, or technical requirements made these pieces relatively hard. Thus, depending on the piece, one or more of these aspects of my playing got better.</h4>
        </div>
        <div className={classes.BookContainer}>
          <Book composerDir='Attwood' bookDir='Attwood' objKey='Attwood' composer='Thomas Attwood' book='Four Sonatinas'/>
          <Book composerDir='Satie' bookDir='SatieChildren' objKey='Satie for Children' composer='Erik Satie' book="Nine Children's Pieces"/>
          <Book composerDir='Burgmuller' bookDir='Burgmuller100' objKey='Burgmuller Op. 100' composer='Friedrich Burgmüller' book='25 Progressive Studies'/>
          <Book composerDir='Bloch' bookDir='BlochEnfantines' objKey='Bloch Enfantines' composer='Ernest Bloch' book='Enfantines'/>
          <Book composerDir='Bartok' bookDir='Mikrokosmos2' objKey='Mikrokosmos Book 2' composer='Béla Bartók' book='Mikrokosmos Book 2'/>
          <Book composerDir='Bach' bookDir='BachAnnaMagdalena' objKey='Bach Anna Magdalena' composer='Johann Sebastian Bach' book='Notebook for Anna Magdalena Bach'/>
          <Book composerDir='Gurlitt' bookDir='Gurlitt101' objKey='Gurlitt 101' composer='Cornelius Gurlitt' book='Albumleaves for the Young'/>
        </div>
      </div>
    </div>
  )
};

export default books; 