import {pair, compose, count, filter, fork, fst, id, index, iota, join, len, loadSync, map, pipe, reduce, split, trace} from "./common.js"

const data = loadSync ('input3.txt')

const mostCommon = col => pipe (col) (
  count ('1'),
  x => x >= len (col) / 2 ? '1' : '0',
)

const leastCommon = compose (
  mostCommon,
  x => x === '1' ? '0' : '1',
)

const filterOnIndexBy = xCommon => idx => rows => {
  const col = map (index (idx)) (rows)
  const mcommon = xCommon (col)

  return filter (x => index (idx) (x) === mcommon) (rows)
}

const calcFilteringBy = xCommon => rows => {
  const reducer = acc => i =>
    len (acc) === 1
      ? acc
      : filterOnIndexBy (xCommon) (i) (acc)
  const indices = pipe (rows) (fst, len, iota)

  return pipe (indices) (
    reduce (reducer) (rows),
    fst,
  )
}

pipe (data) (
  split ('\n'),
  filter (id),
  map (split ('')),
  fork (calcFilteringBy (mostCommon)) (calcFilteringBy (leastCommon)) (pair),
  map (join ('')),
  map (x => parseInt(x, 2)),
  ([ogr, co2r]) => ogr * co2r,
  trace,
)
