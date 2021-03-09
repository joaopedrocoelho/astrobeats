import React from "react"

import SearchFuse from "../components/search-sidecolumn"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Search = ({ location }) => {
  console.log("location", location)
  console.log("hello")

  return (
    <>
      <SEO title={`search`} />
      <Layout sidebarisVisible={false}>
        <div className="search-page-container">
          <SearchFuse searchQuery={location.state ? location.state.term : ""} />
        </div>
      </Layout>
    </>
  )
}
export default Search
