import { compose, fst, len, lines, loadSync, map, pipe, slice, split, sum, trace } from './common.js'
import poly from '@bloomberg/record-tuple-polyfill'
import {aStar} from './a_star.js'
const { Record } = poly

const parseInput = compose (
  lines,
  map (split ('')),
  map (map (Number)),
)


const neighbors = ({w, h}) => ({i, j}) => {
  const res = []
  if (i > 0) res.push(Record({i: i - 1, j}))
  if (i + 1 < h) res.push(Record({i: i + 1, j}))
  if (j > 0) res.push(Record({i, j: j - 1}))
  if (j + 1 < w) res.push(Record({i, j: j + 1}))
  return res
}

const cost = data => (_from, to) => {
  return data[to.i][to.j]
}

const heur = ({w, h}) => ({i, j}) => {
  return (w - j) + (h - i)
}


pipe (loadSync('input15.txt')) (
  parseInput,
  data => {
    const h = len (data)
    const w = len (fst (data))
    const size = {w, h}
    const aStarRdy = aStar (neighbors (size), cost (data), heur (size))
    const path = aStarRdy(Record({i: 0, j: 0}), Record({i: h - 1, j: w - 1}))
    return pipe (path) (
      slice (1),
      map (({i, j}) => data[i][j]),
      sum,
    )
  },
  trace,
)
