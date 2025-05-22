import { counter } from "./singleton";

export function increaseInOtherFile() {
  counter.increment();
}
