import React from "react"
import Layout from "./layout"
import { Link, graphql } from "gatsby"

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
}) => (
  <Layout>
    <div className="header">
      <img src={cover} />
    </div>
    <h2 className="title shadow">{title}</h2>
    <div className="article-container">
      <p className="content">
        <ReactMarkdown source={content} />
      </p>
      <h6 className="author-date">
        Posted by <Link to={authorPath}>{author}</Link> on {date} in{" "}
        <Link to={categoryPath}>{category}</Link>
      </h6>
    </div>
  </Layout>
)

export default Article
