import React from "react"

import SearchFuse from "../components/search-sidecolumn"

import Layout from "../components/layout"

const Search = ({ location }) => {
  return (
    <Layout sidebarisVisible={false}>
      <div className="search-page-container">
        <SearchFuse searchQuery={location.state.term} />
      </div>
    </Layout>
  )
}
export default Search
