import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { useStaticQuery, graphql } from "gatsby"

import "./style.css"
import "./styles/hero.css"

import symbolImg from "../images/2x/purple@2x.png"
import LogoImg from "../images/2x/logo_white@3x.png"

class Hero extends React.Component {
  render() {
    return (
      <div className="hero" id="hero">
        {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
        <div className="logo-container">
          <img src={symbolImg} alt="astrobeats" className="symbol" />
          <img src={LogoImg} alt="astrobeats" className="logo" />
          <p>accesible astrology</p>
          <Link to="/about">
            <button type="button" value="ABOUT" className="abt-btn">
              About
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Hero
