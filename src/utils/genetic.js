export class Population {
  constructor(target, popSize = 100, mutationRate = 0.01) {
    this.population = []
    this.target = target
    this.mutationRate = mutationRate
    this.popSize = popSize
    this.generation = 0
    this.finished = false

    for (let i = 0; i < this.popSize; i++) {
      this.population[i] = new Chromosome(this.target.length)
    }
  }

  calculateFitness() {
    this.population.forEach(chromosome =>
      chromosome.calculateFitness(this.target)
    )
  }

  evaluate() {
    this.population = this.population.sort((a, b) => b.fitness - a.fitness)

    if (this.getBest().repr() === this.target) {
      this.finished = true
    }
  }

  getBest() {
    return this.population[0]
  }

  getStats() {
    return {
      best: this.population[0],
      generation: this.generation,
      popSize: this.popSize,
      highestFitness: this.getBest().fitness,
      averageFitness: this.getAverageFitness(),
    }
  }

  getAverageFitness() {
    const averageFitness = this.population.reduce(
      (average, current, _, arr) => {
        average += current.fitness / arr.length
        return average
      },
      0
    )

    return averageFitness
  }

  isFinished() {
    return this.finished
  }

  generateIfNotFinished() {
    if (!this.finished) {
      const matingPool = this._generateMatingPool()
      this.population = this._generateNewPopulation(matingPool)
      this.generation += 1
    }
  }

  _generateMatingPool() {
    const highestFitness = this._getHighestFitness()
    const matingPool = this._generateMatingPoolUsingHighestFitness(
      highestFitness
    )

    return matingPool
  }

  _getHighestFitness() {
    const highestFitness = this.population.reduce(
      (max, chromosome) =>
        chromosome.fitness > max ? chromosome.fitness : max,
      0
    )

    return highestFitness
  }

  _generateMatingPoolUsingHighestFitness(highestFitness) {
    const matingPool = []

    this.population.forEach(chromosome => {
      const fitness =
        chromosome.fitness === 0
          ? 0
          : this._map(chromosome.fitness, 0, highestFitness, 0, 1)

      const numEntries = Math.floor(fitness * 100)

      for (let i = 0; i < numEntries; i++) {
        matingPool.push(chromosome)
      }
    })

    return matingPool
  }

  _map(value, iStart, iEnd, oStart, oEnd) {
    return oStart + ((oEnd - oStart) / (iEnd - iStart)) * (value - iStart)
  }

  _generateNewPopulation(matingPool) {
    const newPopulation = []

    for (let i = 0; i < this.population.length; i++) {
      const [parentOne, parentTwo] = this._getParents(matingPool)
      const child = this._makeChild(parentOne, parentTwo)
      newPopulation.push(child)
    }

    return newPopulation
  }

  _getParents(matingPool) {
    const parentOne = matingPool[Math.floor(Math.random() * matingPool.length)]
    const parentTwo = matingPool[Math.floor(Math.random() * matingPool.length)]

    return [parentOne, parentTwo]
  }

  _makeChild(parentOne, parentTwo) {
    const child = parentOne.crossoverWith(parentTwo)
    child.mutate(this.mutationRate)
    return child
  }
}

export class Chromosome {
  constructor(length) {
    this.genes = []
    this.fitness = 0
    for (let i = 0; i < length; i++) {
      this.genes.push(this.generate())
    }
  }

  generate() {
    const characters = "abcdefghijklmnopqrstuvwxyz "
    const c = characters.charAt(Math.floor(Math.random() * characters.length))
    return c
  }

  calculateFitness(target) {
    const score = this.genes.reduce((score, current, i) => {
      return current === target.charAt(i) ? score + 1 : score
    }, 0)

    this.fitness = score / target.length
  }

  crossoverWith(chromosome) {
    const crossoverPoint = Math.floor(Math.random() * this.genes.length)
    const child = new Chromosome(this.length)
    child.genes = this.genes.map((gene, i) =>
      i < crossoverPoint ? gene : chromosome.genes[i]
    )

    return child
  }

  mutate(rate) {
    this.genes = this.genes.map(gene =>
      Math.random() < rate ? this.generate() : gene
    )
  }

  repr() {
    return this.genes.join("")
  }
}
