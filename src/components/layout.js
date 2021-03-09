/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import Nav from "./nav"
import Hero from "./hero"
import Footer from "./footer"
import SearchFuse from "./search-sidecolumn"
import ScrollTopBtn from "./scroll-to-top"
import AboutMe from "./about-author"

import "./style.css"

const Layout = ({ children, forwardedRef, heroIsVisible }) => {
  const offsetNav = { marginTop: 5 + "vw" }

  return (
    <div id="container">
      <Nav />
      <Hero isVisible={heroIsVisible} />
      <ScrollTopBtn />
      <div className="columns" style={!heroIsVisible && offsetNav}>
        {children}
        <div className="side-column">
          <SearchFuse />
          <AboutMe />
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
