import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import React from "react"

import "./style.css"
import "./styles/hero.css"

var window = require("global/window")

const Hero = ({ isVisible = true }) => {
  const logoImg = useStaticQuery(graphql`
    query logoImg {
      image: file(relativePath: { eq: "2x/purple_logo@2x.png" }) {
        id
        childImageSharp {
          fixed {
            ...GatsbyImageSharpFixed
          }
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const mobile = window.matchMedia("(max-width: 600px)")

  return isVisible ? (
    <div className="hero" id="hero">
      {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
      <div className="logo-container">
        <Link to="/">
          <Img fluid={logoImg.image.childImageSharp.fluid} alt="astrobeats" />
        </Link>

        <p>accesible astrology</p>
        <Link to={mobile.matches ? "#about-mobile" : "#about"}>
          <button
            type="button"
            value="ABOUT"
            className="abt-btn about-author-open"
          >
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
