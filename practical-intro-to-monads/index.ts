import { Identity } from "../Monads/Identity";
import { Maybe } from "../Monads/Maybe";
import { MaybeT } from "../Monads/MaybeT";

// IDENTITY
// this is a copy paste from the tutorial
export const getPercentRatio = (wrongCount: number, correctCount: number) =>
  Identity(wrongCount)
    .map(wrong => wrong + correctCount)
    .map(total => correctCount / total)
    .map(ratio => Math.round(100 * ratio))
    .map(v => `${v}%`);

export type User = { id: string; name: string };

// MAYBE
// this is wrapped in function maybe example from tutorial
export const getUserID = (user: MaybeT<User>) => user.map(({ id }) => id);

export const filterUserIfKamil = (user: MaybeT<User>) =>
  user.filter(({ name }) => name === "Kamil");

export const getUserOrElse = (user: MaybeT<User>) =>
  user.orElse({ id: "elseID", name: "elseName" });

export const getGreeting = (nameOption: MaybeT<string>) =>
  nameOption.cata(
    () => "Hi Guest!",
    name => "Welcome back " + name + "!"
  );
