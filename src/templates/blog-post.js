import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import blogPostStyles from "../css/blog-post.module.css"
import "../css/prism-rainforest.css"

const GITHUB_USERNAME = "adrianmarkperea"
const REPO_NAME = "adrianperea.dev"

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const { social } = data.site.siteMetadata
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
            <div className={blogPostStyles.cta}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://twitter.com/intent/tweet?text=${post.frontmatter.title} by @${social.twitter}&url=https://adrianperea.dev/${post.fields.slug}`}
              >
                Share on Twitter
              </a>
              <a
                href={`https://github.com/${GITHUB_USERNAME}/${REPO_NAME}/edit/master/content/blog/${post.fields.slug}/index.md`}
              >
                Edit on Github
              </a>
            </div>
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
        social {
          twitter
        }
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
      fields {
        slug
      }
    }
  }
`
