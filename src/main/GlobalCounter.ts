class GlobalCounter {
  private static instance: GlobalCounter;

  private sequencer;

  private *idMaker(): Generator<number> {
    let index = 0;
    while (true) {
      yield index++;
    }
  }
  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.sequencer = this.idMaker()
  }

  /**
   * Access the singleton instance.
   */
  public static getInstance(): GlobalCounter {
    if (!GlobalCounter.instance) {
      GlobalCounter.instance = new GlobalCounter();
    }
    return GlobalCounter.instance;
  }

  public next() {
    return this.sequencer.next().value;
  }
}

export { GlobalCounter }
export const sequence = GlobalCounter.getInstance()

