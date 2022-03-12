import {filter, id, len, loadSync, lt, pipe, slice, trace, zipWith} from './common.js'

pipe (loadSync('input1.txt')) (
  x => x.split('\n').map(Number),
  w => zipWith (lt) (w) (slice (1) (w)),
  filter(id),
  len,
  trace,
)
