import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Hero from "../components/hero"
import SEO from "../components/seo"
import Card from "../components/card"

const IndexPage = ({ data }) => {
  console.log("IndexPage.render data", data)
  return (
    <div>
      <Layout>
        <Hero />
        <SEO title="Home" />
        <div className="article-cards">
          {data.allStrapiArticle.nodes.map(article => (
            <Card
              id={article.id}
              title={article.title}
              category={article.categories.name}
              author={article.author.name}
              content={article.content}
              imgUrl={article.cover.publicURL}
              date={article.created_at}
              articlePath={"articles/" + article.slug}
            />
          ))}
        </div>
      </Layout>
    </div>
  )
}

export default IndexPage
export const pageQuery = graphql`
  query allArticles {
    allStrapiArticle(sort: { fields: created_at, order: DESC }) {
      nodes {
        horoscope {
          aries
          aries_horoscope
          taurus
          taurus_horoscope
          gemini
          gemini_horoscope
          cancer
          cancer_horoscope
          leo
          leo_horoscope
          virgo
          virgo_horoscope
          libra
          libra_horoscope
          scorpio
          scorpio_horoscope
          sagittarius
          sagittarius_horoscope
          capricorn
          capricorn_horoscope
          aquarius
          aquarius_horoscope
          pisces
          pisces_horoscope
        }
        title
        slug
        content
        id
        author {
          name
          avatar {
            publicURL
          }
        }
        categories {
          name
        }
        cover {
          publicURL
        }
        created_at(formatString: "dddd, MMMM Do YYYY")
        title
        content
        id
      }
    }
  }
`
