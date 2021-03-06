import { EmitT, TagT } from "./commonT";

export type MaybeT<Value> = TagT &
  EmitT<Value> & {
    map: <Result>(fn: (x: Value) => Result) => MaybeT<Result>;
    chain: <Result>(fn: (x: Value) => Result) => Result;
    filter: (fn: (x: Value) => boolean) => MaybeT<Value>;
    orElse: (val: Value) => MaybeT<Value>;
    cata: <Result>(
      noneCallback: () => Result,
      someCallback: (x: Value) => Result
    ) => MaybeT<Result>;
  };

export type MaybeM = <Value>(val: Value) => MaybeT<Value>;
