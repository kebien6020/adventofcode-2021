import {abs, compose, filter, flatMap, len, lines, loadSync, map, max, occurrences, pipe, rangeA, replicate, split, trace, zip} from './common.js'

const parseInput = compose (
  lines,
  map (split ('->')),
  map (map (split (','))),
  map (map (map (Number))),
)

const rangeOrFill = count => from => to =>
    from !== to ? rangeA (from) (to) : replicate (count) (from)

const expandLine = ([from, to]) => {
  const [xFrom, xTo] = [from[0], to[0]]
  const [yFrom, yTo] = [from[1], to[1]]
  const pointCount = max (abs(xTo - xFrom)) (abs(yTo - yFrom)) + 1

  const range_ = rangeOrFill (pointCount)
  const xRng = range_ (xFrom) (xTo)
  const yRng = range_ (yFrom) (yTo)
  return zip (xRng) (yRng)
}

const coordOccurrences = compose (
  map (([x, y]) => `x=${x},y=${y}`),
  occurrences,
  Object.values,
)

const countIntersections = compose (
  filter (x => x >= 2),
  len,
)

pipe ('input5.txt') (
  loadSync,
  parseInput,
  flatMap (expandLine),
  coordOccurrences,
  countIntersections,
  trace,
)
