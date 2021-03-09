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
      <SEO title={`consultations`} />
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
