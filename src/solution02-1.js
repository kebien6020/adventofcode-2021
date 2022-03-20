import {loadSync, map, pipe, reduce, split, trace} from "./common.js";

const parseCommand = s =>
  pipe (s) (
    split(' '),
    ([action, amount]) => ({action, amount: Number(amount)}),
  )

const updateState = ({h, v}) => ({action, amount}) =>
  ({
    h: action === 'forward' ? h + amount : h,
    v:
      action === 'down' ? v + amount :
      action === 'up' ? v - amount :
      v
  })

pipe (loadSync('input2.txt')) (
  split('\n'),
  map (parseCommand),
  reduce (updateState) ({h: 0, v: 0}),
  ({h, v}) => h * v,
  trace,
)
