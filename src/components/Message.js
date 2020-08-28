import React from 'react'
import PropTypes from 'prop-types'

const Message = ({info}) => {
//Styles -----------------------------------------
  const frame = {
    color: info.style === 'error' ? 'red' : 'green',
    width: (window.innerWidth - 100),
    position: 'relative',
    left: 30,
    height: '4vh',
    border: info.style === 'error' ? '2px solid red' : info.style === 'added' ? '2px solid green': 'none',
    borderRadius: '5px',
    display: 'table-cell',
    verticalAlign: 'middle'
  }
  const notification = {
    paddingLeft:'2vw'
  }
//------------------------------------------------
  return (
    <div style={frame}> 
      <div style={notification}>{info.message}</div> 
    </div>  
  )
}

Message.propTypes = { info: PropTypes.object.isRequired }
export default Message