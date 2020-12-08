import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { geoCentroid } from 'd3-geo'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from 'react-simple-maps'

import { assoc } from 'ramda'

import allStates from './data/allstates.json'

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

const offsets = {
  VT: [ 50, -8 ],
  NH: [ 34, 2 ],
  MA: [ 30, -1 ],
  RI: [ 28, 2 ],
  CT: [ 35, 10 ],
  NJ: [ 34, 1 ],
  DE: [ 33, 0 ],
  MD: [ 47, 10 ],
  DC: [ 49, 21 ],
}

const useStyles = makeStyles({
  geography: {
    cursor: 'pointer',
    outline: 'none',
  },
})

const MapChart = ({ homeState, setState }) => {
  const classes = useStyles()
  return (
    <div style={{ width: '600px', height: '600px' }}>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          { ({ geographies }) => (
            <>
              {
                geographies.map((geo) => {
                  const state = allStates.find((s) => s.val === geo.id)
                  return (
                    <Geography
                      className={classes.geography}
                      onClick={() => setState(assoc('homeState', state.id))}
                      key={geo.rsmKey}
                      stroke="#FFF"
                      geography={geo}
                      fill={homeState === state.id ? '#3A3' : '#DDD' }
                    />
                  )
                })
              }
              {
                geographies.map((geo) => {
                  const centroid = geoCentroid(geo)
                  const state = allStates.find((s) => s.val === geo.id)

                  return (
                    <g key={geo.rsmKey + '-name'}>
                      { state &&
                    centroid[0] > -160 &&
                    centroid[0] < -67 &&
                    (Object.keys(offsets).indexOf(state.id) === -1
                      ? (
                        <>
                          {/* Normal State Labels */}
                          <Marker coordinates={centroid}>
                            <text y="2" fontSize={14} textAnchor="middle" style={{ pointerEvents: 'none' }}>
                              {state.id}
                            </text>
                          </Marker>
                        </>
                      )
                      : (
                        <>
                          {/* Offset State Labels (New England) */}
                          <Annotation
                            subject={centroid}
                            dx={offsets[state.id][0]}
                            dy={offsets[state.id][1]}
                          >
                            <text x={4} fontSize={14} alignmentBaseline="middle">
                              {state.id}
                            </text>
                          </Annotation>
                        </>
                      )
                    ) }
                    </g>
                  )
                }) }
            </>
          )}
        </Geographies>
      </ComposableMap>
    </div>
  )
}


export default MapChart
