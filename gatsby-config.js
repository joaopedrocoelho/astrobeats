module.exports = {
  siteMetadata: {
    title: `Peregrin Astrology`,
    description: `astrology blog, horoscopes, mundane, historical astrology, birth chart consultations.`,
    keywords: [
      "astrology",
      "astrologer",
      "zodiac",
      "signs",
      "aries",
      "taurus",
      "gemini",
      "cancer",
      "leo",
      "virgo",
      "libra",
      "scorpio",
      "sagittarius",
      "capricorn",
      "aquarius",
      "pisces",
      "horoscope",
      "forecast",
      "mundane",
      "birth chart",
    ],
    author: `Pedro Coelho`,
    url: "https://www.peregrinastro.com",
    siteLanguage: "english",
    twitter: "@peregrinastro",
    facebook: "peregrinastro",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
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
        contentTypes: [`article`, `category`, `author`],
        //If using single types place them in this array.
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
    `gatsby-plugin-gatsby-cloud`,

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
