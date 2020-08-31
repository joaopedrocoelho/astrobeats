/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Nav from "./nav"
import Hero from "./hero"
import SearchFuse from "../components/search-sidecolumn"
import Footer from "./footer"
import ScrollTop from "react-scrolltop-button"
import { IoIosArrowDropupCircle } from "react-icons/io"
import "./styles/fonts.css"
import "./style.css"

const Layout = ({
  children,
  forwardedRef,
  heroIsVisible,
  searchSidebarisVisible,
}) => {
  return (
    <div id="container">
      <Nav />
      <Hero isVisible={heroIsVisible} />
      <ScrollTop
        text=""
        distance={100}
        breakpoint={768}
        speed={1000}
        target={75}
        style={{ border: 0, width: "4vw" }}
        className="scroll-top-btn"
        icon={<IoIosArrowDropupCircle />}
      />
      <div className="columns">
        {children}
        <div className="side-column">
          <SearchFuse isVisible={searchSidebarisVisible} />
        </div>
      </div>

      <Footer forwardedRef={forwardedRef} />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
