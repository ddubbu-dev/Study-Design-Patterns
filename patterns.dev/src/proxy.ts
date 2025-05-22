const person = {
  name: "ddubbu",
  age: 16,
  nation: "kr",
};

const formatter = {
  name: (val) => val,
  age: (val: number) => `${val}살`,
  nation: (val) => val,
};

export const personProxy = new Proxy(person, {
  get(obj, prop, receiver) {
    console.info(`person[${String(prop)}] 값에 접근합니다...`);
    const value = Reflect.get(obj, prop, receiver);
    return formatter[prop](value);
  },
  set(obj, prop, value, receiver) {
    if (prop === "age" && typeof value != "number") {
      throw Error("숫자로 입력해주세요");
    }

    return Reflect.set(obj, prop, value, receiver);
  },
});
