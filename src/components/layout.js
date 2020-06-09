import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import "../css/main.css"
import layoutStyles from "../css/layout.module.css"
import Social from "./social"

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

const Footer = () => (
  <footer className={layoutStyles.footer}>
    <div className={layoutStyles.footerLinks}>
      <Social />
      <a href="rss">rss</a>
    </div>
    <p>All materials &copy; Adrian Perea 2020</p>
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
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
