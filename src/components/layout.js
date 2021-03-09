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

import "./style.css"

const Layout = ({ children, forwardedRef, heroIsVisible }) => {
  /* const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `) */

  return (
    <>
      <Nav />
      <Hero isVisible={heroIsVisible} />
      {children}
      <Footer forwardedRef={forwardedRef} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
