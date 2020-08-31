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
          content,
          cover,
          author,
          categories,
          created_at,
        },
      })
    }
  )

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
}
