import React, { useState, useEffect, useRef } from "react"

import { IoIosArrowDropupCircle } from "react-icons/io"
import { IconContext } from "react-icons"
import "./styles/scroll-to-top.css"

var window = require("global/window")

const ScrollTopBtn = () => {
  const [visibility, setVisibility] = useState(false)
  const [scrollTop, setScrollTop] = useState(window.pageYOffset)
  const [btnSize, setBtnSize] = useState("4vw")
  const button = useRef()
  let mobile = true

  useEffect(() => {
    mobile = window.matchMedia("(max-width: 600px)")
    console.log("matchMedia", mobile)
    mobile.matches && setBtnSize("13vw")
  }, [])

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
      <IconContext.Provider value={{ size: `${btnSize}` }}>
        <IoIosArrowDropupCircle />
      </IconContext.Provider>
    </button>
  )
}

export default ScrollTopBtn
