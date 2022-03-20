import {compose, filter, flatMap, len, lines, loadSync, map, pipe, snd, split, trace, trim} from './common.js'

const parseInput = compose (
  trim,
  lines,
  map (split ('|')),
  map (map (trim)),
  map (map (split (' '))),
)

const isUniqueNumOfSegments = n => [2, 3, 4, 7].includes(n)

const solve = compose (
  flatMap (snd),
  map (len),
  filter (isUniqueNumOfSegments),
  len,
)

pipe (loadSync ('input8.txt')) (
  parseInput,
  solve,
  trace,
)
