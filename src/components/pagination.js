import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import Flip from "react-reveal/Flip"

import "./styles/pagination.css"

var window = require("global/window")

const Pagination = ({ totalCount }) => {
  let currentPage
  const pages = Math.ceil(totalCount / 5)
  let disabledPrevious
  let disabledNext
  const [pageHighlight, setPageHighlight] = useState()

  useEffect(() => {
    let currentPage = window.location.pathname.split("/")
    disabledPrevious = currentPage[1] && currentPage[1] ? "" : "disabled-link"
    disabledNext = currentPage[1] == pages ? "disabled-link" : ""
    setPageHighlight(currentPage[1] == "" ? 1 : currentPage[1])
  }, [])

  /*   const disabledPrevious =
    currentPage[1] && currentPage[1] ? "" : "disabled-link"
  const disabledNext = currentPage[1] == pages ? "disabled-link" : ""
  const [pageHighlight, setPageHighlight] = useState(
    currentPage[1] == "" ? 1 : currentPage[1]
  ) */

  const numberOfPages = Array.from(Array(pages).keys()).map(i => i + 1)

  if (totalCount < 5) {
    return null
  } else {
    return (
      <div className="pagination">
        <Flip bottom>
          <Link
            to={`/${
              currentPage[1] == "" || currentPage[1] == 2
                ? ""
                : currentPage[1] - 1
            }#articles`}
            className={disabledPrevious + ` pag-button`}
          >
            Previous
          </Link>
          {numberOfPages.map(page => {
            return (
              <Link
                to={`/${page}#articles`}
                className={page == currentPage[1] ? "highlight" : ""}
              >
                {page}
              </Link>
            )
          })}
          <Link
            to={`/${
              currentPage[1] == "" ? 2 : parseInt(currentPage[1]) + 1
            }#articles`}
            className={disabledNext + ` pag-button`}
          >
            Next
          </Link>
        </Flip>
      </div>
    )
  }
}

export default Pagination
