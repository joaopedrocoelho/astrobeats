import React, { useState, useRef, Suspense, useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import LoadingBar from "../../assets/loading_bar.svg"
import Pagination from "../components/pagination"

const Card = React.lazy(() => import("../components/card"))

const IndexPage = ({ data }) => {
  console.log("IndexPage.render data", data)
  const [currentIndex, setIndex] = useState(3)

  const element = useRef(null)

  const observer = useRef(
    new IntersectionObserver(
      entries => {
        const first = entries[0]
        console.log("first", first)
        if (first.isIntersecting && currentIndex <= 5) {
          setIndex(currentIndex + 3)
        }
      },
      { threshold: 0.2 }
    )
  )

  useEffect(() => {
    const currentObserver = observer.current
    const currentElement = element.current
    if (currentElement) {
      currentObserver.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement)
      }
    }
  }, [])

  return (
    <div>
      <Layout forwardedRef={element} heroIsVisible={false}>
        <SEO title="Home" />

        <div className="article-cards">
          <div id="articles"></div>
          {data.allStrapiArticle.nodes
            .slice(0, currentIndex)
            .map((article, index, cards) => {
              return (
                <Suspense fallback={<LoadingBar />}>
                  <Card
                    id={article.id}
                    title={article.title}
                    category={article.categories}
                    author={article.author.name}
                    content={article.content}
                    imgUrl={article.cover.childImageSharp.fluid}
                    date={article.created_at}
                    slug={article.slug}
                  />
                </Suspense>
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
  query pageArticles($skip: Int! = 0) {
    allStrapiArticle(
      sort: { fields: created_at, order: DESC }
      limit: 5
      skip: $skip
    ) {
      totalCount
      nodes {
        horoscope {
          aries
          aries_horoscope
          taurus
          taurus_horoscope
          gemini
          gemini_horoscope
          cancer
          cancer_horoscope
          leo
          leo_horoscope
          virgo
          virgo_horoscope
          libra
          libra_horoscope
          scorpio
          scorpio_horoscope
          sagittarius
          sagittarius_horoscope
          capricorn
          capricorn_horoscope
          aquarius
          aquarius_horoscope
          pisces
          pisces_horoscope
        }
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
            fixed {
              base64
              width
              height
              src
              srcSet
            }
            fluid {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
        created_at(formatString: "dddd, MMMM Do YYYY")
        title
        content
        id
      }
    }
  }
`
