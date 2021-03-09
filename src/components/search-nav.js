import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import "./styles/search.css"
import { HiOutlineSearch } from "react-icons/hi"
import { IconContext } from "react-icons"

const SearchNav = () => {
  // Hooks
  const [term, setTerm] = useState("")
  // Fuse search set-up

  useEffect(() => {}, [term])

  return (
    <form
      className="nav-search-box"
      onSubmit={event => {
        event.preventDefault()

        navigate("/search", { state: { term } })
      }}
    >
      <input
        type="search"
        value={term}
        onChange={e => setTerm(e.target.value)}
        placeholder="search..."
        // onKeyPress={}
      />
      <Link to="/search" state={{ term }} className="nav-search-button">
        <IconContext.Provider
          value={{
            color: "var(--lighter-text-color)",
            className: "nav-search-icon",
          }}
        >
          <HiOutlineSearch />
        </IconContext.Provider>
      </Link>
    </form>
  )
}

export default SearchNav
