import * as React from "react"

import "../components/styles/article.css"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout heroIsVisible={false}>
    <SEO title="404: Not found" />
    <div className="main-column">
      <h2 className="title shadow">Page not found</h2>
      <div className="article-container">
        <p className="content">
          You just hit a route that doesn&#39;t exist... the sadness.
        </p>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
