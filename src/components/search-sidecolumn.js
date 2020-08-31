import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import ReactMarkdown from "react-markdown"
import Fuse from "fuse.js"
import "../components/styles/search.css"

import { HiOutlineSearch } from "react-icons/hi"
import { IconContext } from "react-icons"
import LinesEllipsis from "react-lines-ellipsis"
import symbolImg from "../images/2x/purple_logo@2x.png"

const SearchFuse = ({ isVisible = true, searchQuery }) => {
  // Hooks
  const [term, setTerm] = useState("")
  const [results, setResults] = useState("")
  const [numberOfResults, setNumberR] = useState("")

  useEffect(() => {
    //setTimeout to avoid rendering results while user is typing
    const timeoutId = setTimeout(() => {
      if (term || searchQuery) {
        setResults(
          searchResults.map(entry => {
            return (
              <>
                <li className="search-entry">
                  <Link to={entry.item.path}>
                    <div className="entryTitle">
                      <img
                        src={
                          entry.item.context.cover != null
                            ? entry.item.context.cover.publicURL
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
              </>
            )
          })
        )
      } else {
        setResults("")
      }
    }, 500)

    console.log("new results", searchResults)
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
              }
            }
            path
          }
        }
      }
    `
  )

  const options = {
    keys: ["context.title", "context.content", "path", "cover.publicURL"],
    includeMatches: true,
    minMatchCharLength: 4,
  }

  // const myIndex = Fuse.createIndex(options.keys, data.allSitePage.nodes)

  const fuse = new Fuse(data.allSitePage.nodes, options, data.allSitePage.nodes)
  const searchResults = fuse.search(term || searchQuery)

  return isVisible ? (
    <div>
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
    </div>
  ) : (
    ""
  )
}

export default SearchFuse
