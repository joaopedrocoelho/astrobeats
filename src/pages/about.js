import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import AboutMe from "../components/about-author-no-button"

const About = ({ data }) => {
  console.log("About data", data)
  return (
    <Layout>
      <div className="header"></div>
      {data.allStrapiAuthor.nodes.map(author => {
        return (
          <AboutMe
            author={author.name}
            avatar={author.avatar.publicURL}
            header={author.name}
            text={author.about}
          />
        )
      })}
    </Layout>
  )
}
export default About
export const queryAuthors2 = graphql`
  query allAuthors2 {
    allStrapiAuthor {
      nodes {
        id
        name
        avatar {
          publicURL
        }
        about
      }
    }
  }
`
