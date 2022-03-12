import {add, compose, fork, iota, loadSync, map, maximum, minimum, pair, pipe, split, sum, trace, trim} from './common.js'

const parseInput = compose (
  trim,
  split (','),
  map (Number),
)

const minmax = fork (minimum) (maximum) (pair)

const cost = data => target => pipe (data) (
  map (add (-target)),
  map (Math.abs),
  map (n => n * (n + 1) / 2),
  sum,
)

pipe (loadSync('input7.txt')) (
  parseInput,
  data => {
    const [min, max] = minmax(data)
    const options = map (add (-min)) (iota (max - min))
    return map (cost (data)) (options)
  },
  minimum,
  trace,
)
