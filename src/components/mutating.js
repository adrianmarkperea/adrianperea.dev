import React from "react"
import mutatingStyles from "../css/mutating.module.css"
import { createSimulation } from "../utils/simulation"
import { IconContext } from "react-icons"
import { FaGithub } from "react-icons/fa"

const Info = ({ stats }) => {
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
        <IconContext.Provider value={{ className: mutatingStyles.githubIcon }}>
          <FaGithub />
        </IconContext.Provider>
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
