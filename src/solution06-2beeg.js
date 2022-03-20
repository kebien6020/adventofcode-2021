import {add, compose, iota, loadSync, map, occurrences, pipe, reduce, split, trace, trim} from './common.js'

const DAYS = 2048

const stateToAmounts = compose (
  occurrences,
  o => ({...o, length: 9}),
  Array.from,
  map(x => x ?? 0),
  map (BigInt),
)

const step = state => _ => {
  const [zeroes, ...newState] = state
  newState[6] += zeroes
  newState.push(zeroes)
  return newState
}

pipe (loadSync('input6.txt')) (
  trim,
  split (','),
  map (Number),
  stateToAmounts,
  initialAmounts => reduce (step) (initialAmounts) (iota(DAYS)),
  reduce (add) (0n),
  trace,
)
