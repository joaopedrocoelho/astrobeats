import React from "react"

const PlusButton = ({ rotate }) => {
  return (
    <svg
      className={`plus-button${rotate ? " rotate90" : ""}`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
    >
      <g id="Layer_1">
        <rect
          x="21.6"
          y="42.4"
          width="56.8"
          height="15.2"
          className={`${rotate ? "rotate90" : ""}`}
        />
        <path
          d="M50,8.8c11,0,21.4,4.3,29.2,12.1C87,28.6,91.3,39,91.3,50c0,11-4.3,21.4-12.1,29.2C71.4,87,61,91.3,50,91.3
		S28.6,87,20.8,79.2C13,71.4,8.8,61,8.8,50c0-11,4.3-21.4,12.1-29.2C28.6,13,39,8.8,50,8.8 M50,2.2C23.6,2.2,2.2,23.6,2.2,50
		S23.6,97.8,50,97.8S97.8,76.4,97.8,50S76.4,2.2,50,2.2L50,2.2z"
        />
      </g>
      <g id="Layer_2">
        <rect x="42.4" y="21.6" width="15.2" height="56.8" />
      </g>
    </svg>
  )
}

export default PlusButton
