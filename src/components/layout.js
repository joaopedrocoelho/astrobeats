/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Suspense } from "react"
import PropTypes from "prop-types"

import Nav from "./nav"
import Hero from "./hero"
import AboutMe from "../components/about-author"
import ScrollTopBtn from "../components/scroll-to-top"
import Footer from "./footer"

import LoadingBar from "../../assets/loading_bar.svg"
import "./styles/fonts.css"
import "./style.css"

const SearchFuse = React.lazy(() => import("../components/search-sidecolumn"))

const Layout = ({
  children,
  forwardedRef,
  heroIsVisible,
  sidebarisVisible = true,
  searchSidebarisVisible,
}) => {
  const offsetNav = { marginTop: 5 + "vw" }
  const isSSR = typeof window === "undefined"

  return (
    <>
      {!isSSR && (
        <div id="container">
          <Nav />
          <Hero isVisible={heroIsVisible} />
          <ScrollTopBtn />
          <div className="columns" style={!heroIsVisible && offsetNav}>
            {children}
            {sidebarisVisible && (
              <div className="side-column">
                <Suspense fallback={<LoadingBar className="loading-bar" />}>
                  <SearchFuse isVisible={searchSidebarisVisible} />
                  <AboutMe />
                </Suspense>
              </div>
            )}
          </div>

          <Footer forwardedRef={forwardedRef} />
        </div>
      )}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
