import { compose, concat, default_, eq, filter, flatMap, fork, id, includedIn, index, iota, last, len, lines, loadSync, lower, map, not, pipe, reduce, reverse, split, trace } from './common.js'

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

  const options = pipe (g) (
    index (curr),
    default_ ([]),
    filter (compose (includedIn (state.visited), not)),
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
  len,
  trace,
)
