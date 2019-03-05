import { music } from '../DataTxt/Data';
import { timeSpentOn } from './DayVars';
import { timeToMinutes } from './MonthVars';


//    FUNCTIONS

//  The musicObjectCreator function creates an object, which basically only works if it gets the right input at the right places.
//  It displays, for each composer, which books were studied, how long was spent, and how many pieces were learned.
//  I've opted against using a parameter for both this function and the next one, since its specific purpose is to create an object out of the music object anyway.

const musicObjectCreator = () => {
  const listOfComposers = [...new Set(music.map(entry => entry[0]))];
  const musicObj = {};
  
  for (let i = 0; i < listOfComposers.length; i++) {
    const composerArr = timeSpentOn(music, 0, listOfComposers[i]); 

    musicObj[listOfComposers[i]] = {
      books: composerArr.map(entry => entry[1]),
      time: timeToMinutes(composerArr, 2),
      pieces: composerArr.map(entry => parseInt(entry[3])).reduce((a, b) => a + b) ? composerArr.map(entry => parseInt(entry[3])).reduce((a, b) => a + b) : 0
    };
  };
  return musicObj;
};

//  This function creates an object which holds keys (book names) and values (objects with time spent & number of pieces). This object is used to calculate the average per book.

const bookObjectCreator = () => {
  const listOfBooks = [...new Set(music.map(entry => entry[1]))];
  const bookObj = {};
  
  for (let i = 0; i < listOfBooks.length; i++) {
    const booksArr = timeSpentOn(music, 1, listOfBooks[i]); 

    bookObj[listOfBooks[i]] = {
      time: timeToMinutes(booksArr, 2),
      pieces: booksArr.map(entry => parseInt(entry[3])).reduce((a, b) => a + b) ? booksArr.map(entry => parseInt(entry[3])).reduce((a, b) => a + b) : 0
    };
  };
  return bookObj;
};

//  This function takes three arguments, obj (either of the musicObject objects), index (the index of the key in the music object) and searchFor (what you want to display). 

 const specificObjectCreator = (obj, index, searchFor) => {
  const listOfKeys = [...new Set(music.map(entry => entry[index]))];
  const dataCopy = Object.assign({}, obj);

  for (let i = 0; i < listOfKeys.length; i++) {
    dataCopy[listOfKeys[i]] = dataCopy[listOfKeys[i]][searchFor];
  };
  return dataCopy;
};

//    VARIABLES

//  The two root objects which store a lot of information.
export const musicObjectByComposer = musicObjectCreator();
export const musicObjectByBook = bookObjectCreator();

//  Four more specific objects. Each has a number of keys (composers / books) and each key has one value (a number, either pieces or minutes). 
//  These objects will make data manipulation much easier.
export const piecesPerComposer = specificObjectCreator(musicObjectByComposer, 0, 'pieces');
export const timePerComposer = specificObjectCreator(musicObjectByComposer, 0, 'time');
export const timePerBook = specificObjectCreator(musicObjectByBook, 1, 'time');
export const piecesPerBook = specificObjectCreator(musicObjectByBook, 1, 'pieces');

export const totalAmountOfPieces = Object.keys(piecesPerComposer).map(key => piecesPerComposer[key]).reduce((a, b) => a + b); 
export const totalAmountOfBooks = Object.keys(timePerBook).length-1;
export const totalAmountOfComposers = Object.keys(piecesPerComposer).length-1;

export const musicObj = music;



export const composerFullnameObj = {
  Attwood: 'Thomas Attwood',
  Bach: 'Johann Sebastian Bach',
  Bartok: 'Béla Bartók',
  Bloch: 'Ernest Bloch',
  Boyle: 'Rory Boyle',
  Burgmuller: 'Friedrich Burgmüller',
  Clementi: 'Muzio Clementi',
  Dunhill: 'Thomas Dunhill',
  Franck: 'César Franck',
  Fuchs: 'Robert Fuchs',
  Goedicke: 'Aleksandr Gedike',
  Grechaninov: 'Aleksandr Grechaninov',
  Gurlitt: 'Cornelius Gurlitt',
  Hassler: 'Johann Wilhelm Hässler',
  Kabalevsky: 'Dmitri Kabalevsky',
  Kadosa: 'Pál Kadosa',
  Koechlin: 'Charles Koechlin',
  Purcell: 'Henry Purcell',
  Satie: 'Erik Satie',
  Schumann: 'Robert Schumann',
  Streabbog: 'Jean Louis Gobbaerts',
  Swinstead: 'Felix Swinstead',
  Szabo: 'Ferenc Szabó',
  Takacs: 'Jenő Takács',
  Tansman: 'Alexandre Tansman',
  Tchaikovsky: 'Pyotr Ilyich Tchaikovsky',
  Turk: 'Daniel Gottlob Türk'
}

export const bookFullnameObj = {
  Attwood: "Four Sonatinas",
  BachAnnaMagdalena: "Notebook for Anna Magdalena Bach",
  BaroqueKeyboard1: "Baroque Keyboard Pieces Book 1",
  Bartok10Easy: "10 Easy Pieces",
  BartokForChildren: "For Children",
  BlochEnfantines: "Enfantines",
  Boyle: "In Times Past",
  Burgmuller100: "25 Progressive Studies",
  Clementi36: "Six Sonatinas",
  DunhillSwinstead: "Work and Play",
  FuchsChildren: "Children's Pieces",
  Franck: "25 Short Pieces from L'Organiste",
  Goedicke36: "60 Easy Piano Pieces for Beginners Book 2",
  Grechaninov98: "Children's Book",
  Gurlitt101: "Albumleaves for the Young",
  Gurlitt205: "Little Flowers",
  Hassler38: "50 Pieces for Beginners",
  KabalevskyCollection39: "24 Pieces for Children",
  Kadosa55: "55 Small Piano Pieces",
  Koechlin208: "12 Small Easy Pieces",
  Mikrokosmos2: "Mikrokosmos Book 2",
  Mikrokosmos3: "Mikrokosmos Book 3",
  SatieChildren: "Nine Children's Pieces",
  Schumann68: "Album for the Young",
  Streabbog63: "12 Easy and Melodious Studies",
  Szabo1: "Selected Piano Pieces Book 1",
  Takacs76: "For Me",
  Takacs111: "From Far Away Places",
  TansmanHappy1: "Happy Time Book 1",
  Tchaikovsky39: "Album for the Young",
  Turk1: "60 Pieces for Aspiring Players Book 1",
  Turk2: "60 Pieces for Aspiring Players Book 2"
}