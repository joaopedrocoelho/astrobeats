import { Link, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import ReactMarkdown from "react-markdown"

import SearchNav from "./search-nav"
import FooterLogoImg from "../images/2x/white_wireframe_logo@2x.png"
import FacebookIcon from "../../assets/facebook.svg"
import TwitterIcon from "../../assets/twitter.svg"
import InstagramIcon from "../../assets/instagram.svg"

import "./style.css"

var window = require("global/window")

const Footer = ({ forwardedRef }) => {
  const data = useStaticQuery(graphql`
    query allAuthorsMobile {
      allStrapiAuthor {
        nodes {
          id
          name
          avatar {
            publicURL
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          about
        }
      }
    }
  `)

  const mobile = window.matchMedia("(max-width: 600px)")
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
          <Link to="/category/Horoscopes">horoscopes</Link>
        </li>
        <li className="footer-menu-item hover-animation">
          <Link to="/consultations">consultations</Link>
        </li>
        <li className="footer-menu-item hover-animation">
          <Link
            to={mobile.matches ? "#about-mobile" : "#about"}
            className="about-author-open"
          >
            about
          </Link>
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
      <div className="mobile-about">
        <div id="about-mobile"></div>
        {data.allStrapiAuthor.nodes.map(author => {
          return (
            <div className={`about-author-mobile-text`}>
              <div className="author-mobile-info">
                <Img fluid={author.avatar.childImageSharp.fluid} />
                <h3 className="about-mobile-header">{author.name}</h3>
              </div>
              <ReactMarkdown source={author.about} />
            </div>
          )
        })}
      </div>
      <div className="gatsby">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </div>
    </footer>
  )
}

export default Footer
