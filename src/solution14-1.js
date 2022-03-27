import { add, compose, fork, fst, index, indexOn, iota, join, last, lines, loadSync, map, maximum, minimum, occurrences, pipe, reduce, split, sub, trace, trim, window } from './common.js'

const parseInput = d => {
  const [s, pairsStr] = split ('\n\n') (d)
  const pairs = pipe (pairsStr) (
    lines,
    map (split ('->')),
    map (map (trim)),
    Object.fromEntries,
  )

  return {s, pairs}
}

const subst = pairs => s => pipe (s) (
  window (2),
  map (fork (fst) (indexOn (pairs)) (add)),
  join (''),
  x => x + last (s),
)

const solve = compose (
  ({s, pairs}) => reduce (s => _ => subst (pairs) (s)) (s) (iota (10)),
  split (''),
  occurrences,
  Object.values,
  fork (maximum) (minimum) (sub),
)

pipe (loadSync('input14.txt')) (
  parseInput,
  solve,
  trace,
)
