import React from "react"
import { IconContext } from "react-icons"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { useStaticQuery, graphql } from "gatsby"
import socialStyles from "../css/social.module.css"

const Social = () => {
  const data = useStaticQuery(graphql`
    query socialQuery {
      site {
        siteMetadata {
          social {
            twitter
            github
            linkedin
          }
        }
      }
    }
  `)

  const { social } = data.site.siteMetadata

  return (
    <div>
      <IconContext.Provider value={{ className: socialStyles.socialIcon }}>
        <a href={`https://twitter.com/${social.twitter}`}>
          <FaTwitter />
        </a>
        <a href={`https://github.com/${social.github}`}>
          <FaGithub />
        </a>
        <a href={`https://www.linkedin.com/in/${social.linkedin}/`}>
          <FaLinkedin />
        </a>
      </IconContext.Provider>
    </div>
  )
}

export default Social
