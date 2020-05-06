import React from "react"
import SEO from "../components/seo"

const BlogIndex = ({ data }) => {
  return <SEO title="All posts" />
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author {
          name
        }
      }
    }
  }
`
