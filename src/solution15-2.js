import { add, compose, flatMap, fst, index, iota, len, lines, loadSync, map, pipe, slice, split, sum, trace } from './common.js'
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

const add2d = d => n => map (map (add (n))) (d)

const combineTileRow = tileRow =>
  map (
    x => flatMap (index (x)) (tileRow)
  ) (iota (len (fst (tileRow))))

const combineTiles = tiles =>
  flatMap (
    combineTileRow
  ) (tiles)

const fullMap = data => {
  const tileAdd =
    map (x => map (add (x)) (iota (5))) (iota (5))

  return pipe (tileAdd) (
    map (map (add2d (data))),
    combineTiles,
    map (map (x => x > 9 ? x - 9 : x))
  )
}

const solve = data => {
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
}

pipe (loadSync('input15.txt')) (
  parseInput,
  fullMap,
  solve,
  trace,
)
