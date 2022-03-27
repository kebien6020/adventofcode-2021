import fs from 'fs'

export const zipWith = fn => a => b => {
  const res = []
  for (let i = 0; i < a.length && i < b.length; ++i) {
    res.push(fn (a[i]) (b[i]))
  }
  return res
}

export const loadSync = name => fs.readFileSync(name, {encoding: 'utf8'})

export const pipe = x => (...fns) => fns.reduce((a, fn) => fn(a), x)

export const trace = x => (console.log(x), x)
export const traceMsg = fn => x => (console.log(fn (x)), x)

export const flip = fn => a => b => fn (b) (a)
export const filter = fn => x => x.filter(fn)
export const id = x => x
export const len = x => x.length
export const lt = a => b => a < b
export const slice = n => a => a.slice(n)
export const take = n => a => a.slice(0, n)
export const add = a => b => a + b
export const sub = a => b => a - b
export const inc = add (1)
export const dec = add (-1)
export const window = n => a => {
  const res = []
  for (let i = 0; i + n <= len (a); ++i) {
    res.push(a.slice(i, i + n))
  }
  return res
}

export const map = fn => a => a.map(fn)
export const reduce = fn => x => a => a.reduce((a, b) => fn (a) (b), x)
export const reduce1 = fn => a => a.reduce((a, b) => fn (a) (b))
export const sum = reduce (add) (0)
export const split = sep => s => s.split(sep)
export const iota = n => [...Array(n)].map((_, i) => i)
export const pair = a => b => [a, b]
export const zip = zipWith (pair)
export const enumerate = x => zip (iota (len (x))) (x)
export const flat = x => x.flat(1)
export const occurrences = reduce (o => v => ({...o, [v]: (o[v] ?? 0) + 1})) ({})
export const compose = (...fns) => x => pipe (x) (...fns)
export const join = sep => x => x.join(sep)
export const replicate = n => x => [...Array(n)].map(_ => x)
export const transpose = x => {
  const res = []
  for (let i = 0; i < x.length; ++i) {
    const row = x[i]
    for (let j = 0; j < row.length; ++j) {
      const item = row[j]
      res[j] ??= []
      res[j].push(item)
    }
  }
  return res
}

export const fork = l => r => merge => x => merge (l (x)) (r (x))

export const index = idx => x => x[idx]
export const indexOn = flip (index)
export const fst = index (0)
export const snd = index (1)
export const last = fork (compose (len, add (-1))) (id) (index)

export const eq = a => b => a === b
export const countBy = fn => compose (filter (fn), len)
export const count = x => countBy (eq (x))

export const and = a => b => a && b
export const or = a => b => a || b

export const all = reduce (and) (true)
export const any = reduce (or) (false)

export const lines = compose(split ('\n'), filter(Boolean))
export const range = step => from => to => {
  const res = []
  for (let i = from; step >= 0 ? i <= to : i >= to; i += step) res.push(i)
  return res
}

export const rangeA = from => to =>
  from < to ? range (1) (from) (to) : range (-1) (from) (to)
export const const_ = x => _ => x

export const abs = Math.abs
export const min = a => b => Math.min(a, b)
export const max = a => b => Math.max(a, b)
export const minimumBy = f => reduce1 (a => b => f (a) < f (b) ? a : b)
export const maximumBy = f => reduce1 (a => b => f (a) > f (b) ? a : b)
export const minimum = minimumBy (id)
export const maximum = maximumBy (id)
export const flatMap = fn => arr => arr.flatMap(fn)
export const trim = s => s.trim()

export const unique = x => [...new Set(x)]
export const find = fn => x => x.find(fn)
export const sort = cmp => x => x.sort(cmp)
export const includedIn = arr => x => arr.includes(x)
export const not = x => !x

export const upper = s => s.toUpperCase()
export const lower = s => s.toLowerCase()
export const default_ = def => x => x ?? def
export const concat = x => y => [...x, ...y]
export const reverse = x => [...x].reverse()

export const {reduced, reduceBail} = (() => {
  const sym = Symbol('reduced')

  const reduced = x => ({val: x, [sym]: true})

  const reduceBail = fn => ini => arr => {
    let acc = ini
    for (const x of arr) {
      acc = fn(acc) (x)
      if (acc?.[sym]) return acc.val
    }
    return acc
  }

  return {reduced, reduceBail}
})()
