import { concat, count, default_, eq, filter, flatMap, fork, id, index, iota, last, len, lines, loadSync, lower, map, maximum, occurrences, pipe, reduce, reverse, split, trace } from './common.js'

const appendNode = nodes => ([from, to]) => ({
  ...nodes,
  [from]: [...(nodes[from] ?? []), to],
})

const parseGraph = reduce (appendNode) ({})

const isLower = s => eq (lower (s)) (s)

// type state = {
//   path: []
//   visited: []
// }

const step = g => state => {
  const curr = last (state.path)

  if (curr === 'end')
    return [state]

  const limit = pipe (state.visited) (
    occurrences,
    Object.values,
    maximum,
    x => x >= 2 ? 1 : 2,
  )

  const options = pipe (g) (
    index (curr),
    default_ ([]),
    filter (o => count (o) (state.visited) < limit && o !== 'start')
  )
  return pipe (options) (
    map (s => ({
      path: [...state.path, s],
      visited: isLower (s) ? [...state.visited, s] : state.visited,
    })),
  )
}

const maxDepth = 100

pipe (loadSync ('input12.txt')) (
  lines,
  map (split ('-')),
  fork (id) (map (reverse)) (concat), // Add inverse connections
  parseGraph,
  graph => {
    const start = [{path: ['start'], visited: ['start']}]
    const reducer = x => _ => flatMap (step (graph)) (x)
    return reduce (reducer) (start) (iota (maxDepth))
  },
  // map (traceMsg(x => x.path.join(' '))),
  len,
  trace,
)
