import { Identity } from "./Identity";

const plus2 = (x: number) => x + 2;

const identityProperties = ["tag", "emit", "map", "chain"];

describe("create the Identity monad", () => {
  const identity = Identity(1);

  test(`create object with ${identityProperties.join(", ")} properties`, () => {
    for (const property of identityProperties) {
      expect(identity).toHaveProperty(property);
    }
  });

  test('has tag property "Identity"', () => {
    expect(identity.tag).toBe("Identity");
  });

  test("emit method should return value", () => {
    expect(identity.emit()).toBe(1);
  });

  // TODO: improve these tests adding describe section
  test("map method should return another Identity with mapped value", () => {
    const identityPlus2 = identity.map(plus2);
    expect(identityPlus2.tag).toBe("Identity");
    expect(identityPlus2.emit()).toBe(3);
  });

  test("chain method should return another mapped value", () => {
    const identityPlus2 = identity.chain(plus2);
    expect(identityPlus2).toBe(3);
  });
});
