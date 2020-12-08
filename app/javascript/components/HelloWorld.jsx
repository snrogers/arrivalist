import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios'
import * as I from 'inflect'

import * as R from 'ramda'
import { assoc } from 'ramda'

import Controls from './Controls'
import LineGraph from './LineGraph'
import Map from './Map'


// ----------------------------------------------------------------- //
// Constants and Helpers
// ----------------------------------------------------------------- //
const BASE_URL = 'http://localhost:3000'

const INIT_STATE = {
  homeState: undefined,
  tripDateMin: undefined,
  tripDateMax: undefined,
  trips: undefined,
}

const mapKeys = R.curry(
  (fn, obj) => R.pipe(
    () => obj,
    R.toPairs,
    R.map(([ k, v ]) => [ fn(k), v ]),
    R.fromPairs,
  )(),
)


// ----------------------------------------------------------------- //
// Component
// ----------------------------------------------------------------- //
const HelloWorld = ({ greeting }) => {
  const [ state, setState ] = useState(INIT_STATE)

  const { homeState, tripDateMin, tripDateMax } = state

  useEffect(() => {
    const params = R.pipe(
      () => ({ homeState, tripDateMin, tripDateMax }),
      mapKeys(I.underscore),
    )()

    Axios.get(`${BASE_URL}/api/v1/trips`, { params })
      .then((res) => {
        const trips = res.data
        setState(assoc('trips', trips))
      })
      .catch((err) => console.error(err))
  }, [ homeState, tripDateMin, tripDateMax ])

  return (
    <>
      <Map {...state }/>
      <LineGraph {...state }/>
      <Controls {...state }/>
    </>
  )
}

HelloWorld.propTypes = {
  greeting: PropTypes.string,
}


export default HelloWorld
