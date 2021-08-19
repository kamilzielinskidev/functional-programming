import { EmitT, TagT } from "./commonT";

type Identity<Value> = TagT &
  EmitT<Value> & {
    map: <Result>(fn: (x: Value) => Result) => Identity<Result>;
    chain: <Result>(fn: (x: Value) => Result) => Result;
  };

export type IdentityM = <Value>(val: Value) => Identity<Value>;
