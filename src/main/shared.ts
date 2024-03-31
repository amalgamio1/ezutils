"use strict"

import {IValueObject} from "./ValidationUtil";
import {isNotNil} from "ramda";

export const TypeGuard = {
  asNumber(strOrNum: any): number {
    if (isNaN(strOrNum)) throw new TypeError(`isNaN!:'${strOrNum}'`)
    return Number.prototype.isPrototypeOf(strOrNum)
      ? strOrNum
      : Number.parseInt(strOrNum, 10)
  },
  asBool(boolish: any): boolean {
    if (boolish === null || boolish === undefined) return false
    switch (typeof boolish) {
      case 'boolean':
        return boolish
      case 'number':
        return boolish !== 0
      case 'string': {
        let y = parseInt(boolish);

        if (!Number.isNaN(y))
          return y !== 0

        y = ['true', 'false'].indexOf(boolish.toLowerCase().trim())
        if (y > -1)
          return y === 0

        throw new TypeError(`Cannot convert: '${boolish}' to Boolean`)
      }
      default:
        throw new TypeError(`Cannot convert: '${typeof boolish}' to boolean`)
    }
  },
  asFloat(strOrNum: any) {
    return Number.prototype.isPrototypeOf(strOrNum)
      ? strOrNum
      : Number.parseFloat(strOrNum)
  },

  /**
   * Gets object's type via toString prototype
   * @param {any} obj any object or primative
   * @returns {string} the object type (poss capitalized)
   */
  getType(obj: any): string {
    if (obj == null) return "Undefined"
    const rawType = Object.prototype.toString.call(obj);
    if (rawType) {
      const mary = rawType.match(/\[object (\w+)\]/);
      if (mary && mary.length > 0) {return mary[1] }
      else throw  new TypeError("Unable to determine object type. '" + obj + "'")
    }
    // @ts-ignore
    return Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1] || obj.constructor?.name
  },

  /**
   * Check if obj is a ArrayLike or Set
   * @param {any} obj The object being qualified
   * @returns {boolean} True if collection
   */
  isCollection(obj: any): boolean {
    return (
      Array.isArray(obj) ||
      // L.isList(obj) ||
      ['Set', 'List', 'Array', 'array'].includes(TypeGuard.getType(obj))
    )
  }
}

export function enlist(list: any[] | null, ...thing: any[]) {
  if (!list) {
    list = []
  }
  list.push(...thing)
  return list
}

export const perCent = (cents: number): number => cents / 100;

export const dollarAmt = (cents: number): string => '$' + perCent(cents).toFixed(2);

export const div = (enumerator: number, denominator: number) => Math.floor(enumerator/denominator)

export const modIs0 = (enumerator: number, denominator: number) => 0 == enumerator % denominator


/**
 * Creates a hash out of equilateral arrays
 * @param q1 {[]}
 * @param q2 {[]}
 * @returns {object} hash
 */
export const merge = (q1: string[], q2: any[]): IValueObject => q2.reduce((agg, curr, i) => {
  agg[q1[i]] = curr
  return agg
}, {})


/**
 * Crete hash map based on @code(keys) into given {obj}
 * @param obj An object
 * @param keys Array of keys into {obj}
 * @returns {object} new object
 */
export const pickMap = (obj: {[k:string]: any;}, keys: string[]) =>
  keys.reduce((agg, k) => {
    if (isNotNil(obj[k])) {
      agg[k] = obj[k]
    }

    return agg;
  }, {} as {[k:string]: any;})


/**
 * Traverse nested object via dot-notated property key.
 * Eg) 'address.line1'
 *
 * @param propRef
 * @param src
 * @returns
 */
export const popBox = (propRef: string, src: IValueObject): any => {
  let [head, ...parts ] = propRef.split(".")

  let val = undefined;

  if (parts.length) {
    val = popBox(parts.join("."), src[head])
  } else {
    val = src[head]
  }
  return val;
}
