import { add, flatMap, fork, iota, last, lines, loadSync, map, maximum, minimum, occurrences, pipe, reduce, split, sub, trace, trim, window } from './common.js'

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

const fromEntriesWith = fn =>
  reduce (o => ([k, v]) => ({...o, [k]: o[k] ? fn (o[k]) (v) : v})) ({})


const subst = pairs => s => pipe (s) (
  Object.entries,
  flatMap (([p, c]) => [[p[0] + pairs[p], c], [pairs[p] + p[1], c]]),
  fromEntriesWith (add),
)

pipe (loadSync('input14.txt')) (
  parseInput,
  ({s, pairs}) => pipe (s) (
    window (2),
    occurrences,
    Object.entries, map (([k, v]) => [k, BigInt(v)]), Object.fromEntries,
    s => reduce (s => _ => subst (pairs) (s)) (s) (iota (40)),
    Object.entries,
    map (([k, v]) => [k[0], v]),
    x => [...x, [last (s), 1n]],
  ),
  fromEntriesWith (add),
  Object.values,
  fork (maximum) (minimum) (sub),
  trace,
)
