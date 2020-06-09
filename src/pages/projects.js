import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import projectsStyles from "../css/projects.module.css"
import projects from "../../content/projects/projects"
import Item from "../components/item"

const Projects = () => {
  const content = (
    <>
      {projects.map(project => {
        return (
          <>
            <Item
              title={project.title}
              path={project.path}
              isInternal={false}
              headerContent={
                <div class={projectsStyles.tagContainer}>
                  {project.tags.map(tag => (
                    <small key={`${project.title}_${tag}`}>{tag}</small>
                  ))}
                </div>
              }
              description={project.description}
            />
          </>
        )
      })}
    </>
  )

  return (
    <Layout>
      <SEO title="Projects" />
      <div className="container">
        <h2 className="title">Projects</h2>
        {content}
      </div>
    </Layout>
  )
}

export default Projects
