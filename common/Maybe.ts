import { LambaFn, PredicateFn } from "./common";

type None = {
  emit: () => null;
  map: <Result>(fn: LambaFn<null, Result>) => None;
  chain: <Result>(fn: LambaFn<null, Result>) => null;
  filter: <Value>(fn: PredicateFn<Value>) => None;
  orElse: <Value>(val: Value) => Maybe<Value>;
};

// type Some<Value> = {
//   emit: () => Value;
//   map: <Result>(fn: LambaFn<Value, Result>) => Maybe<Result>;
//   chain: <Result>(fn: LambaFn<Value, Result>) => Result;
//   filter: (fn: PredicateFn<Value>) => None | Some<Value>;
// };

type Maybe<Value> = {
  emit: () => Value;
  map: <Result>(fn: LambaFn<Value, Result>) => None | Maybe<Result>;
  chain: <Result>(fn: LambaFn<Value, Result>) => Result;
  filter: (fn: PredicateFn<Value>) => None | Maybe<Value>;
  orElse: <ElseValue>(val: ElseValue) => Maybe<Value> | Maybe<ElseValue>;
};

// type SomeM = <Value>(val: Value) => Some<Value>;

type MaybeM = <Value>(val: Value) => Maybe<Value>;

export const None: None = {
  emit: () => null,
  map: (_) => None,
  chain: (_) => null,
  filter: (_) => None,
  orElse: (val) => Maybe(val),
};

// const Some: SomeM = (val) => ({
//   emit: () => val,
//   map: (fn) => Maybe(fn(val)),
//   chain: (fn) => fn(val),
//   filter: (predicate) => (!predicate(val) ? None : Some(val)),
//   orElse: (_) => val,
// });

export const Maybe: MaybeM = (val) => ({
  emit: () => val,
  map: (fn) => (val === null || val === undefined ? None : Maybe(fn(val))),
  chain: (fn) => (val === null || val === undefined ? null : fn(val)),
  filter: (predicate) =>
    val === null || val === undefined || !predicate(val) ? None : Maybe(val),
  orElse: (elseVal) =>
    val === null || val === undefined ? Maybe(elseVal) : Maybe(val),
});
