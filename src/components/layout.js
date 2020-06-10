import React from "react"
import { Link } from "gatsby"
import "../css/main.css"
import layoutStyles from "../css/layout.module.css"
import Social from "./social"

const Header = () => (
  <header>
    <nav className={layoutStyles.nav}>
      <div className="container">
        <div className={layoutStyles.navContainer}>
          <Link to="/" className={layoutStyles.brand}>
            adrianperea.dev
          </Link>
          <div className={layoutStyles.navLinks}>
            <Link to="/blog">Blog</Link>
            <Link to="/projects">Projects</Link>
            <button className={layoutStyles.modeToggler}>🌙</button>
          </div>
        </div>
      </div>
    </nav>
  </header>
)

const Main = ({ children }) => (
  <div className={layoutStyles.main}>{children}</div>
)

const Footer = () => (
  <footer className={layoutStyles.footer}>
    <div className="container">
      <div className={layoutStyles.footerLinks}>
        <Social />
        <a href="/rss.xml">rss</a>
      </div>
      <p>All materials &copy; Adrian Perea 2020</p>
    </div>
  </footer>
)

const Layout = ({ children }) => {
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
      <Main>{children}</Main>
      <Footer />
    </>
  )
}

export default Layout
