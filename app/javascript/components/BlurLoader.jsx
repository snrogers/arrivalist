import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'


const BlurLoader = ({ loading, children }) => {
  return (
    <div style={{ position: 'relative' }}>
      {
        loading && (
          <div style={{ zIndex: 500, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} >
            <CircularProgress />
          </div>
        )
      }
      <div
        style={{
          filter: loading
            ? 'blur(20px)'
            : 'none',
          transition: loading
            ? 'none'
            : 'filter 0.6s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  )
}


export default BlurLoader
