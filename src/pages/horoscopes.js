import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"
import Pagination from "../components/pagination"

const HoroscopesPage = ({ title = "Horoscopes", data }) => {
  return (
    <div>
      <Layout heroIsVisible={false}>
        <SEO title={title} />
        <div className="header">
          <Img fluid={data.image.childImageSharp.fluid} />
        </div>
        <div className="article-cards">
          {data.allStrapiArticle.nodes.map(article => {
            return (
              <Card
                id={article.id}
                title={article.title}
                category={article.categories}
                author={article.author.name}
                content={article.content}
                imgUrl={article.cover.childImageSharp.fluid}
                date={article.created_at}
                slug={article.slug}
              />
            )
          })}
          <Pagination totalCount={data.allStrapiArticle.totalCount} />
        </div>
      </Layout>
    </div>
  )
}

export default HoroscopesPage
export const HoroscopeQuery = graphql`
  query allHoroscopes {
    allStrapiArticle(
      filter: { categories: { elemMatch: { name: { eq: "Horoscopes" } } } }
      sort: { fields: created_at, order: DESC }
    ) {
      totalCount
      nodes {
        title
        slug
        content
        id
        author {
          name
        }
        categories {
          name
        }
        cover {
          publicURL
          childImageSharp {
            fluid {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
        created_at(formatString: "dddd, MMMM Do YYYY")
        title
        content
        id
      }
    }
    image: file(relativePath: { eq: "horoscope-header.jpg" }) {
      id
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
