import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState, forwardRef } from "react"

import SearchNav from "./search-nav"
import FooterLogoImg from "../images/2x/white_wireframe_logo@2x.png"
import FacebookIcon from "../../assets/facebook.svg"
import TwitterIcon from "../../assets/twitter.svg"
import InstagramIcon from "../../assets/instagram.svg"

import "./style.css"

const Footer = ({ forwardedRef }) => {
  return (
    <footer ref={forwardedRef}>
      <div className="footer-logo-container">
        <img src={FooterLogoImg} alt="astrobeats" className="footer-symbol" />
      </div>
      <ul className="footer-menu-list">
        <li className="footer-menu-item hover-animation">
          <Link to="/">blog</Link>
        </li>
        <li className="footer-menu-item hover-animation">
          <Link to="/horoscopes">horoscopes</Link>
        </li>
        <li className="footer-menu-item hover-animation">
          <Link to="/consultations">consultations</Link>
        </li>
        <li className="footer-menu-item hover-animation">
          <Link to="/about">about</Link>
        </li>
        <li className="footer-menu-item">
          <SearchNav />
        </li>
      </ul>
      <ul className="social-media-icons">
        <li>
          <a href="https://www.facebook.com/astrobeatsastrology">
            <FacebookIcon />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/astrobeats_blog/">
            <TwitterIcon />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/astrobeats_blog/">
            <InstagramIcon />
          </a>
        </li>
      </ul>

      <div className="gatsby">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </div>
    </footer>
  )
}

export default Footer
