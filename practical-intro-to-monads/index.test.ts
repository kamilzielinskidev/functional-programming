import {
  filterUserIfKamil,
  getPercentRatio,
  getUserID,
  getUserOrElse,
  User,
} from ".";
import { Maybe } from "../Monads/Maybe";

test("percent radio of 1 from 1 and 1 sum to be 50%", () => {
  expect(getPercentRatio(1, 1).emit()).toBe("50%");
});

test("percent radio of 10 from 10 and 20 sum to be 67%", () => {
  expect(getPercentRatio(10, 20).emit()).toBe("67%");
});

describe("fetch proper user", () => {
  const user: User = { id: "3asd4asd", name: "Kamil" };
  const maybeUser = getUserOrElse(Maybe(user));

  describe("pluck id should, emit it", () => {
    const maybeUserId = getUserID(maybeUser).emit();

    test("should return 3asd4asd", () => {
      expect(maybeUserId).toBe("3asd4asd");
    });
  });

  describe("filter by name Kamil, emit it", () => {
    const maybeUserFiltered = filterUserIfKamil(maybeUser).emit();

    test("should return the user", () => {
      expect(maybeUserFiltered).toEqual(user);
    });
  });
});

describe("fetch null user", () => {
  const maybeUser = Maybe(null);

  describe("pluck id should, emit it", () => {
    const maybeUserId = getUserID(maybeUser).emit();

    test("should return 3asd4asd", () => {
      expect(maybeUserId).toBe(null);
    });
  });

  describe("filter by name Kamil, emit it", () => {
    const maybeUserFiltered = filterUserIfKamil(maybeUser).emit();

    test("should return null", () => {
      expect(maybeUserFiltered).toBe(null);
    });
  });

  describe("wrap with else user, pluck id, emit it", () => {
    const elseUserID = getUserOrElse(maybeUser)
      .map(({ id }) => id)
      .emit();

    test("should return ", () => {
      expect(elseUserID).toBe("elseID");
    });
  });
});
