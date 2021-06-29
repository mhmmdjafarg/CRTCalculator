import {
  findGCD,
  checkPairwiseCoprime,
  modInverse,
  solveCRT,
} from "./Computation";

test("GCD 1", () => {
  expect(findGCD(5, 3)).toBe(1);
});
test("GCD 2", () => {
  expect(findGCD(5, 0)).toBe(5);
});
test("GCD 3", () => {
  expect(findGCD(0, 5)).toBe(5);
});
test("GCD 4", () => {
  expect(findGCD(8, 40)).toBe(8);
});

const array1 = [
  { remainder: 3, modulo: 5 },
  { remainder: 5, modulo: 7 },
  { remainder: 7, modulo: 11 }
];
const array2 = [
  { remainder: 3, modulo: 5 },
  { remainder: 5, modulo: 15 },
  { remainder: 7, modulo: 10 }
];

test("Pairwise 1", () => {
  expect(checkPairwiseCoprime(array1)).toBe(true);
});
test("Pairwise 2", () => {
  expect(checkPairwiseCoprime(array2)).toBe(false);
});


test("Modinverse 1", () => {
  expect(modInverse(77,5)).toBe(3);
});
test("Modinverse 2", () => {
  expect(modInverse(55,7)).toBe(6);
});
test("Modinverse 3", () => {
  expect(modInverse(4,9)).toBe(7);
});
test("Modinverse 4", () => {
  expect(modInverse(17,7)).toBe(5);
});

test("Solve CRT 1", () => {
  expect(solveCRT(array1)).toStrictEqual(
    {
      remainders: [3,5,7],
      modulos: [5,7,11],
      m: 385,
      x: 3813,
      MData: [77,55,35],
      yData: [3,6,6],
    }
  );
});

test("Solve CRT 2", () => {
  expect(solveCRT(array2)).toBe(null);
});
