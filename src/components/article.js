import React from "react"
import Layout from "./layout"
import { Link } from "gatsby"
import Img from "gatsby-image"

import ReactMarkdown from "react-markdown"
import "./styles/article.css"

const Article = ({
  title,
  content,
  author,
  category,
  date,
  cover,
  authorPath,
  categoryPath,
}) => {
  return (
    <Layout heroIsVisible={false}>
      <div className="header">
        <Img fluid={cover} />
        {/* <img src={cover} /> */}
      </div>
      <div className="main-column">
        <h2 className="title shadow">{title}</h2>
        <div className="article-container">
          <p className="content">
            <ReactMarkdown source={content} />
          </p>
          <h6 className="author-date">
            Posted by <Link to={authorPath}>{author}</Link> on {date} in{" "}
            {category.map(category => {
              return (
                <>
                  <Link to={`/category/${category.name}`}>{category.name}</Link>
                  <span>, </span>
                </>
              )
            })}
          </h6>
        </div>
      </div>
    </Layout>
  )
}

export default Article
