# FreeWheelin front

### 개발환경 구성

- React + swc
- TypeScript
- Vite
- pnpm
- tailwind
- **Node.js**: v20.19.3

## 프로젝트 개요

매쓰플랫의 문제리스트와 각 문제에 관련된 유사문제를 호출한 뒤 학습지 목록의 문제들을 유저가 원하는 대로 추가, 교체, 삭제할 수 있는 화면을 작업

### 1. 프로젝트 설치

```bash
git clone [저장소 주소]
cd [프로젝트 폴더명]
pnpm install
```

### 2. 개발 서버 실행

```bash
pnpm dev
```

### 3. 개발 서버 빌드

```bash
pnpm build
```

### 4. 컬러토큰, 반응형 기준

프로젝트 내에 사용한 반응형 breakpoint와 컬러 토큰은 `tailwind.config.js`에 정의되어 있습니다.

- **태블릿**: 1024px 이상 (`tablet:` 접두사)
- **PC**: 1280px 이상 (`desktop:` 접두사)
