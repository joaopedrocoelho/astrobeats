import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import ReactMarkdown from "react-markdown"

import PlusButton from "./plus_button"

import "./styles/about-author.css"

const AboutMe = ({ author, avatar, header, text }) => {
  const [clicked, showText] = useState(false)

  document.addEventListener("click", function (e) {
    // e.target is the clicked element!
    // If it was an item with class 'foo'
    if (e.target && e.target.classList.contains("about-author-open"))
      showText(true)
  })

  const data = useStaticQuery(graphql`
    query allAuthors {
      allStrapiAuthor {
        nodes {
          id
          name
          avatar {
            publicURL
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          about
        }
      }
    }
  `)

  return (
    <>
      {data.allStrapiAuthor.nodes.map(author => {
        return (
          <div className="about-author-container" key={author.name}>
            <div id="about"></div>
            <button className="more-button" onClick={() => showText(!clicked)}>
              <h2>About astrobeats</h2>
              <PlusButton rotate={clicked} />
            </button>

            <div className={`about-author-text${clicked ? " visible" : ""}`}>
              <div className="author-info">
                <Img fluid={author.avatar.childImageSharp.fluid} />

                <h3 className="about-header">{author.name}</h3>
              </div>
              <ReactMarkdown source={author.about} />
            </div>
          </div>
        )
      })}
    </>
  )
}

export default AboutMe
