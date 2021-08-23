import { EmitT, TagT } from "./commonT";

export type RightT<Value> = TagT &
  EmitT<Value> & {
    map: <Result>(fn: (x: Value) => Result) => RightT<Result>;
    chain: <Result>(fn: (x: Value) => Result) => Result;
  };

export type RightM = <Value>(val: Value) => RightT<Value>;

export type LeftT<ErrorT extends Error> = TagT &
  EmitT<ErrorT> & {
    map: () => LeftT<ErrorT>;
    chain: () => LeftT<ErrorT>;
  };

export type LeftM = <ErrorT extends Error>(val: ErrorT) => LeftT<ErrorT>;

export type EitherT<ErrorT extends Error, Value> =
  | LeftT<ErrorT>
  | RightT<Value>;

// export type EitherT<ErrorT extends Error, Value> = TagT &
//   EmitT<{ right: Value; left: ErrorT }> & {
//     map: (
//       fn: (x: Value) => RightT<Value> | LeftT<ErrorT>
//     ) => RightT<Value> | LeftT<ErrorT>;
//   };

// export type EitherM = <ErrorT extends Error, Value>(
//   err: ErrorT,
//   val: Value
// ) => EitherT<ErrorT, Value>;
