import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"
import Pagination from "../components/pagination"

const CategoriesPage = ({ data, location }) => {
  const headerImage = getImage(data.image)

  return (
    <div>
      <SEO
        title={
          location.state
            ? location.state.title
            : data.allStrapiArticle.nodes.categories
        }
      />
      <Layout heroIsVisible={false}>
        <div className="header">
          <GatsbyImage
            image={headerImage}
            alt={
              location.state
                ? location.state.title
                : data.allStrapiArticle.nodes.categories
            }
          />
        </div>

        <div className="article-cards">
          <h2 className="title shadow">
            {location.state ? location.state.title : ""}
          </h2>
          {data.allStrapiArticle.nodes.map(article => {
            return (
              <Card
                id={article.id}
                title={article.title}
                category={article.categories}
                author={article.author.name}
                content={article.content}
                imgUrl={article.cover}
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

export default CategoriesPage
export const HoroscopeQuery = graphql`
  query allCategories($category: String! = "") {
    allStrapiArticle(
      filter: { categories: { elemMatch: { name: { eq: $category } } } }
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
            gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
          }
        }
        published_at(formatString: "dddd, MMMM Do YYYY")
        title
        content
        id
      }
    }
    image: file(relativePath: { eq: "horoscope-header.jpg" }) {
      id
      childImageSharp {
        gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
      }
    }
  }
`
