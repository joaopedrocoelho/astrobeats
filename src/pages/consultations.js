import React, { Suspense } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../components/styles/consultations.css"
import "../components/styles/hero.css"

import Header from "../images/consultationsheader.jpg"
import LoadingBar from "../../assets/loading_bar.svg"

const ConsultationText = React.lazy(() =>
  import("../components/consultations-text")
)
const Booking = React.lazy(() => import("../components/booking"))
//import Booking from "../components/booking"

const ConsultationsPage = ({ title = "Consultations", data }) => {
  return (
    <Layout heroIsVisible={false}>
      <SEO title={title} />
      <div className="header">
        <Img fluid={data.image.childImageSharp.fluid} />
      </div>
      <div className="main-column">
        <h2 className="title shadow">{title}</h2>
        <div className="article-container">
          <Suspense fallback={<LoadingBar />}>
            <ConsultationText />
          </Suspense>
          <Suspense fallback={<LoadingBar />}>
            <Booking />
          </Suspense>
        </div>
      </div>
    </Layout>
  )
}

export default ConsultationsPage
export const ConsultationsHeader = graphql`
  query ConsultationsHeader {
    image: file(relativePath: { eq: "consultationsheader.jpg" }) {
      id
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
