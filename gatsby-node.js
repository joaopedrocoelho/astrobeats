/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")
const { graphql } = require("gatsby")

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  graphql(`
    query articleInfo {
      allStrapiArticle {
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
          }
          created_at(formatString: "dddd, MMMM Do YYYY")
          title
          content
          id
        }
      }
    }
  `).then(result => {
    const allArticles = result.data.allStrapiArticle.nodes

    allArticles.forEach(
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
          path: `/articles/${slug}`,
          component: require.resolve("./src/templates/article"),
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
  })
}
