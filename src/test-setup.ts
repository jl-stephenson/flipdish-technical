import { expect } from "vitest";
import "@testing-library/jest-dom";

expect.extend({
  toBeStringOrNull(received: unknown) {
    const pass = received === null || typeof received === "string";
    return {
      pass,
      message: () =>
        `Expected ${received} to be string or null, got ${typeof received}`,
    };
  },
});

interface CustomMatchers<R = unknown> {
  toBeStringOrNull: () => R;
}

declare module "vitest" {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
