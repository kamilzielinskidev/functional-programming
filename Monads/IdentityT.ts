type Identity<Value> = {
  tag: "Identity";
  emit: () => Value;
  map: <Result>(fn: (x: Value) => Result) => Identity<Result>;
  chain: <Result>(fn: (x: Value) => Result) => Result;
};

export type IdentityM = <Value>(val: Value) => Identity<Value>;
