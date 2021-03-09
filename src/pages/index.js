import React, { useState, useRef, useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Pagination from "../components/pagination"
import Card from "../components/card"

// import LoadingBar from "../../assets/loading_bar.svg"
// import { render } from "react-dom"

const IndexPage = ({ data }) => {
  const [currentIndex, setIndex] = useState(3)
  // const [renderCards, setRenderCards] = useState()

  const element = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const first = entries[0]

        if (first.isIntersecting && currentIndex <= 5) {
          setIndex(currentIndex + 3)
        }
      },
      { threshold: 0.2 }
    )
    const currentElement = element.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [])

  return (
    <div>
      <SEO />
      <Layout forwardedRef={element}>
        <div className="article-cards">
          {data.allStrapiArticle.nodes
            .slice(0, currentIndex)
            .map((article, index, cards) => {
              return (
                <Card
                  id={article.id}
                  title={article.title}
                  category={article.categories}
                  author={article.author.name}
                  content={article.content}
                  imgUrl={article.cover}
                  date={article.created_at}
                  slug={article.slug}
                />
              )
            })}

          <Pagination totalCount={data.allStrapiArticle.totalCount} />
        </div>
      </Layout>
    </div>
  )
}

export default IndexPage
export const pageQuery = graphql`
  query allArticles {
    allStrapiArticle(sort: { fields: created_at, order: DESC }) {
      totalCount
      nodes {
        title
        slug
        content
        id
        author {
          name
          avatar {
            publicURL
          }
        }
        categories {
          name
        }
        cover {
          publicURL
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
          }
        }
        published_at(formatString: "dddd, MMMM Do YYYY")
        title
        content
        id
      }
    }
  }
`
