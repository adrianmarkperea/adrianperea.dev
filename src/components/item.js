import React from "react"
import { Link } from "gatsby"
import listStyles from "../css/item.module.css"

const Item = ({ title, path, isInternal, headerContent, description }) => (
  <article className={listStyles.article} key={title}>
    <header>
      <h3>
        {isInternal ? (
          <Link to={path}>{title}</Link>
        ) : (
          <a href={path}>{title}</a>
        )}
      </h3>
      {headerContent}
    </header>
    <section>
      <p
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
    </section>
  </article>
)

export default Item
