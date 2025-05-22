import { Counter } from "./singleton";

describe("[Singleton] Class 선언", () => {
  let counter1: Counter;
  let counter2: Counter;
  beforeAll(() => {
    counter1 = Counter.getInstance();
    counter2 = Counter.getInstance();
  });

  it("같은 인스턴스를 생성합니다", () => {
    expect(counter1).toBe(counter2);
  });

  it("같은 인스턴스 값을 조정합니다", () => {
    counter1.increment();
    counter2.increment();
    expect(counter1.getCount()).toBe(2);
    expect(counter2.getCount()).toBe(2);
  });
});
