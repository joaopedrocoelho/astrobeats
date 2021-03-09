/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
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
          published_at(formatString: "dddd, MMMM Do YYYY")
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
        }
      }
    }
  `).then(result => result.data.allStrapiArticle.nodes)

  allArticles.forEach(
    ({ id, title, slug, content, cover, author, categories, published_at }) => {
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
          published_at,
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
