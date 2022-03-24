import { all, compose, eq, find, id, inc, iota, join, lines, loadSync, map, not, pipe, reduce, split, trace, trim } from './common.js'

const toDigits = compose (
  split (''),
  map (Number),
)

const parseInput = compose (
  lines,
  map (trim),
  map (toDigits),
)

const inc2d = (d, i, j) => {
  if (d[i] === undefined) return
  if (d[i][j] === undefined) return
  if (d[i][j] === 0)  return
  ++d[i][j]
}

const containsOver9 = compose (
  find (find (x => x > 9)),
  eq (undefined),
  not,
)

const allZeroes = compose (
  map (map (eq (0))),
  map (all),
  all,
)

const step = dOrg => i => {
  if (dOrg?.reduced !== undefined)
    return dOrg

  const d = map (map (inc)) (dOrg)

  while (containsOver9 (d)) {
    for (let i = 0; i < d.length; ++i) {
      for (let j = 0; j < d[i].length; ++j) {
        const x = d[i][j]
        if (x <= 9)
          continue

        d[i][j] = 0
        inc2d(d, i-1, j  )
        inc2d(d, i  , j-1)
        inc2d(d, i-1, j-1)
        inc2d(d, i+1, j  )
        inc2d(d, i  , j+1)
        inc2d(d, i+1, j+1)
        inc2d(d, i-1, j+1)
        inc2d(d, i+1, j-1)
      }
    }
  }

  if (allZeroes(d))
    return {reduced: i+1}

  return d
}

pipe (loadSync ('input11.txt')) (
  parseInput,
  x => reduce (step) (x) (iota (10_000_000)),
  trace,
)
