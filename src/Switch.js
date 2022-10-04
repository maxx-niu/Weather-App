import React from 'react'
import "./Switch.css"

const Switch = ({isToggled, onToggle, children}) => {
  return (
    <label className='switch'>
        <input type='checkbox' checked={isToggled} onChange={onToggle}/>
        <span className='slider'></span>
    </label>
  )
}

export default Switch;