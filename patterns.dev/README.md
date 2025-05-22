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
