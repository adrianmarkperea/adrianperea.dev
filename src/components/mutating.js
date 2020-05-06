import React from "react"
import { Population } from "../utils/genetic"
import mutatingStyles from "../css/mutating.module.css"

const Mutating = ({ text, popSize = 1000, timeout = 50, mutation = 0.01 }) => {
  const [stats, setStats] = React.useState()

  const population = React.useRef()
  const rafId = React.useRef()

  const run = React.useCallback(() => {
    population.current.calculateFitness()
    population.current.evaluate()

    const stats = population.current.getStats()
    setStats(stats)

    console.log(stats)

    population.current.generateIfNotFinished()

    if (!population.current.isFinished()) {
      setTimeout(() => {
        rafId.current = requestAnimationFrame(run)
      }, timeout)
    }
  }, [timeout])

  React.useEffect(() => {
    population.current = new Population(text, popSize, mutation)
    rafId.current = requestAnimationFrame(run)

    return () => cancelAnimationFrame(rafId.current)
  }, [text, popSize, mutation, run])

  if (!stats) {
    return null
  }

  return (
    <div className={mutatingStyles.container}>
      <p className={mutatingStyles.main}>{stats.best.repr()}</p>
      <ul className={mutatingStyles.stats}>
        <li>
          <small>generation: {stats.generation}</small>
        </li>
        <li>
          <small>highest fitness: {stats.highestFitness.toFixed(2)}</small>
        </li>
        <li>
          <small>average fitness: {stats.averageFitness.toFixed(2)}</small>
        </li>
        <li>
          <small>pop. size: {stats.popSize}</small>
        </li>
      </ul>
    </div>
  )
}

export default Mutating
