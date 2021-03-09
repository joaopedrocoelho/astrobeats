import React from "react"
import Layout from "./layout"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import SEO from "./seo"

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
  const coverImage = getImage(cover)

  console.log("cover", cover)
  return (
    <>
      <SEO title={title} description={content} image={cover} />
      <Layout heroIsVisible={false}>
        <div className="header">
          <GatsbyImage image={coverImage} alt={title} />
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
                    <Link to={`/category/${category.name}`}>
                      {category.name}
                    </Link>
                    <span>, </span>
                  </>
                )
              })}
            </h6>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Article
