import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import React from "react"

import "./style.css"
import "./styles/hero.css"

// var window = require("global/window")

const Hero = ({ isVisible = true }) => {
  const logoImg = useStaticQuery(graphql`
    query logoImg {
      image: file(relativePath: { eq: "2x/purple_logo.png" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
        }
      }
    }
  `)

  const logoImgSrc = getImage(logoImg.image)

  return isVisible ? (
    <div className="hero" id="hero">
      {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
      <div className="logo-container">
        <Link to="/">
          <GatsbyImage image={logoImgSrc} alt="Peregrin Astrology" />
        </Link>

        <p>accesible astrology</p>
        <Link to={"#about-mobile"}>
          <button
            type="button"
            value="ABOUT"
            className="abt-btn about-author-open mobile"
          >
            About
          </button>
        </Link>
        <Link to={"#about"}>
          <button
            type="button"
            value="ABOUT"
            className="abt-btn about-author-open desktop"
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
