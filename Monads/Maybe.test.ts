import { Maybe } from "./Maybe";

const doubleString = (x: string) => `${x}${x}`;

const getProp =
  <TargetObj extends Record<PropertyKey, any>>(propName: keyof TargetObj) =>
  (obj: TargetObj) =>
    obj[propName];

const maybeProperties = ["tag", "emit", "map", "chain", "filter", "orElse"];

const maybeMonadValue = { name: "Kamil" };

const orElseValue = { name: "NotKamil" };

describe("create the Maybe monad with value", () => {
  const maybe = Maybe(maybeMonadValue);

  test(`should create object with ${maybeProperties.join(
    ", "
  )} properties`, () => {
    for (const property of maybeProperties) {
      expect(maybe).toHaveProperty(property);
    }
  });

  test('tag property should has assigned "Maybe" value', () => {
    expect(maybe.tag).toBe("Maybe");
  });

  test("emit method should return value", () => {
    expect(maybe.emit()).toEqual(maybeMonadValue);
  });

  describe("get 'name' props, map to double the text, emit it", () => {
    const doubledNameProp = maybe.map(getProp("name")).map(doubleString).emit();

    test(`should return ${doubleString}`, () => {
      expect(doubledNameProp).toBe(doubledNameProp);
    });
  });

  describe("get 'name' props, chain double to double the text", () => {
    const doubledNameProp = maybe.map(getProp("name")).chain(doubleString);

    test(`should return ${doubleString}`, () => {
      expect(doubledNameProp).toBe(doubledNameProp);
    });
  });

  describe("filter with positive predicate, emit it", () => {
    const positiveFilteredValue = maybe.filter(x => x.name === "Kamil").emit();

    test("should return Maybe monad with the same value", () => {
      expect(positiveFilteredValue).toEqual(maybeMonadValue);
    });
  });

  describe("filter with negative predicate, emit it", () => {
    const negativeFilteredValue = maybe
      .filter(({ name }) => name === "NotKamil")
      .emit();

    test("should return Monad with null value", () => {
      expect(negativeFilteredValue).toEqual(null);
    });
  });

  describe("use orElse with other value, emit it", () => {
    const sameValue = maybe.orElse(orElseValue).emit();

    test("should return the same value", () => {
      expect(sameValue).toEqual(maybeMonadValue);
    });
  });

  describe("map value to null, use orElse with other value, emit it", () => {
    const nullOrElsedValue = maybe
      .map(_ => null)
      .orElse(orElseValue)
      .emit();

    test("should return the else value", () => {
      expect(nullOrElsedValue).toEqual(orElseValue);
    });
  });
});
