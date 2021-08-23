import { MaybeM } from "./MaybeT";

const isNullable = <Value>(val: Value) => val === undefined || val === null;

export const Maybe: MaybeM = val => ({
  tag: "Maybe",
  emit: () => val,
  map: fn => (isNullable(val) ? Maybe(null) : Maybe(fn(val))),
  chain: fn => (isNullable(val) ? null : fn(val)),
  filter: predicate =>
    isNullable(val) || !predicate(val) ? Maybe(null) : Maybe(val),
  orElse: elseVal => (isNullable(val) ? Maybe(elseVal) : Maybe(val)),
  cata: (noneFn, someFn) =>
    isNullable(val) ? Maybe(noneFn()) : Maybe(someFn(val)),
});
