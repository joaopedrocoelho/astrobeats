import { Link } from "gatsby"
import React, { useEffect, useState, useRef } from "react"

import Burger from "@animated-burgers/burger-slip"

import SearchNav from "./search-nav"

import LogoImg from "../images/2x/logo_white_small.png"

import "./style.css"
import "./styles/nav.css"
import "./styles/hamburgers.css"

var window = require("global/window")

const Nav = () => {
  const offCanvasMenu = useRef(null)
  const [isopen, setIsopen] = useState(false)
  const [aboutLink, setAboutLink] = useState("#about-mobile")

  useEffect(() => {
    let mobile = window.matchMedia("(max-width: 600px)")
    mobile.matches ? setAboutLink("#about-mobile") : setAboutLink("#about")
  }, [])
  //hamburger menu
  function toggleMenu() {
    offCanvasMenu.current.classList.toggle("is-open")
  }

  useEffect(() => {
    //code for making the bg color disappear if there's a hero
    const nav = document.querySelector(".menu-container")
    const logo = document.querySelector(".site-name")

    const hero = document.getElementById("hero")
    if (hero != null) {
      nav.classList.add("transparent")
      logo.classList.add("hidden")
      window.addEventListener("scroll", function () {
        if (window.scrollY > hero.offsetHeight - nav.offsetHeight) {
          nav.classList.remove("transparent")
          logo.classList.remove("hidden")
        } else {
          nav.classList.add("transparent")
          logo.classList.add("hidden")
        }
      })
    }
  }, [])

  return (
    <>
      <nav className="menu-container" id="nav">
        <Link to="/" className="logo-link">
          <img
            src={LogoImg}
            alt="Peregrin Astrology"
            className="site-name"
            id="siteName"
          />
        </Link>
        <Burger
          onClick={() => {
            setIsopen(!isopen)
            toggleMenu()
          }}
          Component="button"
          type="button"
          isOpen={isopen}
          className={isopen ? "bigger" : ""}
        />

        <ul className="menu-list" ref={offCanvasMenu}>
          <li className="menu-item hover-animation">
            <Link to="/">articles</Link>
          </li>

          <li className="menu-item hover-animation">
            <Link to="/consultations">consultations</Link>
          </li>
          <li className="menu-item hover-animation">
            <Link
              to={aboutLink}
              className="about-author-open"
              onClick={() => {
                setIsopen(!isopen)
                toggleMenu()
              }}
            >
              about
            </Link>
          </li>
          <li className="menu-item">
            <SearchNav />
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Nav
