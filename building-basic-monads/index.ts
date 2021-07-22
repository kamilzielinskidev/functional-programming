type LambdaFn<T, R> = (...x: T[]) => R;

const Identity = <T>(x: T) => ({
  emit: () => x,
  map: <R>(fn: LambdaFn<T, R>) => Identity(fn(x)),
  chain: <R>(fn: LambdaFn<T, R>) => fn(x),
});

const List = <T>(x: T[]) => ({
  emit: () => x,
  map: <R>(fn: LambdaFn<T, R>) => List(x.map((y) => fn(y))),
  chain: <R>(fn: LambdaFn<T[], R>) => fn(x),
  concat: (arr: T | T[]) => List(x.concat(arr)),
  head: () => (x.length > 0 ? List([x[0]]) : List([] as T[])),
  tail: () => (x.length > 0 ? List(x.slice(1)) : List([] as T[])),
});
