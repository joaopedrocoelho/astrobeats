import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import ReactMarkdown from "react-markdown"

import PlusButton from "./plus_button"

import "./styles/about-author.css"

const AboutMe = ({ author, avatar, header, text }) => {
  const [clicked, showText] = useState(false)

  useEffect(() => {
    document.addEventListener("click", function (e) {
      // e.target is the clicked element!
      // If it was an item with class 'foo'
      if (e.target && e.target.classList.contains("about-author-open"))
        showText(true)
    })
    return () => {
      document.removeEventListener("click")
    }
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
              gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
            }
          }
          about
        }
      }
    }
  `)

  const AuthorPhoto = getImage(data.allStrapiAuthor.nodes.avatar)
  return (
    <>
      {data.allStrapiAuthor.nodes.map(author => {
        return (
          <div className="about-author-container" key={author.name}>
            <div id="about"></div>
            <button className="more-button" onClick={() => showText(!clicked)}>
              <h2>About Peregrin</h2>
              <PlusButton rotate={clicked} />
            </button>

            <div className={`about-author-text${clicked ? " visible" : ""}`}>
              <div className="author-info">
                <GatsbyImage image={AuthorPhoto} />

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
