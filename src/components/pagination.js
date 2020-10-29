import React, { useState } from "react"
import { Link } from "gatsby"

import Flip from "react-reveal/Flip"

import "./styles/pagination.css"

const Pagination = ({ totalCount }) => {
  const currentPage = window.location.pathname.split("/")
  const pages = Math.ceil(totalCount / 5)

  const disabledPrevious =
    currentPage[1] && currentPage[1] ? "" : "disabled-link"
  const disabledNext = currentPage[1] == pages ? "disabled-link" : ""
  const [pageHighlight, setPageHighlight] = useState(
    currentPage[1] == "" ? 1 : currentPage[1]
  )

  const numberOfPages = Array.from(Array(pages).keys()).map(i => i + 1)

  if (totalCount < 2) {
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
