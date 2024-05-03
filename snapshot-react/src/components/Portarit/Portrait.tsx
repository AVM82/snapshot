/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-operators */
import {
  Line, line, scaleLinear, select,
} from 'd3';
import { useEffect, useRef, useState } from 'react';

import styles from './Portrait.module.scss';
// const data = [
//   {
//     interviewId: 1,
//     userId: 2,
//     interviewDateTime: '2024-04-24T10:00:00',
//     skillResults: [
//       {
//         skillId: 53,
//         skillName: 'Normalization',
//         averageGrade: 57,
//         questionCount: 3,
//       },
//       {
//         skillId: 56,
//         skillName: 'Firewall Configuration',
//         averageGrade: 100,
//         questionCount: 1,
//       },
//       {
//         skillId: 57,
//         skillName: 'Intrusion Detection and Prevention Systems (IDPS)',
//         averageGrade: 50,
//         questionCount: 1,
//       },
//       {
//         skillId: 58,
//         skillName: 'VPN Implementation',
//         averageGrade: 0,
//         questionCount: 1,
//       },
//       {
//         skillId: 29,
//         skillName: 'Java',
//         averageGrade: 87.5,
//         questionCount: 2,
//       },
//       {
//         skillId: 47,
//         skillName: 'MongoDB',
//         averageGrade: 50,
//         questionCount: 1,
//       },
//     ],
//   },
//   {
//     interviewId: 2,
//     userId: 2,
//     interviewDateTime: '2024-04-26T20:03:12',
//     skillResults: [
//       {
//         skillId: 53,
//         skillName: 'Normalization',
//         averageGrade: 59.666666666666664,
//         questionCount: 3,
//       },
//       {
//         skillId: 57,
//         skillName: 'Intrusion Detection and Prevention Systems (IDPS)',
//         averageGrade: 88,
//         questionCount: 2,
//       },
//       {
//         skillId: 47,
//         skillName: 'MongoDB',
//         averageGrade: 45,
//         questionCount: 1,
//       },
//     ],
//   },
//   {
//     interviewId: 3,
//     userId: 2,
//     interviewDateTime: null,
//     skillResults: [
//       {
//         skillId: 56,
//         skillName: 'Firewall Configuration',
//         averageGrade: 53,
//         questionCount: 2,
//       },
//       {
//         skillId: 29,
//         skillName: 'Java',
//         averageGrade: 84.75,
//         questionCount: 4,
//       },
//     ],
//   },
// ];

interface Datum {
  x: number;
  y: number;
}

const data = [
  {
    java: 87,
    'firewall configuration': 100,
    normalization: 57,
    js: 95,
    css: 77,
  },
  {
    java: 67,
    'firewall configuration': 34,
    normalization: 15,
    js: 90,
    css: 45,
  },
  {
    java: 45,
    'firewall configuration': 34,
    normalization: 19,
    js: 13,
    css: 78,
  },
  {
    java: 87,
    'firewall configuration': 33,
    normalization: 56,
    js: 65,
    css: 85,
  },
  {
    java: 10,
    'firewall configuration': 13,
    normalization: 15,
    js: 14,
    css: 47,
  },
  {
    java: 89,
    'firewall configuration': 91,
    normalization: 58,
    js: 78,
    css: 37,
  },
  {
    java: 89,
    'firewall configuration': 91,
    normalization: 58,
    js: 78,
    css: 37,
  },
  {
    java: 89,
    'firewall configuration': 91,
    normalization: 58,
    js: 78,
    css: 37,
  },
  {
    java: 89,
    'firewall configuration': 91,
    normalization: 58,
    js: 78,
    css: 37,
  },
  {
    java: 89,
    'firewall configuration': 91,
    normalization: 58,
    js: 78,
    css: 37,
  },
  {
    java: 89,
    'firewall configuration': 91,
    normalization: 58,
    js: 78,
    css: 37,
  },
  {
    java: 56,
    'firewall configuration': 11,
    normalization: 76,
    js: 32,
    css: 35,
  },
  // {
  //   java: 63,
  //   'firewall configuration': 51,
  //   normalization: 34,
  //   js: 60,
  //   css: 60,
  // },
];

function randomColor(): string {
  // Generate random values for red, green, and blue components
  const r = Math.floor(Math.random() * 256); // Random integer between 0 and 255
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Convert the RGB values to hexadecimal and format them as a CSS color code
  const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

  return hex;
}

interface ExpandProps {
  expanded: boolean;
  radius: number;
}

function Portrait(): JSX.Element {
  const [expanded, setExpanded] = useState<ExpandProps>({ expanded: false, radius: 150 });
  const svgRef = useRef<SVGSVGElement | null>(null);
  const margin = {
    top: 20, right: 10, bottom: 60, left: 10,
  };
  const width = 860 - margin.left - margin.right;
  const height = 800 - margin.top - margin.bottom;

  const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

  const handleExpand = (): void => {
    if (!expanded.expanded) {
      setExpanded({ expanded: true, radius: 250 });
    } else {
      setExpanded({ expanded: false, radius: 150 });
    }
  };

  useEffect(() => {
    if (svgRef.current) svgRef.current.innerHTML = '';
    const svg = select(svgRef.current);
    svg.attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .attr('fill', 'gray');

    const attributes = Object.keys(data[0]);

    const { radius } = expanded;
    const ticks = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

    // radial scale
    const radAxis = scaleLinear().domain([0.1, 1.0]).range([0, radius]);

    const cordForAngle = (angle: number, len: number): { x: number, y: number } => {
      const x = Math.cos(angle) * len;
      const y = Math.sin(angle) * len;

      return { x, y };
    };

    for (let i = 0; i < attributes.length; i++) {
      const slice = Math.PI / 2 + (2 * Math.PI * i) / attributes.length;
      const key = attributes[i];

      // axis values
      const { x, y } = cordForAngle(slice, radius);

      svg
        .append('line')
        .attr('x2', x + width / 2)
        .attr('y2', y + height / 2)
        .attr('x1', width / 2)
        .attr('y1', height / 2)
        .attr('stroke', 'white')
        .attr('stroke-width', 1.5)
        .style('opacity', 0.1);

      svg
        .append('text')
        .attr('x', x + width / 2)
        .attr('y', y + height / 2)
        .text(capitalize(key))
        .style('text-anchor', (_d) => (i === 0
          ? 'end'
          : i === 1
            ? 'end'
            : i === 2
              ? 'end'
              : i === 2
                ? 'end'
                : null))
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
        .attr('x', width / 2)
        .attr('y', height / 2 - radAxis(el) - 0.85)
        .text(el)
        .attr('fill', 'white')
        .attr('stroke', 'none')
        .attr('opacity', '0.5')
        .style('text-anchor', 'middle')
        .style('font-size', '0.825rem');
    });

    // circes levels
    ticks.forEach((el) => {
      svg
        .append('circle')
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .attr('fill', 'none')
        .attr('stroke', 'gray')
        .attr('stroke-width', 1.0)
        .attr('r', radAxis(el));
    });

    // line generator
    const lineGen: Line<Datum> = line<Datum>()
      .x((d) => d.x)
      .y((d) => d.y);

    // converting data point to coordinates
    const getCoordPath = (dataPoint: any): any => {
      const coord = [];

      for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        const angle = Math.PI / 2 + (2 * Math.PI * i) / attributes.length;
        coord.push(cordForAngle(angle, radAxis(dataPoint[attr]) / 110));
      }
      const firtsAttr = attributes[0];
      const firstAngle = Math.PI / 2 + (2 * Math.PI * 0) / attributes.length;
      coord.push(cordForAngle(firstAngle, radAxis(dataPoint[firtsAttr]) / 110));

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
        .attr('transform', `translate(${width / 2}, ${height / 2})`)
        .attr('cursor', 'pointer');

      svg
        .append('text')
        .attr('class', 'datapoint-label') // Add class for selection
        .attr('x', width / 2 + 350)
        .attr('y', height / 2 + 50 * i)
        .text(`Interview ${i}`) // Set label text
        .attr('fill', 'white')
        .attr('font-size', '12px')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .attr('cursor', 'pointer')
        .attr('opacity', `${expanded.expanded ? 1 : 0}`)
        .on('click', () => {
          // Toggle visibility of other data points
          const clickedIndex = i;
          svg.selectAll('.areapath')
            .style('opacity', (_d, index) => (index === clickedIndex ? 1 : 0));
        });
    }
  }, [expanded, height, margin.bottom, margin.left, margin.right, margin.top, width]);

  return (
    <div className={expanded.expanded ? styles.portraitExpanded : ''}>
      <button type="button" tabIndex={0} onClick={handleExpand}>{expanded.expanded ? 'Collapse' : 'Expand'}</button>
      <svg ref={svgRef} />
    </div>

  );
}
export default Portrait;
