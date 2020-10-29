import React, { useState, useEffect, useRef } from "react"

import { IoIosArrowDropupCircle } from "react-icons/io"
import { IconContext } from "react-icons"
import "./styles/scroll-to-top.css"

const ScrollTopBtn = () => {
  const [visibility, setVisibility] = useState(false)
  const [scrollTop, setScrollTop] = useState(window.pageYOffset)
  const button = useRef()
  const mobile = window.matchMedia("(max-width: 500px)")

  useEffect(() => {
    function onScroll() {
      setScrollTop(window.pageYOffset)
      if (scrollTop > 200) {
        setVisibility(true)
      } else {
        setVisibility(false)
      }
    }

    window.addEventListener("scroll", onScroll)
  }, [scrollTop])

  return (
    <button
      onClick={() => window.scrollTo(0, 0)}
      className={visibility ? "scroll-top-btn btn-active" : "scroll-top-btn"}
      ref={button}
    >
      <IconContext.Provider
        value={mobile.matches ? { size: "10vw" } : { size: "3vw" }}
      >
        <IoIosArrowDropupCircle />
      </IconContext.Provider>
    </button>
  )
}

export default ScrollTopBtn
