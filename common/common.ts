export type LambaFn<Value, Result> = (x: Value) => Result;
export type PredicateFn<Value> = LambaFn<Value, boolean>;
