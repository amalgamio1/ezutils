"use strict";

import * as Ramda from "ramda";

export default class ExecUtil {
  static runTask = (task: Task): MaybeNothing => Promise.resolve(('then' in task) ? task : task());

  /**
   * Chains I/O between promises
   * @code(chain(array[(...args) => Promise<R>|any]))
   * @param {Array<function|Promise>} list An array of Promises or functions that Promises
   * @returns {any} the final resolved promise
   */
  static chain = (...list: any | any[]) => (acc?: any) => Ramda.flatten(list)
  .reduce((acc: any, fn: (iarg?: any) => any|Promise<any>) => acc.then(fn), Promise.resolve(acc))
  // static chain = (...list) => (acc?) => list.reduce((agg,fn) => agg.then(fn), Promise.resolve(acc))

  /**
   * Process Promises sequentially.
   * Ex:

   serial([
   () => Promise.resolve("It"),
   () => "has to",
   Promise.resolve("work"),
   ])
   *
   * @code(serial(array[() => Promise<O>]))
   * @param {Array<function<T,Promise>>} funcs An array of functions that return Promises|any
   * @returns {Promise} an array of resolved promises
   */
  static serial = (tasks: Array<Task>) => tasks.reduce(
    (promiseHandle, task) => ExecUtil.runTask(promiseHandle).then(() => ExecUtil.runTask(task)),
    Promise.resolve(null)
  );

  /**
   * Run a task and return input arg.
   * @param fn
   */
  static asIdentity<U>(fn: (x:U) => any): (x:U) => U {
    return (args: U) => {
      fn(args)
      return args
    }
  }

}
export type MaybeNothing = any | void | Promise<any> | Promise<void>
export type Task = (() => Promise<MaybeNothing>) | Promise<MaybeNothing> | (() => MaybeNothing)

