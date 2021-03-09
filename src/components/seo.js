/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, image, title }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            keywords
            author
            url
            twitter
            facebook
          }
        }
        file(relativePath: { eq: "2x/purple_logo.png" }) {
          childImageSharp {
            original {
              height
              width
              src
            }
          }
        }
      }
    `
  )

  const metaDescription = description || data.site.siteMetadata.description
  const metaTitle = title || data.site.siteMetadata.title
  const metaImage = image
    ? `${data.site.siteMetadata.url}${image.publicURL}`
    : `${data.site.siteMetadata.url}${data.file.childImageSharp.original.src}`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      titleTemplate={
        title
          ? `%s | ${data.site.siteMetadata.title}`
          : data.site.siteMetadata.title
      }
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: "keywords",
          content: data.site.siteMetadata.keywords.join(","),
        },
        {
          property: `og:title`,
          content: metaTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:site_name`,
          content: metaTitle,
        },
        {
          property: `og:url`,
          content: data.site.siteMetadata.url,
        },
      ]
        .concat([
          {
            property: "og:image",
            content: metaImage,
          },
          {
            property: "og:image:width",
            content: metaImage,
          },
          {
            property: "og:image:height",
            content: metaImage,
          },
          {
            name: "twitter:card",
            content: "summary_large_image",
          },
          {
            name: "twitter:image:src",
            content: metaImage,
          },
        ])
        .concat([
          {
            name: `twitter:creator`,
            content: data.site.siteMetadata.twitter,
          },
          {
            name: `twitter:title`,
            content: metaTitle,
          },
          {
            name: `twitter:description`,
            content: metaDescription,
          },
          {
            name: `twitter:site`,
            content: data.site.siteMetadata.twitter,
          },
        ])
        .concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}
SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
}

export default SEO
