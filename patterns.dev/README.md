https://patterns-dev-kr.github.io/design-patterns/singleton-pattern/

```bash
$ npm install -g ts-node typescript
$ ts-node {file_name}.ts
```

# 시행착오

### Singleton

[초기화 유의] : RangeError: Maximum call stack size exceeded

- (핵심) static keyword 내부에서 this는 class property.
  - js엔진은 파싱 단계에서 static 블록을 먼저 실행
  - 불필요하게 메모리 점유될 수 있음
- constructor에서 원시값(null 포함)을 반환하면 this가 반환된다
- constructor 내부에서 new keyword 무한 재귀 발생
