import React from "react"

export default ({ onClick, name, bgColor, color, className = "" }) => (
  <button
    className={`${className}`}
    onClick={e => {
      e.preventDefault()
      onClick()
    }}
  >
    {name}
    <style jsx>{`
      button {
        ${bgColor && `background-color: ${bgColor};`}
        ${color && `color: ${color};`}
      }
    `}</style>
  </button>
)
