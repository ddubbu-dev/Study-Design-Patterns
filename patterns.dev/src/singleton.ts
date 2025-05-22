export class Counter {
  static #instance: Counter | null = null;
  #count = 0;

  // WARN! 무한 재귀 발생
  //   constructor() {
  //     if (!Counter.#instance) {
  //       Counter.#instance = new Counter();
  //     }
  //     return Counter.#instance;
  //   }

  private constructor() {}

  // NOTE! new keyword가 아닌 getInstance 사용 유도
  static getInstance() {
    if (!Counter.#instance) {
      Counter.#instance = new Counter();
    }
    return Counter.#instance;
  }

  getCount() {
    return this.#count;
  }

  increment() {
    return ++this.#count;
  }

  decrement() {
    return --this.#count;
  }
}
