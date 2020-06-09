import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import blogPostStyles from "../css/blog-post.module.css"
import "../css/prism-rainforest.css"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <section className="page-section">
        <div className="container">
          <article className={blogPostStyles.article}>
            <header>
              <h1>{post.frontmatter.title}</h1>
              <small>{post.frontmatter.date}</small>
            </header>
            <section dangerouslySetInnerHTML={{ __html: post.html }} />
            <hr className={blogPostStyles.hr} />
            <footer>
              <Bio />
            </footer>
          </article>
        </div>

        <nav className="container">
          <ul className={blogPostStyles.navList}>
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </section>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
