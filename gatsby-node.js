/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")
const { graphql } = require("gatsby")

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const allArticles = await graphql(`
    query articleInfo {
      allStrapiArticle {
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
              fixed {
                base64
                width
                height
                src
                srcSet
              }
              fluid(maxWidth: 1200) {
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
  `).then(result => result.data.allStrapiArticle.nodes)

  allArticles.forEach(
    ({ id, title, slug, content, cover, author, categories, created_at }) => {
      createPage({
        path: `/articles/${slug}`,
        component: path.resolve("./src/templates/article.js"),
        context: {
          id,
          title,
          slug,
          content,
          cover,
          author,
          categories,
          created_at,
        },
      })
    }
  )

  const articlePagination = await graphql(`
    query articlesPagination {
      allStrapiArticle {
        totalCount
      }
    }
  `).then(result => result.data.allStrapiArticle.totalCount)

  const totalArticleCount = articlePagination
  const pages = Math.ceil(totalArticleCount / 5)

  Array.from({ length: pages }).forEach((_, i) => {
    //for each page use the createPages Api to dinamically create that page
    createPage({
      path: `/${i + 1}`,
      component: path.resolve("./src/templates/pagination.js"),
      context: {
        skip: i * 5,
      },
    })
  })

  const allHoroscopes = await graphql(`
    query horoscopeArticles {
      allStrapiArticle(
        filter: { categories: { elemMatch: { name: { eq: "Horoscopes" } } } }
      ) {
        nodes {
          horoscope {
            aries_horoscope
            taurus_horoscope
            gemini_horoscope
            cancer_horoscope
            leo_horoscope
            virgo_horoscope
            libra_horoscope
            scorpio_horoscope
            sagittarius_horoscope
            capricorn_horoscope
            aquarius_horoscope
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
              fluid(maxWidth: 1200) {
                base64
                tracedSVG
                srcWebp
                srcSetWebp
                originalImg
                originalName
                src
                srcSet
                sizes
                presentationWidth
                presentationHeight
                aspectRatio
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
  `).then(result => result.data.allStrapiArticle.nodes)

  allHoroscopes.forEach(
    ({
      id,
      title,
      slug,
      content,
      horoscope,
      cover,
      author,
      categories,
      created_at,
    }) => {
      createPage({
        path: `/horoscopes/${slug}`,
        component: path.resolve("./src/templates/horoscopes.js"),
        context: {
          id,
          title,
          content,
          horoscope,
          cover,
          author,
          categories,
          created_at,
        },
      })
    }
  )

  const horoscopePagination = await graphql(`
    query horoscopePagination {
      allStrapiArticle(
        filter: { categories: { elemMatch: { name: { eq: "Horoscopes" } } } }
      ) {
        totalCount
      }
    }
  `).then(result => result.data.allStrapiArticle.totalCount)

  const totalHoroscopeCount = horoscopePagination
  const HoroPages = Math.ceil(totalHoroscopeCount / 5)

  Array.from({ length: HoroPages }).forEach((_, i) => {
    //for each page use the createPages Api to dinamically create that page
    createPage({
      path: `/horoscopes/${i + 1}`,
      component: path.resolve("./src/templates/pagination.js"),
      context: {
        skip: i * 5,
      },
    })
  })

  const allCategories = await graphql(`
    query allCategories {
      allStrapiCategory {
        nodes {
          name
        }
      }
    }
  `).then(result => result.data.allStrapiCategory.nodes)

  allCategories.forEach(({ name }) => {
    createPage({
      path: `/category/${name}`,
      component: path.resolve("./src/templates/categories.js"),
      context: {
        category: name,
      },
    })
  })
}
