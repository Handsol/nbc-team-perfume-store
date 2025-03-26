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
| 👨‍💼 고용준 | README 파일 작성, 회원가입, 로그인                   |
| 👨‍💼 구본승 | 발표, 제품 리스트 페이지                             |
| 👩‍💼 이기리 | 발표 PPT 준비, 장바구니, 결제 페이지                 |
| 👨‍💼 이승준 | 트러블슈팅 정리, 제품 상세 페이지, 리뷰, 마이 페이지 |

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

## 📃 프로젝트 소개 자료

## 💻 프로젝트 실행

### 1️⃣ 프로젝트 클론

```bash
git clone <repository-url>
cd <project-directory>
```

### 2️⃣ 패키지 설치

```bash
pnpm install
```

### 3️⃣ 개발 서버 실행

```bash
pnpm run dev
```

## 📁 프로젝트 구조

```plaintext
📂 3조_OROT
 ┣ 📂 src
 ┃ ┣ 📂 app          #
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
| 제품 리스트 | `/product`      | 전체 제품 목록, 태그 기반 필터링             |
| 제품 상세   | `/product/[id]` | 제품 정보, 리뷰(별점, 사진)                  |
| 마이페이지  | `/my-page`      | 닉네임 / 비밀번호 변경, 주소 관리, 구매 내역 |

---

## 👏 기여 방법

1. 레포지토리를 포크합니다.
2. 브랜치 명명 규칙에 맞게 브랜치를 생성합니다.
3. 변경 사항을 커밋하고 푸시합니다.
4. PR을 생성합니다.

## 📜 라이선스

이 프로젝트는 MIT 라이센스를 따릅니다.
