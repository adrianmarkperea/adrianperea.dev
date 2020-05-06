import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import "../css/main.css"
import layoutStyles from "../css/layout.module.css"

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
    <div className={layoutStyles.container}>
      <header>
        <h1 className={layoutStyles.title}>
          <Link className={layoutStyles.titleLink} to={`/`}>
            {title}
          </Link>
        </h1>
      </header>
      <main>{children}</main>
      <footer className={layoutStyles.footer}>
        <ul className={layoutStyles.navLinks}>
          <li className={layoutStyles.navLink}>
            <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>
          </li>
          <li className={layoutStyles.navLink}>
            <a href={`https://github.com/${social.github}`}>Github</a>
          </li>
          <li className={layoutStyles.navLink}>
            <a href="#">Kofi</a>
          </li>
        </ul>
        <a href="rss.xml">rss</a>
      </footer>
    </div>
  )
}

export default Layout
