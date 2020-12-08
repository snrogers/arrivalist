import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import Controls from './Controls'

const data = JSON.parse(<%= asset_path 'national_travel.json' %>)

const HelloWorld = ({ greeting }) => {
  const [state, setState] = useState({})


  return (
    <>
      Greetingasdf: { data }
      <Controls />
    </>
  )
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};


export default HelloWorld
