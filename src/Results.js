import React from 'react'

export default function Results({hasResult, children, displayData}) {
    if(!hasResult) {
        return null;
    }
  return (
    <>
        <div>
            {children}
            {displayData.coord.lon}
        </div>
        <div>
            {displayData.coord.lat}
        </div>
    </>
  )
}
