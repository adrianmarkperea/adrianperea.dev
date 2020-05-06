import React from "react"
import SEO from "../components/seo"
import indexStyles from "../css/index.module.css"

const getRandomDescription = descriptions => {
  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

const BlogIndex = ({ data }) => {
  const author = data.site.siteMetadata.author
  const description = getRandomDescription(author.descriptions)

  return (
    <div className={indexStyles.hero}>
      <div className={indexStyles.heroText}>
        <h1>
          <span className={indexStyles.hi}>Hi</span>
          <br />
          I'm{` `}
          <span className={indexStyles.name}>{author.firstName}</span>
        </h1>
        <p>{description}</p>
      </div>
    </div>
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
