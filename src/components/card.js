import { Link, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import ReactDOM from "react-dom"
import authorIcon from "../images/author_icon.png"
import labelIcon from "../images/label_icon.png"
import dateIcon from "../images/date_icon.png"

import "./styles/card.css"

const Card = ({
  id,
  title,
  category,
  author,
  content,
  imgUrl,
  date,
  articlePath,
}) => (
  <li className="card">
    <Link to={articlePath}>
      <div className="cover-outer-wrapper">
        <img src={imgUrl} className="card-img" />
      </div>
      <h1 className="card-title hvr-sweep-to-right">{title}</h1>
      <p className="card-info">
        <span>
          <img src={dateIcon} />
          {date}
        </span>
        <span>
          <img src={authorIcon} />
          {author}
        </span>
        <span>
          <img src={labelIcon} />
          {category}
        </span>
      </p>
      <p className="card-blurb">{content}</p>
    </Link>
  </li>
)

export default Card
