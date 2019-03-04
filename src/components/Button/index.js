import React from 'react'
import './styles.css'

const Button = ({ children, onClick, className, id }) => {
  return (
    <button
      id={id}
      className={`button ${className}`}
      type="button"
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
