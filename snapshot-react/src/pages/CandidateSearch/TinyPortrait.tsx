/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */

import {
  Line, line, scaleLinear, select,
} from 'd3';
import { useEffect, useRef } from 'react';

import { SkillGrade } from '../../models/candidateSearch/ICandidateSearch';

interface Datum {
  x: number;
  y: number;
}

function randomColor(): string {
  // Generate random values for red, green, and blue components
  const r = Math.floor(Math.random() * 256); // Random integer between 0 and 255
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Convert the RGB values to hexadecimal and format them as a CSS color code
  const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

  return hex;
}

function TinyPortrait(skillGrades: SkillGrade): JSX.Element {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const margin = {
    top: 20, right: 10, bottom: 60, left: 10,
  };
  const width = 450 - margin.left - margin.right;
  const height = 250 - margin.top - margin.bottom;

  const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    const data = [skillGrades];

    if (svgRef.current) svgRef.current.innerHTML = '';
    const svg = select(svgRef.current);
    svg.attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .attr('fill', 'gray');

    const radius = 75;
    // const ticks = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
    // const ticks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const ticks = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    // radial scale
    const radAxis = scaleLinear().domain([0.1, 1.0]).range([0, radius]);
    const radAxis1 = scaleLinear().domain([10, 100]).range([0, radius]);

    const cordForAngle = (angle: number, len: number): { x: number, y: number } => {
      const x = Math.cos(angle) * len;
      const y = Math.sin(angle) * len;

      return { x, y };
    };

    const keys = Object.keys(skillGrades);

    for (let i = 0; i < keys.length; i++) {
      const slice = Math.PI / 2 + (2 * Math.PI * i) / keys.length;
      const key = keys[i];

      // axis values
      const { x, y } = cordForAngle(slice, radius);

      svg
        .append('line')
        .attr('x2', x + width / 2.5)
        .attr('y2', y + height / 1.5)
        .attr('x1', width / 2.5)
        .attr('y1', height / 1.5)
        .attr('stroke', 'white')
        .attr('stroke-width', 1.5)
        .style('opacity', 0.1);

      svg
        .append('text')
        .attr('x', x + width / 3)
        .attr('y', y + height / 1.5)
        .text(capitalize(key))
        .style('text-anchor', (_d) => (i === 0
          ? 'start'
          : i === 1
            ? 'start'
            : i === 2
              ? 'start'
              : i === 2
                ? 'end'
                : 'start'))
        .attr('dx', (_d) => (i === 0
          ? '0.7em'
          : i === 1
            ? '-0.7em'
            : i === 2
              ? '-0.5em'
              : i === 3
                ? '0.3em'
                : '0.6em'))
        .attr('dy', (_d) => (i === 0
          ? '1.3em'
          : i === 1
            ? '0.4em'
            : i === 2
              ? '-0.5em'
              : i === 3
                ? '-0.5em'
                : '0.4em'))
        .attr('fill', 'white');
    }

    // circle labels
    ticks.forEach((el) => {
      svg
        .append('text')
        .attr('x', width / 2.5)
        .attr('y', height / 1.5 - radAxis1(el) - 0.85)
        .text(el)
        .attr('fill', 'white')
        .attr('stroke', 'none')
        .attr('opacity', '0.5')
        .style('text-anchor', 'middle')
        .style('font-size', '0.425rem');
    });

    // circes levels
    ticks.forEach((el) => {
      svg
        .append('circle')
        .attr('cx', width / 2.5)
        .attr('cy', height / 1.5)
        .attr('fill', 'none')
        .attr('stroke', 'gray')
        .attr('stroke-width', 1.0)
        .attr('r', radAxis1(el));
    });

    // line generator
    const lineGen: Line<Datum> = line<Datum>()
      .x((d) => d.x)
      .y((d) => d.y);

    // converting data point to coordinates
    const getCoordPath = (dataPoint: SkillGrade): Datum[] => {
      const coord: Datum[] = [];

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const angle = Math.PI / 2 + (2 * Math.PI * i) / keys.length;
        coord.push(cordForAngle(angle, radAxis(Number(dataPoint[key])) / 120));
      }

      const firstAngle = Math.PI / 2 + (2 * Math.PI * 0) / keys.length;
      coord.push(cordForAngle(firstAngle, radAxis(Number(dataPoint[keys[0]])) / 120));

      return coord;
    };

    // drawing path
    for (let i = 0; i < data.length; i++) {
      const d = data[i];

      const cord = getCoordPath(d);

      // spider chart
      svg
        .append('path')
        .datum(cord)
        .attr('class', 'areapath')
        .attr('d', lineGen)
        .attr('stroke-width', 4)
        .attr('stroke', () => (randomColor()))
        .attr('fill', 'none')
        .attr('opacity', 1)
        .attr('transform', `translate(${width / 2.5}, ${height / 1.5})`)
        .attr('cursor', 'pointer');
    }
  }, [height, margin.bottom, margin.left, margin.right, margin.top, skillGrades, width]);

  return (
    <div>
      <svg ref={svgRef} />
    </div>

  );
}
export default TinyPortrait;
