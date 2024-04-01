"use strict";

import {StringUtils} from "./StringUtils";

/**
 * Usage:
 *   const validr = new ValidationUtil(check)
 *   console.log({errors:  validr.validate(values)})
 */
export class ValidationUtil {

  static PHONE_NUMBER_MIN_LENGTH = 8;

  static EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private readonly requiredProps: string[] = [], handler?: (value: IValueObject, target: IValueObject, key: string) => any | void) {
    this.validate = this.validate.bind(this)
    this.qualifier = this.qualifier.bind(this)
    this.handler = this.handler.bind(this)

    if (handler) this.handler = handler

  }

  handler(value: IValueObject, target: IValueObject, key: string) {
    let tmp_bool = isValidType.text(value[key])
    if (! tmp_bool.pass) target[key] = tmp_bool.cause || 'Required'
  }

  // static notBlankCheck = (valObj, target, key) => {
  //   if (valObj[key] == null || valObj[key].trim().length < 1) {
  //     target[key] = 'Required'
  //   }
  // }
  //
  // setUpHandlers(customHandlers) {
  //   this.handlers = this.requiredProps.reduce((agg, req) => {
  //     agg[req] = ValidationUtil.notBlankCheck
  //     return agg
  //   }, {})
  // }

  validate(values: IValueObject): object {
    const raise1 = this.requiredProps.map((key, x) => key.split(/\./))
    const raise2 = raise1.reduce(
      (agg, keyary, index1) => this.qualifier(values, this.requiredProps[index1])(agg, keyary, index1),
      {}
    )
    return raise2
  }

  private qualifier(valueTree: IValueObject, nestkey?: string) {

    const _self = this

    return function remap(agg: IValueObject, keyAry: string[], index?: number) {
      const nstdObjKname = keyAry[0]
      if (keyAry.length == 1) {
        _self.handler(valueTree, agg, nstdObjKname)
      }
      else {
        if (!agg[nstdObjKname]) {
          if (Array.isArray(valueTree[nstdObjKname])) {
            agg[nstdObjKname] = []
          }
          else agg[nstdObjKname] = {}
        }
        _self.qualifier(valueTree[nstdObjKname], nestkey)(agg[nstdObjKname], keyAry.splice(1), index)
      }
      return agg
    };
  }
}



/**
 * Do nested confirmation that object is empty.
 * True if object is null
 *
 * @param {object} obj
 * @returns {boolean}
 */
function isObjectEmpty(obj?: {[k:string]: any;}): boolean {
  if (!obj) return true

  const copy = Object.entries(obj)
  .filter(([key, val]) => val != null && (typeof obj == "object" || StringUtils.isNotBlank(val)))
  .reduce((acc: IValueObject, [key, val]) => {
    acc[key] = val
    return acc
  }, {})

  if (Object.keys(copy).length == 0) return true

  return Object.keys(obj)
  .reduce((agg, curr) => (typeof obj[curr] == "object"
    ? isObjectEmpty(obj[curr])
    : false) && agg, true)
}

interface ITypeTestResult { cause?: string | null; pass: boolean; }

interface ITypeTest {
  [x:string]: (val: any) => ITypeTestResult
}

const isValidType: ITypeTest = {

  text: (value: string | number) => {
    let state = {
    // @ts-ignore
      cause: null as string,
      pass: !StringUtils.isBlank(value),
    }
    if (!state.pass) {
      state.cause = "A value is required."
    }
    return state
  },

  textarea: (value: string | number) => isValidType.text(value),

  numeric: (value: string | number) => {
    let state = isValidType.text(value)
    if (state.pass) {
      if (! (state.pass = (/^\d+$/).test(String(value)))) {
        state.cause = "Please enter a number."
      }
    }

    return state
  },

  tel:  (value: string | number) => isValidType.phone(value),

  phone: (value: string | number) => {

    const tmp = ("" + value).trim().replace(/^\D+$/g, "");
    const state = isValidType.numeric(tmp)

    if (state.pass) {
      if (! (state.pass = tmp.length >= ValidationUtil.PHONE_NUMBER_MIN_LENGTH)) {
        state.cause = "Incomplete number";
      }
    }
    else {
      state.cause = "A number is required."
    }

    return state;
  },

  email: (value: string) => {
    let state = isValidType.text(value)

    if (state.pass) {
      if (! (state.pass = ValidationUtil.EMAIL_REGEX.test(String(value).toLowerCase())) ) {
        state.cause = "Malformed email";
      }
    }

    return state;
  }
}
type IValueObject = {[k:string]: any;}

export { isValidType, isObjectEmpty }
export type { ITypeTest, IValueObject, ITypeTestResult }


