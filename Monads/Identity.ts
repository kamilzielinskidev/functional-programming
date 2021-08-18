import { IdentityM } from "./IdentityT";

export const Identity: IdentityM = val => ({
  tag: "Identity",
  emit: () => val,
  map: fn => Identity(fn(val)),
  chain: fn => fn(val),
});
