## 재현 과정

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

`src/case.ts`에 에러 케이스와 에러가 아닌 케이스가 존재
