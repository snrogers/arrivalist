import React from 'react'


// ----------------------------------------------------------------- //
// Component
// ----------------------------------------------------------------- //
const LineGraph = ({ trips }) => (
  <>
    { trips
      ? <h1> LINEGRAPH </h1>
      : "Loading..." }
  </>
)


export default LineGraph
