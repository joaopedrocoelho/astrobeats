import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

import Article from "../components/article"

const SecondPage = ({ data }) => {
  console.log(data.allStrapiArticle.nodes)
  return (
    <Layout>
      <Article
        title="hey"
        content="hey"
        author="hey"
        category="hey"
        date="hey"
        cover="hey"
        authorPath="hey"
        categoryPath="hey"
      />
    </Layout>
  )
}
export default SecondPage
