import {add, all, any, compose, filter, flat, fork, fst, id, join, loadSync, map, or, pipe, reduce, slice, split, trace, traceMsg, transpose} from './common.js'

const initialAnnotateBoard =
  map (map (n => ({n, m: false})))

const applyDraw = d => ab => {
  const condMark = ({n, m}) =>
    n === d
      ? ({n, m: true})
      : ({n, m})
  return map (map (condMark)) (ab)
}

const colored = s => `\x1b[35m${s}\x1b[0m`
const showBoard = compose (
  map (map (({n, m}) => m ? colored(n) : n)),
  map (join ('\t')),
  join('\n'),
)

const showBoards = compose (
  map (showBoard),
  join('\n\n'),
  s => s + '\n\n---\n',
)

const hasWinningRow = compose(
  map (map (({m}) => m)),
  map (all),
  any,
)

const hasWinningCol = compose(transpose, hasWinningRow)

const isWinner = fork (hasWinningRow) (hasWinningCol) (or)

const getWinner = compose (
  map (b => isWinner(b) ? b : undefined),
  reduce (a => b => a ?? b) (undefined),
)

const sumUnmarked = compose (
  flat,
  filter (({m}) => !m),
  map (({n}) => n),
  reduce (add) (0),
)

const parseInput = raw => {
  const draws = pipe (raw) (
    split('\n'),
    fst,
    split(','),
    map (Number),
  )

  const boards = pipe (raw) (
    split('\n\n'),
    slice (1),
    map (compose (
      split('\n'),
      filter (id),
      map (compose (
        split (/\s+/),
        filter (id),
        map (Number),
      )),
      initialAnnotateBoard,
    )),
  )

  return {draws, boards}
}

pipe (loadSync('input4.txt')) (
  parseInput,
  ({draws, boards}) => {
    let acc = boards
    for (const d of draws) {
      acc = pipe (acc) (
        map (applyDraw (d)),
        traceMsg(showBoards),
      )

      let winner
      if (winner = getWinner(acc)) {
        return {board: winner, draw: d}
      }
    }
  },
  traceMsg(_ => 'Winning draw and board'),
  traceMsg(({draw}) => draw),
  traceMsg(({board}) => showBoard(board)),
  ({draw, board}) => sumUnmarked (board) * draw,
  trace,
)
