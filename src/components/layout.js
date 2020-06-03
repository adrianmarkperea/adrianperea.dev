import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import "../css/main.css"
import layoutStyles from "../css/layout.module.css"
import { IconContext } from "react-icons"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"

const Header = () => (
  <header>
    <nav className={layoutStyles.nav}>
      <div className={layoutStyles.navContainer}>
        <div className={layoutStyles.brand}>🐸</div>
        <div className={layoutStyles.navLinks}>
          <Link to="/blog">Blog</Link>
          <Link to="/projects">Projects</Link>
          <button className={layoutStyles.modeToggler}>🌙</button>
        </div>
      </div>
    </nav>
  </header>
)

const Footer = ({ social }) => (
  <footer className={layoutStyles.footer}>
    <div className={layoutStyles.footerLinks}>
      <div>
        <IconContext.Provider value={{ className: layoutStyles.socialIcon }}>
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
      <a href="rss">rss</a>
    </div>
    <p>All materials &copy; Adrian Perea 2020</p>
  </footer>
)

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
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
      <Header />
      <main>{children}</main>
      <Footer social={social} />
    </>
  )
}

export default Layout
