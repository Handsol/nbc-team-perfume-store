# 🍃 OROT

> _"향기를 담은 온라인 마켓, 당신만의 향수를 찾아보세요!"_

## 🧳 배포 링크

## 📌 프로젝트 소개

이 웹 애플리케이션은 **향수**를 쉽고 편리하게 구매할 수 있는 플랫폼입니다.

**향수에 관심이 있지만, 전문적인 지식이 부족한 사용자**가 향수를 고를 수 있도록 돕고,

**향수 유통업자**나 **자신만의 향수를 제작한 조향사**가 직접 제품을 등록하여 판매할 수 있도록 지원합니다.

🎯 타겟 :

`구매자` : 향수에 관심은 있지만 전문적인 지식이 부족한 일반 사용자

`판매자` : 사업자 등록된 유통업자 또는 조향사

## ✨ 팀원 소개

|   이름    | 역할                                                 |
| :-------: | ---------------------------------------------------- |
| 👑 이한솔 | 팀장, 프로젝트 세팅, 메인 페이지, 헤더               |
| 👨‍💼 고용준 | README 파일 작성, 회원가입, 로그인, 마이 페이지              |
| 👨‍💼 구본승 | 발표, 제품 리스트 페이지, 페이지네이션                |
| 👩‍💼 이기리 | 발표 PPT 준비, 장바구니, 결제 페이지                 |
| 👨‍💼 이승준 | 트러블슈팅 정리, 제품 상세 페이지, 리뷰 |

## 🛠 기술 스택

|                                                               기술                                                               | 사용 목적          |
| :------------------------------------------------------------------------------------------------------------------------------: | ------------------ |
|        ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)         | 언어               |
|             ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)             | 프레임워크         |
|             ![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=zustand&logoColor=white)             | 전역 상태 관리     |
|   ![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)    | 데이터 요청 & 캐싱 |
|              ![Shadcn](https://img.shields.io/badge/Shadcn-000000?style=for-the-badge&logo=shadcn&logoColor=white)               | UI 라이브러리      |
|           ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)            | 백엔드 서비스      |
|    ![Next.js Routing](https://img.shields.io/badge/Next.js%20Routing-000000?style=for-the-badge&logo=next.js&logoColor=white)    | 라우팅             |
|          ![Memoization](https://img.shields.io/badge/Memoization-007ACC?style=for-the-badge&logo=react&logoColor=white)          | 최적화             |
| ![Next.js Middleware](https://img.shields.io/badge/Next.js%20Middleware-000000?style=for-the-badge&logo=next.js&logoColor=white) | 미들웨어           |

## 🎯 주요 기능

- 향수 탐색
  - 사용자는 홈 화면에서 캐러셀과 함께 다양한 향수 제품을 확인할 수 있습니다.
  - 성별 또는 제품 카테고리별로 분류하여 확인할 수 있게 Navigation Bar가 제공됩니다.
  - 검색 기능을 통해 특정 향수 이름이나 브랜드를 입력하여 빠르게 찾을 수 있습니다.
- 제품 상세 보기
  - 각 향수 클릭 시 상세 페이지로 이동하며, 제품에 대한 다양한 정보(향수 이름, 브랜드, 설명, 가격, 용량, 수량, 가격 등)가 표시됩니다.
  - 향수에 대한 부가 정보로, 태그, 상세 정보, 사용자 리뷰가 제공됩니다.
  - 리뷰 데이터는 로그인한 사용자에 대해, 닉네임, 별점, 작성 시간, 작성 내용 형태로 표시됩니다.
- 장바구니 추가
  - 상세 페이지에서 원하는 옵션 선택 후 "장바구니에 추가" 버튼을 클릭하여 추가가 가능합니다.
  - 장바구니 페이지에서 추가된 여러 제품을 확인 가능합니다.
  - 장바구니 페이지에서 수량 재설정이 가능하며, 총 가격이 표시됩니다.
- 구매 기능
  - 장바구니에서 선택한 제품 확인 후 "주문하기" 버튼으로 결제 페이지로 이동.
  - 배송지 입력(주소, 연락처) 및 결제 수단 선택(신용카드, 모바일 결제 등)을 지원합니다.
  - "결제하기" 버튼을 클릭하면 모의 결제가 이루어집니다.
- 사용자 인증
  - 회원가입: 신규 사용자가 이름, 이메일, 비밀번호를 입력해 계정을 생성합니다.
    - 실시간 유효성 검사 및 비밀번호 강도 표시가 제공됩니다.
  - 로그인: 가입한 이메일과 비밀번호로 기존 계정에 접속하거나, 소셜 로그인을 통해 빠르게 가입 및 로그인이 가능합니다.
  - 닉네임, 비밀번호 재설정: my page에서 이미 설정된 닉네임, 비밀번호를 수정할 수 있습니다.
- 반응형 디자인
  - 데스크톱, 모바일 화면 크기에 따른 반응형 디자인을 제공합니다.

## 📃 프로젝트 소개 자료
![alt text](image.png)

발표자료: https://www.miricanvas.com/v/14e7xpn
## 💻 프로젝트 실행

### 1️⃣ 프로젝트 클론

```bash
git clone <repository-url>
cd <project-directory>
```

### 2️⃣ 패키지 설치

```bash
yarn install
```

### 3️⃣ 개발 서버 실행

```bash
yarn run dev
```

## 📁 프로젝트 구조

```plaintext
📂 3조_OROT
 ┣ 📂 src
 ┃ ┣ 📂 app          # 페이지, 레이아웃, 전역 css 등
 ┃ ┣ 📂 components   # 공통 컴포넌트
 ┃ ┣ 📂 constants        # 상수
 ┃ ┣ 📂 libs        # API 관련 함수, 훅 등
 ┃ ┣ 📂 types       # 타입 정의
 ┃ ┣ 📂 utils     # 재사용 가능성 있는 단독 함수
 ┃ ┣ 📂 zustand      # Zustand 상태 관리
 ┣ 📜 README.md
 ┣ 📜 package.json
 ┣ 📜 tailwind.config.js
 ┗ 📜 .gitignore
```

## 페이지 구성

| 페이지      | 경로            | 설명                                         |
| ----------- | --------------- | -------------------------------------------- |
| 회원가입    | `/sign-up`      | 회원가입 페이지                              |
| 로그인      | `/login`        | 로그인 페이지 ( 소셜 로그인 )                |
| 홈          | `/home`         | 캐러셀 배너, 추천 제품 슬라이드              |
| 검색        | `/search`       | 검색 결과 페이지(제목, 태그 등)              |
| 장바구니    | `/cart`         | 선택한 제품 목록 확인, 수량 조정             |
| 결제        | `/payment`      | 가상 결제 기능                               |
| 제품 리스트 | `/product`      | 전체 제품 목록, 태그 기반 필터링, 페이지네이션  |
| 제품 상세   | `/product/[id]` | 제품 정보, 리뷰(별점, 사진)                  |
| 마이페이지  | `/my-page`      | 닉네임 / 비밀번호 변경, 구매 내역(미구현) |

---

## 👏 기여 방법

1. 레포지토리를 포크합니다.
2. 브랜치 명명 규칙에 맞게 브랜치를 생성합니다.
3. 변경 사항을 커밋하고 푸시합니다.
4. PR을 생성합니다.

## 📜 라이선스

이 프로젝트는 MIT 라이센스를 따릅니다.
