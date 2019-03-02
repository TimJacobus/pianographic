import React from 'react';

import { totalMinutesInYear } from '../../../Data/DataVars/MonthVars';
import { minutesToTimeConverter } from '../../../Data/DataVars/TimeByDayVars';
import { totalAmountOfPieces, totalAmountOfBooks, totalAmountOfComposers } from '../../../Data/DataVars/MusicVars';
import { totalStartedIn2018 } from '../../../Data/DataVars/RepVars';

const generalTime = () => (
  <div>
    <h1>Total time practised: {minutesToTimeConverter(totalMinutesInYear)}.</h1>
    <h2>A daily average of {minutesToTimeConverter(totalMinutesInYear / 365) }.</h2>
    <h2>{totalAmountOfPieces} pieces learned by {totalAmountOfComposers} composers from {totalAmountOfBooks} books.</h2>
    <h2>{totalStartedIn2018} pieces converted into repertoire.</h2>
  </div>

);

export default generalTime;