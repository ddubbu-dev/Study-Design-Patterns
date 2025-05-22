import { counter } from "./singleton";
import { increaseInOtherFile } from "./singleton-run-2";

// TEST! 같은 object를 공유함을 확인합니다
function runTests() {
  console.log(counter.getCount() == 0);
  counter.increment();
  increaseInOtherFile();
  console.log(counter.getCount() == 2);
}

runTests();
