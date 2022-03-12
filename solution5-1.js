import {compose, filter, flat, len, lines, loadSync, map, pipe, split, trace} from './common.js'

const parseInput = compose (
  lines,
  map (split ('->')),
  map (map (split (','))),
  map (map (map (Number))),
)

const ignoreDiagonals =
  filter (([from, to]) => from[0] === to[0] || from[1] === to[1])

const drawLinesInPlane = data => {
  const plane = []
  const sortNum = arr => arr.sort((a, b) => a - b)

  for (const [from, to] of data) {
    const [xFrom, xTo] = sortNum([from[0], to[0]])
    const [yFrom, yTo] = sortNum([from[1], to[1]])
    for (let x = xFrom; x <= xTo; ++x) {
      for (let y = yFrom; y <= yTo; ++y) {
        plane[x] ??= []
        plane[x][y] ??= 0
        ++plane[x][y]
      }
    }
  }

  return plane
}

const countIntersections = compose (
  flat,
  filter (x => x >= 2),
  len,
)

pipe (loadSync ('input5.txt')) (
  parseInput,
  ignoreDiagonals,
  drawLinesInPlane,
  countIntersections,
  trace,
)
