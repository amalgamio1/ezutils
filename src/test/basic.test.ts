import { add } from "../main";
import {describe, expect, test} from '@jest/globals';

describe("add module", () => {
  test("adds 2 + 2 to equal 4", () => {
    expect(add(2, 2)).toBe(4);
  });
});