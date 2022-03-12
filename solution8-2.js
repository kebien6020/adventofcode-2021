import {all, compose, enumerate, eq, filter, find, flatMap, fst, includedIn, join, len, lines, loadSync, map, not, pipe, reduce1, snd, split, sum, trace, trim} from './common.js'

const parseInput = compose (
  trim,
  lines,
  map (split ('|')),
  map (map (trim)),
  map (map (split (' '))),
  map (map (map (split ('')))),
)

const getMapping = uniqDig => {
  const eqLen = x => compose(len, eq (x))
  const intersection = compose (includedIn, filter)
  const exclude = xs => filter (compose (includedIn (xs), not))

  const one = find (eqLen(2)) (uniqDig)
  const seven = find (eqLen(3)) (uniqDig)
  const index0 = exclude (one) (seven)
  const four = find (eqLen (4)) (uniqDig)
  const index13opt = exclude (one) (four)
  const len5 = filter (eqLen (5)) (uniqDig)
  const len5Common = reduce1 (intersection) (len5)
  const index3 = intersection (index13opt) (len5Common)
  const index1 = exclude (index3) (index13opt)
  const index6 = exclude ([...index3, ...index0]) (len5Common)
  const eight = find (eqLen (7)) (uniqDig)
  const index4 = exclude ([...seven, ...four, ...index6]) (eight)
  const len6 = filter (eqLen (6)) (uniqDig)
  const notLen6 = flatMap (x => exclude (x) (eight)) (len6)
  const index2 = intersection (notLen6) (one)
  const index5 = exclude (index2) (one)

  const segmentLetters = [
    fst (index0),
    fst (index1),
    fst (index2),
    fst (index3),
    fst (index4),
    fst (index5),
    fst (index6),
  ]

  //  0000
  // 1    2
  // 1    2
  //  3333
  // 4    5
  // 4    5
  //  6666
  const numberStrings = [
    '012456',
    '25',
    '02346',
    '02356',
    '1235',
    '01356',
    '013456',
    '025',
    '0123456',
    '012356',
  ]

  return pipe (numberStrings) (
    map (split ('')),
    map (map (c => segmentLetters[c])),
    enumerate,
  )
}

const conversion = mapping => letters => pipe (mapping) (
  filter (x => len (snd (x)) === len (letters)),
  find (opt =>
    all (map (includedIn (letters)) (snd (opt)))
  ),
  fst,
)

const solveLine = line => {
  const mapping = getMapping (fst (line))
  const digits =  map (conversion (mapping)) (snd (line))
  return Number(join ('') (digits))
}

pipe (loadSync ('input8.txt')) (
  parseInput,
  map (solveLine),
  sum,
  trace,
)
