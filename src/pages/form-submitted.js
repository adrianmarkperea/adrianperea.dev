import React from "react"
import SEO from "../components/seo"
import { Link } from "gatsby"
import Layout from "../components/layout"
import formSubmittedStyles from "../css/form-submitted.module.css"

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title="Form Submitted - Adrian Perea" />
      <div className={formSubmittedStyles.wrapper}>
        <div className="container">
          <h1>Thank you!</h1>
          <p>
            Hey! Thanks for dropping a message!
            <br /> I'll get back to you as soon as possible.
          </p>
          <Link to="/">
            <button>← Back to Home</button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage
