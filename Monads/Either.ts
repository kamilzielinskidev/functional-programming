import { EitherT, LeftM, RightM } from "./EitherT";

export const Right: RightM = val => ({
  tag: "Right",
  emit: () => val,
  map: fn => Right(fn(val)),
  chain: fn => fn(val),
});

export const Left: LeftM = val => ({
  tag: "Left",
  emit: () => val,
  map: () => Left(val),
  chain: () => Left(val),
});

// TODO: dobrze zrobione typowanie, zrobić podobnie w Maybe
const parseJSON = <Value>(json: string): EitherT<Error, Value> => {
  try {
    return Right(<Value>JSON.parse(json));
  } catch (e) {
    return Left(e);
  }
};

const json = `
{
    "title": "Some string title",
    "desc": "Some description"
}`;

const eitherData = parseJSON<{ title: string; desc: string }>(json)
  .chain(data =>
    data ? Right(data) : Left(new Error("Parsed data is empty."))
  )
  .chain(data =>
    data.title ? Right(data.title) : Left(new Error("No title available"))
  )
  .emit();
