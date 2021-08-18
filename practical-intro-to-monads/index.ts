import { Identity } from "../Monads/Identity";
// import { Maybe } from "../common/Maybe";

// IDENTITY
// this is a copy paste from the tutorial
export const getPercentRatio = (wrongCount: number, correctCount: number) =>
  Identity(wrongCount)
    .map(wrong => wrong + correctCount)
    .map(total => correctCount / total)
    .map(ratio => Math.round(100 * ratio))
    .map(v => `${v}%`);

// TODO:
// MAYBE

// let maybeUser = Some({ id: "3asd4asd", name: "James" });
// maybeUser.map(user => user.id); // => Some("3asd4asd")
// maybeUser.filter(user => user.name === "John"); // => None

// const maybeUser = Maybe({ id: "3asd4asd", name: "James" });
// console.log(maybeUser.map((user) => user.id).emit());
// console.log(maybeUser.filter((user) => user.name === "John").emit());

// const notUser = Maybe(null);
// console.log(notUser.map((user) => user.id).emit());
// console.log(notUser.filter((user) => user.name === "John").emit());
