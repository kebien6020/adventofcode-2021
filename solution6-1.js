import {dec, flatMap, iota, len, loadSync, map, pipe, reduce, split, trace, traceMsg, trim} from './common.js'

const DAYS = 80

const simulateStep = state => _ => pipe (state) (
  traceMsg(len),
  map (dec),
  flatMap (x => x < 0 ? [6, 8] : [x]),
)

pipe (loadSync('input6.txt')) (
  trim,
  split (','),
  map (Number),
  initialState => reduce (simulateStep) (initialState) (iota(DAYS)),
  len,
  trace,
)
