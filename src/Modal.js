import React from 'react'
import ReactDom from 'react-dom'

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.7)',
  zIndex: 1000
}

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '35px',
  zIndex: 1000
}

const BUTTON_STYLES = {
  position: 'relative',
  left: '50%',
  transform: 'translateX(-50%)',
}

const BUTTON_PADDING = {
  paddingTop: '15px'
}

export default function Modal({open, children, onClose}) {

    if (open === false) return null;
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES}>
        <div style={MODAL_STYLES}>
          <div>
            {children}
            <div style={BUTTON_PADDING}>
              <button onClick={onClose} style={BUTTON_STYLES}>Dismiss</button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  )
}
