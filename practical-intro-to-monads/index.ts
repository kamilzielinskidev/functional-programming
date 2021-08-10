import { Identity } from "../common/Identity";
import { Maybe } from "../common/Maybe";

const getPercentRatio = (wrongCount: number, correctCount: number) =>
  Identity(wrongCount)
    .map((wrong) => wrong + correctCount)
    .map((total) => correctCount / total)
    .map((ratio) => Math.round(100 * ratio))
    .map((v) => `${v}%`);

console.log(getPercentRatio(200, 200).emit());

const maybeUser = Maybe({ id: "3asd4asd", name: "James" });
console.log(maybeUser.map((user) => user.id).emit());
console.log(maybeUser.filter((user) => user.name === "John").emit());

const notUser = Maybe(null);
console.log(notUser.map((user) => user.id).emit());
console.log(notUser.filter((user) => user.name === "John").emit());
