import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import ReactDOM from "react-dom"

import SearchNav from "./search-nav"

import LogoImg from "../images/2x/logo_white@3x.png"

import "./style.css"
import "./styles/nav.css"
import "./styles/hamburgers.css"

class Nav extends React.Component {
  componentDidMount() {
    const nav = document.querySelector(".menu-container")
    const logo = document.querySelector(".site-name")
    const hamburgerBtn = this.hamburger
    const offCanvasMenu = this.menu
    const pageContainer = document.getElementById("container")
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
    function toggleMenu() {
      offCanvasMenu.classList.toggle("is-open")
      pageContainer.classList.toggle("scale-down")
      hamburgerBtn.classList.toggle("is-active")

      // Do something else, like open/close menu
    }
    //on enter key
    document.addEventListener("keyup", function (event) {
      if (
        offCanvasMenu.classList.contains("is-open") &&
        event.key === "Enter"
      ) {
        // Toggle class "is-active"
        toggleMenu()
        console.log("oi")
      }
    })

    // On click
    hamburgerBtn.addEventListener("click", function () {
      // Toggle class "is-active"
      toggleMenu()
    })
  }

  render() {
    return (
      <>
        <nav className="menu-container" id="nav">
          <Link to="/" className="logo-link">
            <img
              src={LogoImg}
              alt="astrobeats - accesible astrology"
              className="site-name"
              id="siteName"
              x
            />
          </Link>
          <button
            ref={ref => (this.hamburger = ref)}
            data-function="swipe"
            id="swipe"
            className="hamburger hamburger--vortex"
            type="button"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
          <ul className="menu-list" ref={ref => (this.menu = ref)}>
            <li className="menu-item hover-animation">
              <Link to="/">blog</Link>
            </li>
            <li className="menu-item hover-animation">
              <Link to="/horoscopes">horoscopes</Link>
            </li>
            <li className="menu-item hover-animation">
              <Link to="/consultations">consultations</Link>
            </li>
            <li className="menu-item hover-animation">
              <Link to="/about">about</Link>
            </li>
            <li className="menu-item">
              <SearchNav />
            </li>
          </ul>
        </nav>
      </>
    )
  }
}

export default Nav
