import { LambaFn } from "./common";

export type Identity<Value> = {
  emit: () => Value;
  map: <Result>(fn: LambaFn<Value, Result>) => Identity<Result>;
  chain: <Result>(fn: LambaFn<Value, Result>) => Result;
};

type IdentityM = <Value>(val: Value) => Identity<Value>;

export const Identity: IdentityM = (val) => ({
  emit: () => val,
  map: (fn) => Identity(fn(val)),
  chain: (fn) => fn(val),
});
