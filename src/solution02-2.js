import {filter, id, loadSync, map, pipe, reduce, split, trace} from "./common.js";

const parseCommand = s =>
  pipe (s) (
    split(' '),
    ([action, amount]) => ({action, amount: Number(amount)}),
  )

const updateState = ({h, v, aim}) => ({action, amount}) => {
  const newAim =
    action === 'down' ? aim + amount :
    action === 'up' ? aim - amount :
    aim

  return ({
    aim: newAim,
    h: action === 'forward' ? h + amount : h,
    v: action === 'forward' ? v + newAim * amount : v,
  })
}

pipe (loadSync('input2.txt')) (
  split ('\n'),
  filter (id),
  map (parseCommand),
  reduce (updateState) ({h: 0, v: 0, aim: 0}),
  ({h, v}) => h * v,
  trace,
)
