import { EmitT, TagT } from "./commonT";

type Maybe<Value> = TagT &
  EmitT<Value> & {
    map: <Result>(fn: (x: Value) => Result) => Maybe<Result>;
    chain: <Result>(fn: (x: Value) => Result) => Result;
    filter: (fn: (x: Value) => boolean) => Maybe<Value>;
    orElse: <ElseVal>(val: ElseVal) => Maybe<Value> | Maybe<ElseVal>;
  };

export type MaybeM = <Value>(val: Value) => Maybe<Value>;
