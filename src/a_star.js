import {compose, fst, snd} from "./common.js"

const reconstructPath = (cameFrom, current) => {
  const totalPath = [current]
  while (cameFrom.has(current)) {
    current = cameFrom.get(current)
    totalPath.push(current)
  }
  return totalPath.reverse()
}

const minimum1By = f => iter => {
  let res = iter[Symbol.iterator]().next().value
  for (const x of iter) {
    res = f (x) < f (res) ? x : res
  }
  return res
}

const lowestCost = compose (
  x => x.entries(),
  minimum1By (snd),
  fst
)

export const aStar = (neighbors, cost, h) => (start, goal) => {
  const cameFrom = new Map()
  const gScore = new Map([[start, 0]])
  const fScore = new Map([[start, h(start)]])

  while (fScore.size !== 0) {
    const current = lowestCost(fScore)
    if (current === goal)
      return reconstructPath(cameFrom, current)

    fScore.delete(current)
    for (const neighbor of neighbors(current)) {
      const tentativeGScore = gScore.get(current) + cost(current, neighbor)
      const neighborScore = gScore.get(neighbor) ?? Infinity
      if (tentativeGScore < neighborScore) {
        cameFrom.set(neighbor, current)
        gScore.set(neighbor, tentativeGScore)
        fScore.set(neighbor, tentativeGScore + h(neighbor))
      }
    }
  }

  throw new Error('unreachable')
}
