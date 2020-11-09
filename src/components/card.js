import { Link } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import Fade from "react-reveal/Fade"
import authorIcon from "../images/author_icon.png"
import labelIcon from "../images/label_icon.png"
import dateIcon from "../images/date_icon.png"

import "./styles/card.css"

var window = require("global/window")

const Card = ({
  id,
  title,
  category,
  author,
  content,
  imgUrl,
  date,
  slug,
  articlePath,
  forwardedRef,
}) => {
  let categoryArr = category.map(category => category.name).length
  const linkPath = category
    .map(category => category.name)
    .includes("Horoscopes")
  if (linkPath)
    window.location.href.indexOf("horoscopes") != -1
      ? (articlePath = "")
      : (articlePath = "/horoscopes/")
  else articlePath = "/articles/"

  return (
    <Fade bottom duration={700}>
      <li className="card" ref={forwardedRef}>
        <Link to={articlePath + slug}>
          <div className="cover-outer-wrapper">
            <Img fluid={imgUrl} />
            {/* <img src={imgUrl} className="card-img" /> */}
          </div>
          <h1 className="card-title hvr-sweep-to-right">{title}</h1>
          <p className="card-info">
            <span>
              <img src={dateIcon} alt="date" />
              {date}
            </span>
            <span>
              <img src={authorIcon} alt="author" />
              <Link to={`#about`} className="about-author-open">
                {author}
              </Link>
            </span>
            <span>
              <img src={labelIcon} alt="category" />
              {category.map((category, index) => {
                return (
                  <>
                    <Link to={`/category/${category.name}`}>
                      {category.name}
                    </Link>
                    {index < categoryArr - 1 && ", "}
                  </>
                )
              })}
            </span>
          </p>
          <p className="card-blurb">{content}</p>
        </Link>
      </li>
    </Fade>
  )
}

export default Card
