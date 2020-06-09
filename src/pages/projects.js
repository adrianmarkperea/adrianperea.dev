import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import projectsStyles from "../css/projects.module.css"
import projects from "../../content/projects/projects"

const Projects = () => {
  const content = (
    <>
      {projects.map(project => {
        return (
          <article className={projectsStyles.article} key={project.title}>
            <header>
              <h3>
                <a href={project.path}>{project.title}</a>
              </h3>
              <div class={projectsStyles.tagContainer}>
                {project.tags.map(tag => (
                  <small key={`${project.title}_${tag}`}>{tag}</small>
                ))}
              </div>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: project.description,
                }}
              />
            </section>
          </article>
        )
      })}
    </>
  )

  return (
    <Layout>
      <SEO title="Projects" />
      <div className={projectsStyles.container}>
        <h2 className={projectsStyles.title}>Projects</h2>
        {content}
      </div>
    </Layout>
  )
}

export default Projects
