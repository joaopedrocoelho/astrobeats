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
    {
      __typename
      allStrapiArticle {
        nodes {
          title
          content
          id
        }
      }
    }
  `).then(result => {
    const allArticles = result.data.allStrapiArticle.nodes
    allArticles.forEach(({ id, title, content }) => {
      createPage({
        path: `/articles/${id}`,
        component: require.resolve("./src/templates/article"),
        context: {
          id,
          title,
          content,
        },
      })
    })
  })
}
