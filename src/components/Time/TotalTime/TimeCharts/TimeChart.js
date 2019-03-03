import React from 'react';
import * as d3 from "d3";

import { timeOnLessons, timeOnRepertoire, timeOnMusic, timeOnTechnique, timeOnSightReading } from '../../../../Data/DataVars/DayVars';

const timeChart = () => {
  const dataSet = [timeOnLessons, timeOnRepertoire, timeOnMusic, timeOnTechnique, timeOnSightReading]; 
  
  //  For now, the goal is to understand how d3 works. Follow the lessons on FreeCodeCamp, which should lead to you being able to create a pie graph and a bar graph.

  const svgContainer = d3.select('body')
    .append('svg')
    .attr('width', '500px')
    .attr('height', '300px');
  
    const svgChart = svgContainer.selectAll('rect')
      .data(dataSet)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 25)
      .attr('height', 100)

  
  return (
    <div>
      
    </div>
  )
}

export default timeChart;