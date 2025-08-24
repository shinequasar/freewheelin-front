# FreeWheelin front

---

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

### 2. 개발 서버 실행 / 빌드 / 테스트

```bash
# 실행
pnpm dev

# 빌드
pnpm build

# 테스트
pnpm test
```

### 3. 컬러토큰, 반응형 기준

프로젝트 내에 사용한 반응형 breakpoint와 컬러 토큰은 `tailwind.config.js`에 정의되어 있습니다.

- **태블릿**: 1024px 이상 (`tablet:` 접두사)
- **PC**: 1280px 이상 (`desktop:` 접두사)

---

## 주요 기능

### 1. 문항 관리

- **문항 목록 조회**: API를 통해 문제 목록을 가져와서 표시
- **문항 추가**: 활성화(Active)된 문제 이전에 새로운 문제 추가
- **문항 교체**: 활성화(Active)된 문제를 유사 문제로 교체
- **문항 삭제**: 선택된 문항 삭제
- **유사문항 활성화**: '유사문항' 버튼 클릭 시 Active 상태 토글, -> 재클릭시 '유사문항 삭제기능 추가'

### 2. 유사문항 관리

- **유사 문항 조회**: 활성화(Active)된 문항과 관련된 유사 문제 API 호출
- **교체된 문항 감지**: 이미 교체된 문항은 유사 문항 API 호출 제외

### 3. 상태 관리

- **Zustand Store**: 문항 목록, 유사 문항, 활성 문항 ID 등 상태 관리
- **교체된 문항 추적**: Set을 사용하여 교체된 문항 ID 관리
- **테스트용 상태 초기화**: 테스트를 위한 store 리셋 함수 추가

### 4. 테스트 및 설계

- **테스트 커버리지**: 주요 로직에 대한 단위 테스트 작성(store 함수, hook)
- **책임 분리 및 재사용**: 공통 컴포넌트와 훅 모듈화
- **`interface` vs `type`**: 객체 구조는 `interface`, 유니온/리터럴 타입은 `type` 을 사용하였습니다.
- **QuestionCard.tsx** - React.memo + useCallback 적용 -> 카드 컴포넌트 레벨 메모이제이션으로 문제 목록에서 개별 문제 변경 시 다른 카드들의 불필요한 리렌더링을 방지하였습니다.
- **useSimilarProblems.ts** - React.memo 적용 -> worksheetProblems가 변경될 때마다 excludedProblemIds 배열을 새로 생성하는 것 방지 -> 불필요한 API 호출을 방지하였습니다.
- **추후 지연 로딩(Lazy Loading) 도입고려**: 문항 이미지 및 메타데이터의 lazy 로딩 구현을 고려해볼 수 있을 것 같습니다.
- **추후 Virtualized List 도입고려**: 추후 문항리스트 목록이 대량으로 증가할 때 react-window등의 라이브러리를 활용한 화면에 보이는 문항 Card들에 대해 가상화 렌더링 적용을 고려해볼 수 있을 것 같습니다.
