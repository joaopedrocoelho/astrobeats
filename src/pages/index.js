import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  console.log("IndexPage.render data", data)
  return (
    <Layout>
      <SEO title="Home" />
      {data.allStrapiArticle.nodes.map(article => (
        <div>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </div>
      ))}
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
    </Layout>
  )
}

export default IndexPage
export const pageQuery = graphql`
  query MyQuery {
    __typename
    allStrapiArticle {
      nodes {
        content
        title
      }
    }
  }
`
