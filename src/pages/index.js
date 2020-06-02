import React from "react"
import SEO from "../components/seo"
import indexStyles from "../css/index.module.css"
import Mutating from "../components/mutating"
import { Link } from "gatsby"
import { IconContext } from "react-icons"
import { FaChevronDown } from "react-icons/fa"
import Image from "gatsby-image"

const NavList = () => (
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
)

const getRandomDescription = descriptions => {
  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

const scrollTo = ref => window.scrollTo(0, ref.current.offsetTop)

const BlogIndex = ({ data }) => {
  const author = data.site.siteMetadata.author
  const description = getRandomDescription(author.descriptions)

  const descriptionRef = React.useRef()
  const scrollToDescription = () => scrollTo(descriptionRef)

  React.useEffect(() => {
    const defineVh = () => {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    defineVh()
    window.addEventListener("resize", defineVh)
  }, [])

  return (
    <>
      <NavList />

      <div className={indexStyles.hero}>
        <div className={indexStyles.heroText}>
          <h1>
            Hi, I'm{` `}
            <span className={indexStyles.name}>{author.firstName}</span>
          </h1>
          <Mutating text={description} />
        </div>

        <IconContext.Provider value={{ color: "#649d66" }}>
          <div className={indexStyles.down}>
            <button onClick={scrollToDescription}>
              <FaChevronDown />
            </button>
          </div>
        </IconContext.Provider>
      </div>

      <section ref={descriptionRef} className={indexStyles.section}>
        <h2>About Me</h2>
        <div className={indexStyles.aboutMe}>
          <Image
            fixed={data.avatar.childImageSharp.fixed}
            alt={author.name}
            style={{
              float: "left",
              borderRadius: "50%",
              margin: "10px 30px 5px",
            }}
          />
          <p>
            Hi! My name is Adrian Mark Clave Perea. I'm a software engineer from
            the Philippines, currently based in Tokyo.
          </p>

          <p>
            {" "}
            I'm interested in creating artificial intelligence{" "}
            <a href="https://genie-phrase-guesser.netlify.app/">
              simulations
            </a>{" "}
            and <a href="#">visualizations</a>. I also{" "}
            <Link to="/blog">write</Link> about data science, edge computing,
            and the modern web.
          </p>

          <p>
            My preferred programming language is Python, but I am also adept in
            full-stack JavaScript.
          </p>
        </div>
      </section>
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
      childImageSharp {
        fixed(width: 80, height: 80) {
          ...GatsbyImageSharpFixed
        }
      }
    }
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
