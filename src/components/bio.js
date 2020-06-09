import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import bioStyles from "../css/bio.module.css"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 60, height: 60) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            firstName
            lastName
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div className={bioStyles.container}>
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        className={bioStyles.profilePic}
      />
      <p className={bioStyles.description}>
        Hi! I'm {author.firstName}. I'm a software engineer, and I work hard to
        provide helpful and highly intuitive content for free. If you like what
        you read, please consider{" "}
        <a href={`https://twitter.com/${social.twitter}`}>following</a> me on
        Twitter. Hope to see you again next time!
      </p>
    </div>
  )
}

export default Bio
