import { LambaFn } from "../common/common";

const List = <T>(x: T[]) => ({
  emit: () => x,
  map: <R>(fn: LambaFn<T, R>) => List(x.map((y) => fn(y))),
  chain: <R>(fn: LambaFn<T[], R>) => fn(x),
  concat: (arr: T | T[]) => List(x.concat(arr)),
  head: () => (x.length > 0 ? x[0] : List([] as T[])),
  tail: () => (x.length > 0 ? List(x.slice(1)) : List([] as T[])),
});

const Maybe = <T>(x: T) => ({
  emit: () => x,
  map: <R>(fn: LambaFn<T, R>) =>
    x === null || x === undefined ? Maybe(x) : Maybe(fn(x)),
  chain: <R>(fn: LambaFn<T, R>) => (x === null || x === undefined ? x : fn(x)),
  fork: <R, U>(errFn: LambaFn<T, R>, passFn: LambaFn<T, U>) =>
    x === null || x === undefined ? errFn(x) : passFn(x),
});
