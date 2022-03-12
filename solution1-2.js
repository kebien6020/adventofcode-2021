import {window, filter, id, len, loadSync, lt, pipe, trace, map, sum, split, take} from './common.js'

pipe (loadSync('input1.txt')) (
  split ('\n'),
  map (Number),
  take (20),
  window (3),
  map (sum),
  window (2),
  map (([a, b]) => lt (a) (b)),
  filter(id),
  len,
  trace,
)
