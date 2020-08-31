import React from "react"
import Article from "../components/article"
import { Link } from "gatsby"
export default props => {
  return (
    <Article
      title={props.pageContext.title}
      content={props.pageContext.content}
      author={props.pageContext.author.name}
      category={props.pageContext.categories}
      date={props.pageContext.created_at}
      cover={props.pageContext.cover.publicURL}
    />
  )
}
