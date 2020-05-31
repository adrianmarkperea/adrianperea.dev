import React from "react"
import { Population } from "../utils/genetic"
import mutatingStyles from "../css/mutating.module.css"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

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

const Info = ({ stats }) => {
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
      <Info stats={stats} />
    </div>
  )
}

export default Mutating
