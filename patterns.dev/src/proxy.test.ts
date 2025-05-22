import { personProxy } from "./proxy";

describe("[Proxy]", () => {
  it("getter: 로깅, 포매팅", () => {
    expect(personProxy.age).toBe(`16살`);
  });

  it("setter: 유효성 검사", () => {
    expect(() => {
      personProxy.age = 20;
    }).not.toThrow();

    expect(() => {
      // @ts-expect-error
      personProxy.age = "스무살";
    }).toThrow();
  });
});
