"use strict";

import * as Ramda from "ramda";

type ChainFunction<T, R> = (arg?: T) => any|Promise<any>

export class ExecUtil {
  static runTask = (task: Task): MaybeNothing => Promise.resolve(('then' in task) ? task : task());

   /**
   * Chains I/O between functions, handling both synchronous and asynchronous functions.
   * @param list An array of functions that take a value and return a new value or a promise of a new value.
   * @returns A function that takes an initial value and returns a promise with the final resolved value.
   */
  static chain = <T, R>(list: Array<ChainFunction<any, any>>): (initialValue?: T) => Promise<R> => {
    return (initialValue?: T) => {
      return Ramda.flatten(list).reduce((acc: Promise<any>, fn: ChainFunction<any, any>) => {
        return acc.then(fn);
      }, Promise.resolve(initialValue));
    };
  };

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

