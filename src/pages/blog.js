import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import blogStyles from "../css/blog.module.css"
import Item from "../components/list"

const Blog = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  const content = (
    <>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <Item
            title={title}
            path={node.fields.slug}
            isInternal={true}
            headerContent={<small>{node.frontmatter.date}</small>}
            description={node.frontmatter.description || node.excerpt}
          />
        )
      })}
    </>
  )

  return (
    <Layout>
      <SEO title="All posts" />
      <div className={blogStyles.container}>
        <h2 className={blogStyles.title}>Articles</h2>
        {content}
      </div>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
