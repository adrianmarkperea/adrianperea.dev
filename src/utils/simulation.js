import { Chromosome, Individual, Simulation } from "@adrianperea/genie.js"

const charset = "abcdefghijklmnopqrstuvwxyz "

class MutationSimulation extends Simulation {
  calculateFitness(individual, phrase) {
    return individual
      .getDna(0)
      .reduce(
        (fitness, gene, i) =>
          gene === phrase.charAt(i) ? fitness + 1 : fitness,
        0
      )
  }

  shouldFinish(top) {
    return top.fitness === this.data.length
  }
}

export function createSimulation(phrase, onCalculateFitness) {
  const alphabetChromosome = new Chromosome(
    phrase.length,
    () => charset[Math.floor(Math.random() * charset.length)]
  )

  const prototype = new Individual(alphabetChromosome)

  return new MutationSimulation({
    prototype,
    data: phrase,
    popSize: 1000,
    onCalculateFitness,
  })
}
