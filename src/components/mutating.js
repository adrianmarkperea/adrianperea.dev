import React from "react"
import mutatingStyles from "../css/mutating.module.css"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { createSimulation } from "../utils/simulation"

const Info = ({ stats }) => {
  // TODO: Remove static query and just use a font icon
  const data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/GitHub-Mark-32px.png/" }) {
        childImageSharp {
          fixed(width: 16, height: 16) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <div className={mutatingStyles.info}>
      <ul className={mutatingStyles.stats}>
        <li>
          <small>generation: {stats.currentGeneration}</small>
        </li>
        <li>
          <small>highest fitness: {stats.top.fitness.toFixed(2)}</small>
        </li>
        <li>
          <small>average fitness: {stats.averageFitness.toFixed(2)}</small>
        </li>
        <li>
          <small>pop. size: {stats.popSize}</small>
        </li>
      </ul>
      <a
        className={mutatingStyles.cta}
        href="https://github.com/adrianmarkperea/genie"
      >
        <span>genie.js</span>
        <Image fixed={data.avatar.childImageSharp.fixed} />
      </a>
    </div>
  )
}

const Mutating = ({ text }) => {
  const [stats, setStats] = React.useState()

  const onCalculateFitness = React.useCallback(
    ({ top, currentGeneration, popSize, averageFitness }) => {
      setStats({ top, currentGeneration, popSize, averageFitness })
    },
    []
  )

  React.useEffect(() => {
    console.log(text)
    const simulation = createSimulation(text, onCalculateFitness)
    simulation.start()
  }, [onCalculateFitness])

  if (!stats) {
    return null
  }

  return (
    <div className={mutatingStyles.container}>
      <p className={mutatingStyles.main}>{stats.top.getDna(0).join("")}</p>
      <Info stats={stats} />
    </div>
  )
}

export default Mutating
