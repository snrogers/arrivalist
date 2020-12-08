import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Axios from 'axios'
import DateFnsUtils from '@date-io/date-fns'
import Grid from '@material-ui/core/Grid'
import * as I from 'inflect'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { formatISO } from 'date-fns/fp'

import * as R from 'ramda'
import {
  applySpec, assoc, compose, curry, fromPairs, map, pipe, prop, toPairs,
} from 'ramda'

import Controls from './Controls'
import LineGraph from './LineGraph'
import Map from './Map'

import { DATE_MIN, DATE_MAX } from './constants'


// ----------------------------------------------------------------- //
// Constants and Helpers
// ----------------------------------------------------------------- //
const BASE_URL = 'http://localhost:3000'

const INITIAL_STATE = {
  homeState: 'AL', // roll tide
  tripDateMin: DATE_MIN,
  tripDateMax: DATE_MAX,
  trips: [],
}


const mapKeys = curry(
  (fn, obj) => pipe(
    () => obj,
    toPairs,
    map(([ k, v ]) => [ fn(k), v ]),
    fromPairs,
  )(),
)


// ----------------------------------------------------------------- //
// Component
// ----------------------------------------------------------------- //
const HelloWorld = () => {
  const [ state, setState ] = useState(INITIAL_STATE)

  const { homeState, tripDateMin, tripDateMax, trips } = state
  window.formatISO = formatISO

  console.log('state', state)
  useEffect(() => {
    const params = pipe(
      () => state,
      applySpec({
        homeState: prop('homeState'),
        tripDateMin: compose(formatISO, prop('tripDateMin')),
        tripDateMax: compose(formatISO, prop('tripDateMax')),
      }),
      mapKeys(I.underscore),
    )()

    Axios.get(`${BASE_URL}/api/v1/trips`, { params })
      .then((res) => {
        const trips = res.data.map((t) => ({ ...t, trip_date: new Date(t.trip_date) }))
        setState(assoc('trips', trips))
      })
      .catch((err) => console.error(err))
  }, [ homeState, tripDateMin, tripDateMax ])

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Controls {...state } setState={setState} />
      <Grid container spacing={4}>
        <Grid item l={6}>
          <Map {...state } setState={setState} />
        </Grid>
        <Grid item l={6}>
          <LineGraph {...state } />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  )
}

HelloWorld.propTypes = {
  greeting: PropTypes.string,
}


export default HelloWorld
