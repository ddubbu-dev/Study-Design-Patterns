## 자료

https://patterns-dev-kr.github.io/design-patterns/singleton-pattern/

## 테스트 방법

```bash
$ pnpm i
$ pnpm test  // 테스트 실행
$ pnpm ts-node -- {file_name}  // 파일 실행
```

## 시행착오

### Singleton 패턴

---

UseCase: Global Access Point

### Singleton - Class 방식

[초기화 유의] : RangeError: Maximum call stack size exceeded

- (핵심) static keyword 내부에서 this는 class property.
  - js엔진은 파싱 단계에서 static 블록을 먼저 실행
  - 불필요하게 메모리 점유될 수 있음
- constructor에서 원시값(null 포함)을 반환하면 this가 반환된다
- constructor 내부에서 new keyword 무한 재귀 발생

### Singleton - object literal 방식

```bash
$ pnpm ts-node -- src/singleton-run-1
```

### Proxy

---

- UseCase: 기본 동작을 유지한채 기능 추가 (로깅, 포매팅, 유효성 검사)
- Q. Reflect 객체는 자주 사용하게 될까?

### Provider 패턴 (React useContext)

---

- UseCase: 전역 데이터 공유 (e.g. UI 테마 공유) / (props-drilling 해결)
- 단점: Context 참조하는 모든 컴포넌트 리렌더링

### Prototype 패턴

---

- UseCase: 다른 객체의 프로퍼티를 상속, 프로토타입 체인을 통해 메서드 중복을 줄임

### Container/Presentation 패턴

---

- UseCase: 비즈니스 로직&뷰 분리
- Code Example: 1. Container/Presentation

```js
import React from "react";
import DogImages from "./DogImages";

// Container: 비즈니스 로직
export default class DogImagesContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      dogs: [],
    };
  }

  componentDidMount() {
    fetch("https://dog.ceo/api/breed/labrador/images/random/6")
      .then((res) => res.json())
      .then(({ message }) => this.setState({ dogs: message }));
  }

  render() {
    // DogImages: 뷰 로직
    return <DogImages dogs={this.state.dogs} />;
  }
}
```

- Code Example: Custom Hook

```js
export default function useDogImages() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breed/labrador/images/random/6")
      .then((res) => res.json())
      .then(({ message }) => setDogs(message));
  }, []);

  return dogs;
}
```

### Observer 패턴

---

- UseCase: 이벤트 발생시 Multi-Action 트리거 (로깅, 토스트 메시지)
- 라이브러리 예시: RxJS
- 실행방법

```bash
$ cd patterns.dev/src/observable
$ npx serve  # open localhost:3000
```

### Mediator (Middleware) 패턴

---

- UseCase: 다대다 관계를 단순하게
- 라이브러리 예시: express middleware

### HOC (Higher-Order Component) 패턴

---

- vs Hooks
- 단점: 컴포넌트 트리가 깊어짐, props 이름 중복 가능성
- UseCase: 접근성 체크 등 공통 로직 분리에 유리했지

### Rendor Props 패턴

---

- UseCase: 공통 상태에 대한 재사용성 증가
- Code Example
  - Q. 여러 디자인시스템 레퍼런스에서 다음과 같은 구조를 갖는 이유려나?

```js
function Input(props) {
  const [value, setValue] = useState("");

  return (
    <>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      {props.render(value)}
    </>
  );
}

export default function App() {
  return (
    <Input>
      {(value) => (
        <>
          <Kelvin value={value} />
          <Fahrenheit value={value} />
        </>
      )}
    </Input>
  );
}
```

- vs 공통 상태 끌어올리기: 직관적이지만, 컴포넌트간 결합도가 높아짐

```js
function App() {
  const [value, setValue] = useState("");

  return (
    <>
      <Input value={value} onChange={setValue} />
      <Kelvin value={value} />
      <Fahrenheit value={value} />
    </>
  );
}
```

### Flyweight 패턴

---

- UseCase: 공통 속성은 공유

### Factory 패턴 w. 함수

---

- Code Example

```js
const createUser = ({ firstName, lastName, email }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
});

const user1 = new User({
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com",
});
```

### Compound 패턴

---

- UseCase: 컴포넌트 라이브러리 만들 때
- Code Example

```js
import React from "react";
import { FlyOut } from "./FlyOut";

export default function FlyoutMenu() {
  // 각 Sub Componnet 들은 공통 Context를 참조해 props drilling 피함
  return (
    <FlyOut>
      <FlyOut.Toggle />
      <FlyOut.List>
        <FlyOut.Item>Edit</FlyOut.Item>
        <FlyOut.Item>Delete</FlyOut.Item>
      </FlyOut.List>
    </FlyOut>
  );
}
```

- useContext 대신 props 주입하기 (WARN! 정해진 형식대로 사용해야함)

```js
export function FlyOut(props) {
  const [open, toggle] = React.useState(false);

  return (
    <div>
      {React.Children.map(props.children, (child) =>
        React.cloneElement(child, { open, toggle })
      )}
    </div>
  );
}
```

### Command 패턴

---

- 객체와 메서드 분리

## 자료

https://refactoring.guru/ko/design-patterns/catalog

### Builder 패턴

- Q. SwiftUI 처럼 React에서는 해당 패턴을 사용할 수 없을까?
- A. React props 기반이므로 오버 엔지니어링, 혹 class 정의.. 굳이?

```swift
// CustomPopupViewController.swift

var contentBackgroundColor: UIColor? {
    get { containerView.backgroundColor }
    set { containerView.backgroundColor = newValue }
}
```
