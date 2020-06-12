import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import projectsStyles from "../css/projects.module.css"
import projects from "../../content/projects/projects"
import Item from "../components/item"

const Projects = () => {
  return (
    <Layout>
      <SEO title="Projects" />
      <section className="page-section">
        <div className="container">
          <h2 className="title">Projects</h2>
          {projects.map(project => {
            return (
              <Item
                key={project.title}
                title={project.title}
                path={project.path}
                isInternal={false}
                headerContent={
                  <div className={projectsStyles.tagContainer}>
                    {project.tags.map(tag => (
                      <small key={`${project.title}_${tag}`}>{tag}</small>
                    ))}
                  </div>
                }
                description={project.description}
              />
            )
          })}
        </div>
      </section>
    </Layout>
  )
}

export default Projects
