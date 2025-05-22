export class Dog {
  name: string;
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `멍!`;
  }
}

const dog1 = new Dog("Daisy");
const dog2 = new Dog("Max");
const dog3 = new Dog("Spot");
