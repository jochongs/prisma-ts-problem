## 💡 상황

**요구 기능**: 게시글을 가져올 때, 게시글의 작성자와 해당 작성자가 작성했던 최근 게시글을 가져오는 메서드를 구현

## 💡 재현 과정

### 1. 깃 클론

```bash
git clone https://github.com/jochongs/prisma-ts-problem.git
```

### 2. 의존성 설치

```bash
npm install
```

### 3. Prisma 타입 생성

```bash
npx prisma generate
```

## 💡 파일 설명

`src/type.ts`에 prisma find 결과 타입 정의가 존재합니다.

`src/case.ts`, `src/case2.ts` 에 각 케이스가 존재합니다.
