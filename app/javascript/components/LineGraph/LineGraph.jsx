import React, { useState } from 'react'

import { extent, max } from 'd3-array'

import { AxisLeft, AxisBottom } from '@visx/axis'
import { GridColumns, GridRows } from '@visx/grid'
import * as allCurves from '@visx/curve'
import { Group } from '@visx/group'
import { LinePath } from '@visx/shape'
import { scaleTime, scaleLinear } from '@visx/scale'

import { prop } from 'ramda'



// ----------------------------------------------------------------- //
// Constants and Helpers
// ----------------------------------------------------------------- //
const curveTypes = Object.keys(allCurves)
const lineCount = 4

// data accessors
const getX = (d) => new Date(d.trip_date)
const getY = (d) => d.trip_count



// ----------------------------------------------------------------- //
// Component
// ----------------------------------------------------------------- //
const LineGraph = ({ width = 500, height = 500, showControls = true, trips = [] }) => {
  const series = trips

  const [ showPoints, setShowPoints ] = useState(true)
  const svgHeight = showControls ? height - 40 : height
  const lineHeight = svgHeight / lineCount

  // scales
  const xScale = scaleTime({
    domain: extent(series, getX),
    range: [ 50, width - 50 ],
  })
  const yScale = scaleLinear({
    domain: extent(series, getY),
    range: [ svgHeight, 0 ],
  })

  const ys = series.map(getY)
  console.log('ys', ys)
  window.ys = ys
  const yMax = Math.max(...ys)

  return (
    <div className="visx-curves-demo">
      <h1>{yMax}</h1>
      <svg width={width} height={svgHeight}>
        <rect width={width} height={svgHeight} fill="#efefef" rx={14} ry={14} />
        <Group>
          <AxisBottom top={svgHeight} scale={xScale} numTicks={width > 520 ? 10 : 5} />
          <AxisLeft scale={yScale} />
          <LinePath
            curve={allCurves.curveLinear}
            data={series}
            x={(d) => xScale(getX(d)) ?? 0}
            y={(d) => yScale(getY(d)) ?? 0}
            stroke="#333"
            strokeWidth={2}
            strokeOpacity={1}
            shapeRendering="geometricPrecision"
            markerMid="url(#marker-circle)"
          />
        </Group>
      </svg>
      <style jsx>{`
        .visx-curves-demo label {
          font-size: 12px;
        }
      `}</style>
    </div>
  )
}


export default LineGraph
