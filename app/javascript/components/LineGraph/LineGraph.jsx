import React from 'react'
import { Group } from '@visx/group'
import { curveBasis } from '@visx/curve'
import { LinePath } from '@visx/shape'
import { scaleTime, scaleLinear } from '@visx/scale'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { GridRows, GridColumns } from '@visx/grid'

export const background = '#f3f3f3'

const defaultMargin = { top: 40, right: 50, bottom: 50, left: 75 }
import { groupBy, map, pipe, prop, values } from 'ramda'


// ----------------------------------------------------------------- //
// Component
// ----------------------------------------------------------------- //
const LineGraph = ({ width = 600, height = 600, margin = defaultMargin, trips, homeState }) => {
  if (width < 10 || !trips) return null

  // merge values by date to clean up the signal (especially important when looking at ALL)
  trips = pipe(
    () => trips,
    groupBy(prop('trip_date')),
    map(
      (dayTrips) => dayTrips.reduce(
        (a, b) => ({ ...b, trip_count: a.trip_count + b.trip_count }),
        { trip_count: 0 },
      )),
    values,
  )()

  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const tripCountScale = scaleLinear({
    domain: [
      Math.min(...trips.map((d) => d.trip_count)),
      Math.max(...trips.map((d) => d.trip_count)),
    ],
    nice: true,
    range: [ yMax, 0 ],
  })

  const domain = [ Math.min(...trips.map((t) => t.trip_date)), Math.max(...trips.map((t) => t.trip_date)) ]

  const tripDateScale = scaleTime({
    domain: domain,
    range: [ 0, xMax ],
  })

  return (
    <div>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={tripCountScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <GridColumns scale={tripDateScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0" />
          <AxisBottom top={yMax} scale={tripDateScale} numTicks={width > 520 ? 10 : 5} />
          <AxisLeft scale={tripCountScale} />
          <LinePath
            data={trips}
            curve={curveBasis}
            x={(d) => tripDateScale(d.trip_date.valueOf()) ?? 0}
            y={(d) => tripCountScale(d.trip_count) ?? 0}
            stroke="#222"
            strokeWidth={1.5}
          />
        </Group>
      </svg>
    </div>
  )
}


export default LineGraph
