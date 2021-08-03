import { LambaFn } from "./common";

type Identity<T> = {
  emit: () => T;
  map: <R>(fn: LambaFn<T, R>) => Identity<R>;
  chain: <R>(fn: LambaFn<T, R>) => R;
};

type IdentityM = <T>(x: T) => Identity<T>;

const Identity: IdentityM = (x) => ({
  emit: () => x,
  map: (fn) => Identity(fn(x)),
  chain: (fn) => fn(x),
});
