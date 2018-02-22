import React from "react"

export default Button = ({ onClick, name = "button", bgColor, color, className = "", inverted = false, type = 'button', children }) => (
  <button
    name={name}
    className={`${className}`}
    type={type}
    onClick={onClick && (e => {
      onClick(e)
    })}
  >
    {name}
    {children}
    <style jsx>{`
      button {
        ${bgColor && `background-color: ${(color && inverted) ? color : bgColor}`};
        ${color && `color: ${(bgColor && inverted) ? bgColor : color}`};
      }
    `}</style>
  </button>
)
