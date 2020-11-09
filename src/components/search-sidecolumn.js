import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, Link, navigate } from "gatsby"
import Img from "gatsby-image"
import Fade from "react-reveal/Fade"
import Fuse from "fuse.js"
import "../components/styles/search.css"

import { HiOutlineSearch } from "react-icons/hi"
import { IconContext } from "react-icons"
import LinesEllipsis from "react-lines-ellipsis"
import symbolImg from "../images/2x/purple_logo@2x.png"

var window = require("global/window")

const SearchFuse = ({ isVisible = true, searchQuery }) => {
  // Hooks
  const [term, setTerm] = useState("")
  const [results, setResults] = useState("")
  const [numberOfResults, setNumberR] = useState("")
  const [moreResults, setMoreResults] = useState("")

  useEffect(() => {
    //setTimeout to avoid rendering results while user is typing
    const currentPage = window.location.pathname.split("/")

    const timeoutId = setTimeout(() => {
      if (term || searchQuery) {
        if (currentPage[1] !== "search" && searchResults.length > 5) {
          searchResults.length = 5
          setMoreResults(
            <Link to="/search" state={{ term }} className="more-results">
              See more results
            </Link>
          )
        }
        setResults(
          searchResults.map(entry => {
            return (
              <>
                <Fade bottom duration={700}>
                  <li className="search-entry">
                    <Link to={entry.item.path}>
                      <div className="entryTitle">
                        <Img
                          fluid={
                            entry.item.context.cover != null
                              ? entry.item.context.cover.childImageSharp.fluid
                              : symbolImg
                          }
                          className="search-thumb"
                        />
                        <h3>{entry.item.context.title || entry.item.id}</h3>
                      </div>
                      <div className="entryContent">
                        <LinesEllipsis
                          text={entry.item.context.content || ""}
                          maxLine="3"
                          ellipsis="..."
                          basedOn="words"
                        />
                      </div>
                    </Link>
                  </li>
                </Fade>
              </>
            )
          })
        )
      } else {
        setResults("")
      }
    }, 500)

    //cleanup function cancels settimeout
    return () => {
      clearTimeout(timeoutId)
    }
  }, [term])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (results) {
        setNumberR(
          <h4>
            {searchResults.length} results for "{term || searchQuery}":
          </h4>
        )
      } else {
        setNumberR("")
      }
    }, 100)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [results])

  // Fuse search set-up
  const data = useStaticQuery(
    graphql`
      query SearchQuery {
        allSitePage {
          nodes {
            id
            context {
              content
              author {
                name
              }
              title
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
            }
            path
          }
        }
      }
    `
  )

  const options = {
    keys: [
      "context.title",
      "context.content",
      "path",
      "cover.childImageSharp.fluid",
    ],
    includeMatches: true,
    minMatchCharLength: 4,
  }

  // const myIndex = Fuse.createIndex(options.keys, data.allSitePage.nodes)

  const fuse = new Fuse(data.allSitePage.nodes, options, data.allSitePage.nodes)
  const searchResults = fuse.search(term || searchQuery)

  return isVisible ? (
    <div className="search-container">
      <h2>Search</h2>
      <form className="search-box">
        <input
          type="text"
          value={term || searchQuery}
          onChange={e => setTerm(e.target.value)}
          placeholder="Search"
        />
        <IconContext.Provider
          value={{
            color: "var(--text-hover-color)",
            size: "2vw",
            className: "search-icon",
          }}
        >
          <HiOutlineSearch />
        </IconContext.Provider>
      </form>

      <ul className="search-results">
        {numberOfResults}
        {results}
      </ul>
      {moreResults}
      <hr></hr>
    </div>
  ) : (
    ""
  )
}

export default SearchFuse
