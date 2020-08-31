import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import "./style.css"
import "./styles/hero.css"

import symbolImg from "../images/2x/purple_logo@2x.png"

const Hero = ({ isVisible = true }) => {
  return isVisible ? (
    <div className="hero" id="hero">
      {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
      <div className="logo-container">
        <img src={symbolImg} alt="astrobeats" className="symbol" />
        <p>accesible astrology</p>
        <Link to="/about#author">
          <button type="button" value="ABOUT" className="abt-btn">
            About
          </button>
        </Link>
      </div>
    </div>
  ) : (
    ""
  )
}

export default Hero
