## 자료

https://patterns-dev-kr.github.io/design-patterns/singleton-pattern/

## 테스트 방법

```bash
$ pnpm i
$ pnpm test  // 테스트 실행
$ pnpm ts-node -- {file_name}  // 파일 실행
```

## 시행착오

### Singleton

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
