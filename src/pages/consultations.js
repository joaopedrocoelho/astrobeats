import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../components/styles/consultations.css"
import "../components/styles/hero.css"
import LoadingBar from "../../assets/loading_bar.svg"
import BookingNew from "../components/booking-new"

import ConsultationText from "../components/consultations-text"

const ConsultationsPage = ({ title = "Consultations", data }) => {
  const ConsultationsHeaderImg = getImage(data.image)
  return (
    <>
      <SEO
        title={`consultations`}
        description={`I'm offering Natal Chart readings, where we look at the planets'
        alignment at the moment you were born. We will look at your strengths
        and weaknesses, possibilities, and possible challenges across topics in
        your life, such as health, career, love, and relationships. We will also
        check how the current cosmic weather is affecting you.`}
      />
      <Layout heroIsVisible={false}>
        <div className="header">
          <GatsbyImage
            image={ConsultationsHeaderImg}
            alt={"astrological consultations"}
          />
        </div>
        <div className="main-column">
          <h2 className="title shadow">{title}</h2>
          <div className="article-container">
            <ConsultationText />

            <BookingNew />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ConsultationsPage
export const ConsultationsHeader = graphql`
  query ConsultationsHeader {
    image: file(relativePath: { eq: "consultationsheader.jpg" }) {
      id
      childImageSharp {
        gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
      }
    }
  }
`
