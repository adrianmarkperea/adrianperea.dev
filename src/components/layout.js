import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import layoutStyles from "./layout.module.css"

import { rhythm, scale } from "../utils/typography"

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
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>
        <h1
          style={{
            marginBottom: rhythm(1.25),
            marginTop: 0,
            fontWeight: 900,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      </header>
      <main>{children}</main>
      <footer style={{ display: `flex`, justifyContent: `space-between` }}>
        <div>
          <a
            className={layoutStyles.footerLink}
            href={`https://twitter.com/${social.twitter}`}
            style={{ marginRight: rhythm(0.2) }}
          >
            Twitter
          </a>
          <a
            className={layoutStyles.footerLink}
            href={`https://github.com/${social.github}`}
            style={{ marginRight: rhythm(0.2) }}
          >
            Github
          </a>
          <a
            className={layoutStyles.footerLink}
            href="#"
            style={{ marginRight: rhythm(0.2) }}
          >
            Kofi
          </a>
        </div>
        <div>
          <a className={layoutStyles.footerLink} href="rss.xml">
            rss
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
