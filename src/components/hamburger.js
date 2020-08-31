import React from "react"
import { Link } from "gatsby"
import "./styles/hamburgers.css"

class Hamburger extends React.Component {
  render() {
    return (
      <button
        data-function="swipe"
        id="swipe"
        class="hamburger hamburger--vortex"
        type="button"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
    )
  }
}

export default Hamburger
