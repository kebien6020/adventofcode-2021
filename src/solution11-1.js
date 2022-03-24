import { compose, eq, find, id, inc, iota, join, lines, loadSync, map, not, pipe, reduce, split, trace, trim } from './common.js'

const toDigits = compose (
  split (''),
  map (Number),
)

const parseInput = compose (
  lines,
  map (trim),
  map (toDigits),
)

const pretty2d = compose (
  map (join ('')),
  join ('\n'),
  x => x + '\n---',
)

const trace2d = x => (trace (pretty2d (x)), x)


const handleFlashes = ([dOrg, accFlashes]) => {
  const d = map (map (id)) (dOrg) // deep clone
  let fl = accFlashes

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
        fl++
      }
    }
  }

  return [d, fl]
}

const step = compose (
  ([d, fl]) => [map (map (inc)) (d), fl],
  handleFlashes,
)

pipe (loadSync ('input11.txt')) (
  parseInput,
  d => [d, 0],
  x => reduce (x => _ => step(x)) (x) (iota (100)),
  ([d, fl]) => (trace2d(d), [d, fl]),
  ([_, fl]) => trace (fl),
)
