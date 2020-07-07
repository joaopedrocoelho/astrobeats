import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

import Article from "../components/article"

const About = ({ data }) => {
  console.log("About data", data)
  return (
    <div>
      {data.allStrapiArticle.nodes.map(article => (
        <div>
          <h1>{article.horoscope.aries}</h1>
          <p>{article.horoscope.aries_horoscope}</p>
        </div>
      ))}
    </div>
  )
}
export default About
export const horoscopes = graphql`
  query forHoroscopes {
    allStrapiArticle(filter: { id: { eq: "Article_5" } }) {
      nodes {
        categories {
          name
        }
        category
        id
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
      }
    }
  }
`
