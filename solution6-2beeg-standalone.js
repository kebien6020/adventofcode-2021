import fs from 'fs'

const pipe = x => (...fns) => fns.reduce((a, fn) => fn(a), x)
const compose = (...fns) => x => pipe (x) (...fns)

const add = a => b => a + b
const map = fn => a => a.map(fn)
const reduce = fn => x => a => a.reduce((a, b) => fn (a) (b), x)
const split = sep => s => s.split(sep)
const trace = x => (console.log(x), x)
const trim = s => s.trim()

const iota = n => [...Array(n)].map((_, i) => i)
const loadSync = name => fs.readFileSync(name, {encoding: 'utf8'})
const occurrences = reduce (o => v => (o[v] = (o[v] ?? 0) + 1, o)) ({})
// 👆These functions are in a common.js file shared among all the solutions

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
