import React from "react"
import SEO from "../components/seo"
import { Link } from "gatsby"
import notFoundStyles from "../css/404.module.css"

const NotFoundPage = () => {
  return (
    <>
      <SEO title="404: Not Found - Adrian Perea" />
      <div className={notFoundStyles.background}>
        <div className={notFoundStyles.cta}>
          <h1>404</h1>
          <h4>Let it go. It's lost in the void.</h4>
          <p>
            It's unsafe here, <br /> let's get you back home.
          </p>
          <Link to="/">
            <button>To Safety</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NotFoundPage
