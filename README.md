# 선체 설계 시수 관리 시스탬

<aside>
💡 선체 설계 시수 관리 시스탬 입니다.

</aside>

**install**

git clone 후에

```tsx
yarn;
```

**start**

프로그램 실행

```tsx
yarn electron:serve
```

서버 실행

```tsx
cd server && yarn start
```

---

### 개발환경

```tsx
Front: React.js, Electron, module.css, antd, yarn, Recoil, sheetjs;

Back: Node, mysql;
```

---

# 🕒 유지보수 내역 🏁

### 유지보수 사용자 Feedback

[조선소-호선/ 선체 목록 기능 구현 ( emp & admin ) #hull/filter✅](https://github.com/yeongi/work-manage/pull/3)

[modal 창 관련 에러 ( emp ) #issue/modal✅](https://github.com/yeongi/work-manage/pull/5)

### 추가 기능

[ID & PW 저장 기능 구현 하기 ( Login ) #login✅](https://github.com/yeongi/work-manage/pull/6)

[금일 업무 내역 조회 기능 ( admin ) #todayrecord✅](https://github.com/yeongi/work-manage/pull/2)

[반응형 UI로 변경해 사용자 경험 향상 ✅](https://github.com/yeongi/work-manage/wiki/%EB%B0%98%EC%9D%91%ED%98%95-ui%EB%A1%9C-%EB%A6%AC%ED%8E%99%ED%86%A0%EB%A7%81-%ED%95%98%EA%B8%B0)

[로그인 상태관리 Context -> Recoil로 변경하기 #recoil✅](https://github.com/yeongi/work-manage/pull/7)

---

### 시험 기능

**계획시수 ( 시험 기능 )**

- 블럭에 대한 시수를 계획하는 값.
- 저장되지 않아도 되고, 비교될 일이 없다.
- 말그대로 **계획** 계획대로 흘러가지 않아도 괜찮다.

**계획 시수 넣기 기능 ( emp )**

- 월초에 블럭에 대해서 계획 시수를 미리 입력한다.
- 계획시수를 입력하기 전에 호선이 들어가 있다고 판단한다.
- 사원은 월별로 계획 시수를 입력/수정 할 수 있다.

**계획 시수 조회 ( emp & admin )**

- 사원별로 한달 시수 계획 조회 기능
- 사원이 개인이 짠 한달 계획을 볼 수 있다.

---

### 🚀 기능 목록 버전 v1.0

### 공통

- 로그인하기
- 로그아웃하기

### 사원

- 조선소/선체/업무 리스트 조회 하기
- 업무내역 입력하기
- 금일 업무내역 조회하기
- 월별 업무내역 조회하기

### 관리자

- 조선소/선체/업무 리스트 CRUD
- 사원 리스트 및 관리 하기
- 월별/선체별/블럭별/사원별 업무내역 조회 및 내보내기

### Refactoring 기록

---

- 디렉토리 구조 개선
  - 관심사에 따라 폴더 분리
  - util : 순수함수만 모음
  - lib : 통신 및 컴포넌트의 util 함수 모음
- 반응형 UI로 개선 -고정 단위 변경 -레이아웃 수정 및 사용자 경험 향상
- Context -> recoil로 로그인 상태 관리 변경
- 자동 로그인 구현

---
