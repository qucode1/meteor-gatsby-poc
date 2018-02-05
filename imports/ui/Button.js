import React from "react"

export default ({ onClick, name }) => (
  <button
    onClick={e => {
      e.preventDefault()
      onClick()
    }}
  >
    {name}
  </button>
)
