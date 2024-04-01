import {describe, expect, test} from '@jest/globals';
import {StringUtils} from "../main";

describe("StringUtils module", () => {

  const blankVal = "",
    stringOfLen = "string_len=13",
    low_cased = "aha",
    capitalized = "Aha";

  test("isBlank `null`", () => {
    expect(StringUtils.isBlank(null)).toBe(true);
  });

  test(`isBlank "${blankVal}"`, () => {
    expect(StringUtils.isBlank(blankVal)).toBe(true);
  });

  test(`isBlank '${stringOfLen}'`, () => {
    expect(StringUtils.isBlank(stringOfLen)).toBe(false);
  });

  test(`isNotBlank '${stringOfLen}'`, () => {
    expect(StringUtils.isNotBlank(stringOfLen)).toBe(true);
  });

  test("isNotNull `null`", () => {
    expect(StringUtils.isNotNull(null)).toBe(false);
  });

  test(`capitalize: '${low_cased}' => '${capitalized}'`, () => {
    expect(StringUtils.capitalize(low_cased)).toBe(capitalized);
  });

  test(`equals_ignore_case ' '${low_cased}' -eqi '${capitalized}'`, () => {
    expect(StringUtils.equals_ignore_case(low_cased, capitalized)).toBe(true);
  });


  // snake2Camel = (str: string)
  // renderTemplateString = (template: string, values: Record<string, string>): string
  // readFileToString(filePath: string): Promise<string>
  // renderTemplate = (path: string, values: Record<string, string>): Promise<string>
  // saveStringToFile(output: string, filePath: string): Promise<boolean>
  // render = (templatePath: string, destPath: string, values: Record<string, string>): Promise<boolean>

});