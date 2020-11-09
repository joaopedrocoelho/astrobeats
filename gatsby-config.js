const { isNil } = require("lodash")

const mapPagesUrls = {
  index: "/",
}

module.exports = {
  siteMetadata: {
    title: `astrobeats`,
    description: `astrology blog, horoscopes, mundane, historical astrology, birth chart consultations.`,
    author: `Pedro Coelho`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `https://astrobeats-cms.herokuapp.com`,
        queryLimit: 10000, // Default to 100
        contentTypes: [`article`, `category`, `author`, `appointment`],
        //If using single types place them in this array.
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "fonts",
        path: `${__dirname}/src/fonts/`,
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Merriweather", "Montserrat", "Lato:100,300,400,700,900"],
        },
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: `@draftbox-co/gatsby-plugin-fusejs`,
      options: {
        fields: [`title`, `slug`],
        resolvers: {
          allSitePage: {
            title: node => node.title,
            slug: node => node.slug,
          },
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
  ],
}
