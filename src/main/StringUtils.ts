"use strict";
import * as fs from 'fs';

export class StringUtils {

  static isBlank = (val: any): boolean => [val].filter(StringUtils.isNotNull)
    .map(it => (it + "").trim())
    .map(it => it.length < 1)
    .pop() ?? true;

  static isNotBlank = (val: string): boolean => !StringUtils.isBlank(val)

  static isNotNull = (val: any): boolean => val != null
  static capitalize = (str: string): string => str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();

  static equals_ignore_case = (a: string, b: string) => a.toUpperCase() == b.toUpperCase()

  static snake2Camel = (str: string) => str.split("-")
  .reduce((newStr, parts, i) => {
    return newStr + (i > 0) ? parts[i] : StringUtils.capitalize(parts[i])
  }, "")

  static renderTemplateString = (template: string, values: Record<string, string>): string =>
    Object.entries(values)
    .reduce((result, [key, value]) => {
      const regex = new RegExp(`%%${key}%%`, 'g');
      result = result.replace(regex, value);
      return result;
    }, template);

  static readFileToString(filePath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  static renderTemplate = (path: string, values: Record<string, string>): Promise<string> => {
    return StringUtils.readFileToString(path)
      .then(template => StringUtils.renderTemplate(template, values));

  }

  static saveStringToFile(output: string, filePath: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) =>
      fs.writeFile(filePath, output, 'utf8', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      })
    );
  }

  static render = (templatePath: string, destPath: string, values: Record<string, string>): Promise<boolean> => {
    return StringUtils.readFileToString(templatePath)
      .then(template => StringUtils.renderTemplate(template, values))
      .then(output => StringUtils.saveStringToFile(output, destPath));
  }
}

