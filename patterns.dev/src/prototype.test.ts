import { Dog } from "./prototype";

describe("[Prototype]", () => {
  let dog1: Dog;
  let dog2: Dog;
  beforeAll(() => {
    dog1 = new Dog("웰시코기");
    dog2 = new Dog("치와와");
  });
  it("prototype 확장", () => {
    // @ts-expect-error
    Dog.prototype.play = () => console.log("놀이중...");

    expect(() => {
      // @ts-expect-error
      dog1.play();
    }).not.toThrow();
  });
});
