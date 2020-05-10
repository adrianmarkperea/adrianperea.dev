import React from "react"
import { Population } from "../utils/genetic"
import mutatingStyles from "../css/mutating.module.css"

const useGeneticAlgorithm = ({ text, popSize, mutation, timeout, cb }) => {
  const population = React.useRef()
  const rafId = React.useRef()

  const run = React.useCallback(() => {
    population.current.calculateFitness()
    population.current.evaluate()
    cb(population.current.getStats())
    population.current.generateIfNotFinished()
  }, [timeout])

  React.useEffect(() => {
    population.current = new Population(text, popSize, mutation)
    rafId.current = requestAnimationFrame(run)

    return () => cancelAnimationFrame(rafId.current)
  }, [text, popSize, mutation, run])

  React.useEffect(() => {
    if (!population.current.isFinished()) {
      setTimeout(() => {
        rafId.current = requestAnimationFrame(run)
      }, timeout)
    }
  })
}

const Mutating = ({ text, popSize = 1000, timeout = 50, mutation = 0.01 }) => {
  const [stats, setStats] = React.useState()

  useGeneticAlgorithm({
    text,
    popSize,
    timeout,
    mutation,
    cb: stats => setStats(stats),
  })

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
