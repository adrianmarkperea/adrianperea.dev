import React from "react"
import SEO from "../components/seo"
import indexStyles from "../css/index.module.css"
import Mutating from "../components/mutating"
import Layout from "../components/layout"
import { graphql, Link, navigate } from "gatsby"
import { IconContext } from "react-icons"
import { FaChevronDown } from "react-icons/fa"
import Image from "gatsby-image"
import Social from "../components/social"

const getRandomDescription = descriptions => {
  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

const HEADER_HEIGHT = 55

const scrollTo = ref =>
  window.scrollTo(0, ref.current.offsetTop - HEADER_HEIGHT)

const ContactForm = () => {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")

  const sendToFormHandler = () => {
    return fetch("https://submit-form.com/v19LBL6qXhQA4XBx8cHfn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await sendToFormHandler()
      navigate("/form-submitted/")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <form className={indexStyles.contactForm} onSubmit={handleSubmit}>
        <div>
          <label>
            Name
            <br />
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email
            <br />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
        </div>
        <label>
          Message
          <br />
          <textarea
            value={message}
            rows={6}
            onChange={e => setMessage(e.target.value)}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </>
  )
}

const BlogIndex = ({ data }) => {
  const author = data.site.siteMetadata.author
  const description = getRandomDescription(author.descriptions)

  const descriptionRef = React.useRef()
  const scrollToDescription = () => scrollTo(descriptionRef)

  return (
    <Layout>
      <SEO />
      <div className={indexStyles.hero}>
        <div className="container">
          <div className={indexStyles.heroText}>
            <h1>
              Hi, I'm{` `}
              <span className={indexStyles.name}>{author.firstName}</span>
            </h1>
            <Mutating text={description} />
          </div>
        </div>

        <IconContext.Provider value={{ color: "#649d66" }}>
          <div className={indexStyles.down}>
            <button onClick={scrollToDescription}>
              <FaChevronDown />
            </button>
          </div>
        </IconContext.Provider>
      </div>

      <section
        ref={descriptionRef}
        className={`container ${indexStyles.aboutMeSection}`}
      >
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
            Hi! My name is {author.name}. I'm a full stack software engineer
            from the Philippines. 
          </p>

          <p>
            {" "}
            I'm interested in creating artificial intelligence{" "}
            <a href="https://genie-phrase-guesser.netlify.app/">
              simulations
            </a>{" "}
            and visualizations. I also <Link to="/blog">write</Link> about
            Artificial Intelligence, edge computing, and the modern web.
          </p>

          <p>
            My preferred programming language is Python, but I am also adept in
            JavaScript. I am experienced in creating data science analyses with
            pandas, matplotlib, and tensorflow. In addition, I am versed with
            creating full stack web applications using React.js and Express, and
            SQL/NoSQL.
          </p>

          <p>
            If you have projects that need data manipulation with visualization
            to match, I'm your guy!
          </p>

          <div className={indexStyles.socialIcons}>
            <Social />
          </div>
        </div>
      </section>

      <section className={indexStyles.contactSection}>
        <div className="container">
          <h2>Send a message</h2>
          <small>and let's make something happen</small>
          <ContactForm />
        </div>
      </section>
    </Layout>
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
