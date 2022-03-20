import {add, compose, filter, fork, id, join, len, loadSync, map, pair, pipe, reduce, replicate, split, trace, zipWith} from './common.js'

const calculateGamma = lines => {
  const updateCounts = old => compose (
    map (x => x === '1' ? 1 : 0),
    zipWith (add) (old),
  )
  const zeroes = replicate (len (lines[0])) (0)

  return pipe (lines) (
    reduce (updateCounts) (zeroes),
    map (x => x > len (lines) / 2),
    map (x => x ? '1' : '0'),
  )
}

const invert = x => x === '1' ? '0' : '1'

pipe (loadSync('input3.txt')) (
  split ('\n'),
  filter (id),
  map (split ('')),
  calculateGamma,
  fork (id) (map (invert)) (pair),
  map (join('')),
  map (x => parseInt(x, 2)),
  ([gamma, epsilon]) => gamma * epsilon,
  trace,
)
