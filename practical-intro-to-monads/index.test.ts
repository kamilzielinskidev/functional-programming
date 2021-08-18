import { getPercentRatio } from ".";

test("percent radio of 1 from 1 and 1 sum to be 50%", () => {
  expect(getPercentRatio(1, 1).emit()).toBe("50%");
});

test("percent radio of 10 from 10 and 20 sum to be 67%", () => {
  expect(getPercentRatio(10, 20).emit()).toBe("67%");
});
