import {describe, expect, test} from '@jest/globals';
import {StringUtils} from "../main";

describe("StringUtils module", () => {

  const blankVal = "",
    stringOfLen = "string_len=13",
    low_cased = "aha",
    capitalized = "Aha";

  const policyEnc = "eyAiZXhwaXJhdGlvbiI6ICIyMDE1LTEyLTMwVDEyOjAwOjAwLjAwMFoiLA0KICAiY29uZGl0aW9ucyI6IFsNCiAgICB7ImJ1Y2tldCI6ICJzaWd2NGV4YW1wbGVidWNrZXQifSwNCiAgICBbInN0YXJ0cy13aXRoIiwgIiRrZXkiLCAidXNlci91c2VyMS8iXSwNCiAgICB7ImFjbCI6ICJwdWJsaWMtcmVhZCJ9LA0KICAgIHsic3VjY2Vzc19hY3Rpb25fcmVkaXJlY3QiOiAiaHR0cDovL3NpZ3Y0ZXhhbXBsZWJ1Y2tldC5zMy5hbWF6b25hd3MuY29tL3N1Y2Nlc3NmdWxfdXBsb2FkLmh0bWwifSwNCiAgICBbInN0YXJ0cy13aXRoIiwgIiRDb250ZW50LVR5cGUiLCAiaW1hZ2UvIl0sDQogICAgeyJ4LWFtei1tZXRhLXV1aWQiOiAiMTQzNjUxMjM2NTEyNzQifSwNCiAgICB7IngtYW16LXNlcnZlci1zaWRlLWVuY3J5cHRpb24iOiAiQUVTMjU2In0sDQogICAgWyJzdGFydHMtd2l0aCIsICIkeC1hbXotbWV0YS10YWciLCAiIl0sDQoNCiAgICB7IngtYW16LWNyZWRlbnRpYWwiOiAiQUtJQUlPU0ZPRE5ON0VYQU1QTEUvMjAxNTEyMjkvdXMtZWFzdC0xL3MzL2F3czRfcmVxdWVzdCJ9LA0KICAgIHsieC1hbXotYWxnb3JpdGhtIjogIkFXUzQtSE1BQy1TSEEyNTYifSwNCiAgICB7IngtYW16LWRhdGUiOiAiMjAxNTEyMjlUMDAwMDAwWiIgfQ0KICBdDQp9"

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
  // saveStringToFile(output: string, filePath: string): Promise<string | boolean>
  // render = (templatePath: string, destPath: string, values: Record<string, string>): Promise<boolean>

});