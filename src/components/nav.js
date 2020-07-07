import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import ReactDOM from "react-dom"
import LogoImg from "../images/2x/logo_white@3x.png"

import "./style.css"
import "./styles/nav.css"

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: "black",
      visibility: "visible",
      opacity: "1",
    }
  }

  render() {
    const bgColor = {
      backgroundColor: this.state.backgroundColor,
    }
    const logoVisibility = {
      visibility: this.state.visibility,
      opacity: this.state.opacity,
    }
    return (
      <nav style={bgColor} className="menu-container" id="nav">
        <Link to="/" className="logo-link">
          <img
            src={LogoImg}
            alt="astrobeats - accesible astrology"
            className="site-name"
            id="siteName"
            style={logoVisibility}
          />
        </Link>
        <ul className="menu-list">
          <li className="menu-item hover-animation">
            <Link to="/">blog</Link>
          </li>
          <li className="menu-item hover-animation">
            <Link to="/horoscopes">horoscopes</Link>
          </li>
          <li className="menu-item hover-animation">
            <Link to="/consultations">consultations</Link>
          </li>
          <li className="menu-item hover-animation">
            <Link to="/about">about</Link>
          </li>
        </ul>

        <div className="menu-btn"></div>
      </nav>
    )
  }
}

export default Nav
