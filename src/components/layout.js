import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

const Layout = ({ title, children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  const { social } = data.site.siteMetadata

  return (
    <div>
      <header>
        <h1>
          <Link to={`/`}>{title}</Link>
        </h1>
      </header>
      <main>{children}</main>
      <footer>
        <div>
          <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>
          <a href={`https://github.com/${social.github}`}>Github</a>
          <a href="#">Kofi</a>
        </div>
        <div>
          <a href="rss.xml">rss</a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
