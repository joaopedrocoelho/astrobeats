import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"

import SearchFuse from "../components/search-sidecolumn"

import Layout from "../components/layout"

const Search = ({ location }) => {
  console.log("searchQuery", location.state.term)

  return (
    <Layout searchSidebarisVisible={false}>
      <SearchFuse searchQuery={location.state.term} />
    </Layout>
  )
}
export default Search
