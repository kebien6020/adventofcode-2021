import {add, compose, fork, loadSync, map, minimum, pipe, split, sum, trace, trim, unique} from './common.js'

const parseInput = compose (
  trim,
  split (','),
  map (Number),
)

const cost = data => target => pipe (data) (
  map (add (-target)),
  map (Math.abs),
  sum,
)

pipe (loadSync('input7.txt')) (
  parseInput,
  fork (cost) (unique) (map),
  minimum,
  trace,
)
