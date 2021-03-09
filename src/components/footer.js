import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import ReactMarkdown from "react-markdown"

import SearchNav from "./search-nav"
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
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
            }
          }
          about
        }
      }
      file(relativePath: { eq: "2x/BW_logo.png" }) {
        id
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
      }
    }
  `)

  const authorPic = getImage(data.allStrapiAuthor.nodes[0].avatar)
  const logoSrc = getImage(data.file)

  /*   let mobile = true

  useEffect(() => {
    mobile = window.matchMedia("(max-width: 500px)")
  }, []) */

  return (
    <footer ref={forwardedRef}>
      <div className="footer-logo-container">
        <GatsbyImage
          image={logoSrc}
          alt="Peregrin Astro"
          className={"footer-symbol"}
        />
      </div>
      <ul className="footer-menu-list">
        <li className="footer-menu-item hover-animation">
          <Link to="/">blog</Link>
        </li>
        <li className="footer-menu-item hover-animation">
          <Link to="/category/Horoscopes" state={{ title: "Horoscopes" }}>
            horoscopes
          </Link>
        </li>
        <li className="footer-menu-item hover-animation">
          <Link to="/consultations">consultations</Link>
        </li>
        <li className="footer-menu-item hover-animation">
          <Link to={"#about-mobile"} className="about-author-open mobile">
            about
          </Link>
          <Link to={"#about"} className="about-author-open  desktop">
            about
          </Link>
        </li>
        <li className="footer-menu-item">
          <SearchNav />
        </li>
      </ul>
      <ul className="social-media-icons">
        <li>
          <a href="https://www.facebook.com/peregrinastro">
            <FacebookIcon />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/peregrinastro/">
            <TwitterIcon />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/peregrinastro/">
            <InstagramIcon />
          </a>
        </li>
      </ul>
      <div className="mobile-about">
        <div id="about-mobile"></div>
        <div className={`about-author-mobile-text`}>
          <div className="author-mobile-info">
            <GatsbyImage image={authorPic} />
            <h3 className="about-mobile-header">
              {data.allStrapiAuthor.nodes[0].name}
            </h3>
          </div>
          <ReactMarkdown source={data.allStrapiAuthor.nodes[0].about} />
        </div>
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
