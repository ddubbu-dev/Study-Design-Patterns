class Counter {
  static instance: Counter | null = null;
  #count = 0;

  static {
    this.instance = new Counter();
  }
  constructor() {
    // 첫번째 호출 시 원시값(null)이라, this 반환
    // 두번째 호출 시 객체 명시되어 유효한 값 반환
    return Counter.instance;
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

const counter1 = new Counter();
const counter2 = new Counter();
console.log("counter1", counter1);
console.log(counter1 == counter2);
