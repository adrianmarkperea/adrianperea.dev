import React from "react"
import SEO from "../components/seo"
import indexStyles from "../css/index.module.css"
import Mutating from "../components/mutating"
import { Link } from "gatsby"

const getRandomDescription = descriptions => {
  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

const BlogIndex = ({ data }) => {
  const author = data.site.siteMetadata.author
  const description = getRandomDescription(author.descriptions)

  return (
    <>
      <header>
        <nav className={indexStyles.nav}>
          <div className={indexStyles.navContainer}>
            <div className={indexStyles.brand}>🐸</div>
            <div className={indexStyles.navLinks}>
              <Link to="/blog">Blog</Link>
              <Link to="/projects">Projects</Link>
              <button className={indexStyles.modeToggler}>🌙</button>
            </div>
          </div>
        </nav>

        <div className={indexStyles.hero}>
          <div className={indexStyles.heroText}>
            <h1>
              Hi, I'm{` `}
              <span className={indexStyles.name}>{author.firstName}</span>
            </h1>
            <Mutating text={description} />
          </div>
        </div>
      </header>
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author {
          name
          firstName
          descriptions
        }
      }
    }
  }
`
