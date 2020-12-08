import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { DatePicker } from '@material-ui/pickers'

import { assoc } from 'ramda'
import { DATE_MIN, DATE_MAX } from './constants'

// ----------------------------------------------------------------- //
// Constants
// ----------------------------------------------------------------- //
const STATES = [
  { name: 'ALABAMA', abbreviation: 'AL' },
  { name: 'ALASKA', abbreviation: 'AK' },
  { name: 'AMERICAN SAMOA', abbreviation: 'AS' },
  { name: 'ARIZONA', abbreviation: 'AZ' },
  { name: 'ARKANSAS', abbreviation: 'AR' },
  { name: 'CALIFORNIA', abbreviation: 'CA' },
  { name: 'COLORADO', abbreviation: 'CO' },
  { name: 'CONNECTICUT', abbreviation: 'CT' },
  { name: 'DELAWARE', abbreviation: 'DE' },
  { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC' },
  { name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM' },
  { name: 'FLORIDA', abbreviation: 'FL' },
  { name: 'GEORGIA', abbreviation: 'GA' },
  { name: 'GUAM', abbreviation: 'GU' },
  { name: 'HAWAII', abbreviation: 'HI' },
  { name: 'IDAHO', abbreviation: 'ID' },
  { name: 'ILLINOIS', abbreviation: 'IL' },
  { name: 'INDIANA', abbreviation: 'IN' },
  { name: 'IOWA', abbreviation: 'IA' },
  { name: 'KANSAS', abbreviation: 'KS' },
  { name: 'KENTUCKY', abbreviation: 'KY' },
  { name: 'LOUISIANA', abbreviation: 'LA' },
  { name: 'MAINE', abbreviation: 'ME' },
  { name: 'MARSHALL ISLANDS', abbreviation: 'MH' },
  { name: 'MARYLAND', abbreviation: 'MD' },
  { name: 'MASSACHUSETTS', abbreviation: 'MA' },
  { name: 'MICHIGAN', abbreviation: 'MI' },
  { name: 'MINNESOTA', abbreviation: 'MN' },
  { name: 'MISSISSIPPI', abbreviation: 'MS' },
  { name: 'MISSOURI', abbreviation: 'MO' },
  { name: 'MONTANA', abbreviation: 'MT' },
  { name: 'NEBRASKA', abbreviation: 'NE' },
  { name: 'NEVADA', abbreviation: 'NV' },
  { name: 'NEW HAMPSHIRE', abbreviation: 'NH' },
  { name: 'NEW JERSEY', abbreviation: 'NJ' },
  { name: 'NEW MEXICO', abbreviation: 'NM' },
  { name: 'NEW YORK', abbreviation: 'NY' },
  { name: 'NORTH CAROLINA', abbreviation: 'NC' },
  { name: 'NORTH DAKOTA', abbreviation: 'ND' },
  { name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP' },
  { name: 'OHIO', abbreviation: 'OH' },
  { name: 'OKLAHOMA', abbreviation: 'OK' },
  { name: 'OREGON', abbreviation: 'OR' },
  { name: 'PALAU', abbreviation: 'PW' },
  { name: 'PENNSYLVANIA', abbreviation: 'PA' },
  { name: 'PUERTO RICO', abbreviation: 'PR' },
  { name: 'RHODE ISLAND', abbreviation: 'RI' },
  { name: 'SOUTH CAROLINA', abbreviation: 'SC' },
  { name: 'SOUTH DAKOTA', abbreviation: 'SD' },
  { name: 'TENNESSEE', abbreviation: 'TN' },
  { name: 'TEXAS', abbreviation: 'TX' },
  { name: 'UTAH', abbreviation: 'UT' },
  { name: 'VERMONT', abbreviation: 'VT' },
  { name: 'VIRGIN ISLANDS', abbreviation: 'VI' },
  { name: 'VIRGINIA', abbreviation: 'VA' },
  { name: 'WASHINGTON', abbreviation: 'WA' },
  { name: 'WEST VIRGINIA', abbreviation: 'WV' },
  { name: 'WISCONSIN', abbreviation: 'WI' },
  { name: 'WYOMING', abbreviation: 'WY' },
]



// ----------------------------------------------------------------- //
// Component
// ----------------------------------------------------------------- //
const Controls = (props) => {
  const { homeState, tripDateMin, tripDateMax, setState } = props

  return (
    <>
      <Autocomplete
        id="combo-box-demo"
        options={STATES}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        onChange={(_e, value) => setState(assoc('homeState', value.abbreviation))}
        value={STATES.find((s) => s.abbreviation === homeState)}
        renderInput={(params) => <TextField {...params} label="State" variant="outlined" />}
      />

      <DatePicker
        label="Time Range Start"
        minDate={DATE_MIN.toISOString()}
        maxDate={DATE_MAX.toISOString()}
        value={tripDateMin}
        onChange={(date) => setState(assoc('tripDateMin', date))}
      />

      <DatePicker
        label="Time Range End"
        minDate={DATE_MIN.toISOString()}
        maxDate={DATE_MAX.toISOString()}
        value={tripDateMax}
        onChange={(date) => setState(assoc('tripDateMax', date))}
      />
    </>
  )
}


export default Controls
