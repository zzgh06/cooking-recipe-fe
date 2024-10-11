# 🍴 레시피와 쇼핑이 더해진 What’s in your fridge
![스크린샷 2024-10-12 030526](https://github.com/user-attachments/assets/74536df6-79a0-4c46-af97-070fddad9a8e)

**What’s in your fridge 는 사용자가 다양한 레시피를 확인하고, 필요한 식재료를 간편하게 구매할 수 있는 웹사이트입니다.**
>
<br>

## 프로젝트 소개

**What’s in your fridge**는 요리를 할 때 여러 사이트를 돌아다니며 레시피를 찾고 식재료를 따로 구매하는 번거로움을 없애기 위해 기획하게 되었습니다.
- 사용자가 요리 레시피를 쉽게 검색하고, 해당 레시피에 필요한 식재료를 바로 구매할 수 있도록 돕고, 
- My 냉장고 기능을 통해 사용자가 가지고 있는 식재료를 이용하여 만든 레시피를 추천해줍니다.
- 다양한 유저들을 마음에 드는 레시피나 상품에 평점을 주고 댓글을 작성할 수 있습니다.
<br>

### 배포 주소

> <div>프론트 서버 : https://whats-in-yours-fridge.netlify.app</div>
> <div>백엔드 서버 : http://whats-in-your-fridge.ap-northeast-2.elasticbeanstalk.com</div>
> 테스트 계정 : admin / 123
<br>

## 팀원 구성

|이정우|정성욱|최충현|오혜림|
|:------:|:---:|:---:|:-----:|
|[@leejeongwoo1](https://github.com/leejeongwoo1/leejeongwoo1)|[@SungJung0616](https://github.com/SungJung0616)|[@zzgh06](https://github.com/zzgh06)|[@ohloara](https://github.com/ohloara)|<br>

### 개발 기간

- 전체 개발 기간: 2024-06-16 ~ 2024-06-30
- 백앤드 구현: 2024-06-18 ~ 2024-06-27
- 프론트앤드 및 기능 구현: 2024-06-18 ~ 2024-06-30

## 📚 STACKS
### Environment
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
### Config
<img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white">

### Development
<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"/> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white"/> 

### deployment
<img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"> <img src="https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7">
<br>
<br>


## 담당 역할 및 주요 기능
1. 상품 목록 무한 스크롤을 통한 전체 상품 정보 제공 구현
- intersection Observer 및 React Query, useRef 와 같은 React Hook을 통해 위치를 감지하여 새로운 데이터 요청

2. My 냉장고 추천 레시피 제공 구현
- React Query을 활용한 추천 레시피 제공 기능 구현

3. 장보기 메모 기능 구현
- React Query 데이터 패칭과 React-Toolkit를 활용한 전역 상태 관리 구현

4. 소셜 로그인 및 레시피 공유 기능 구현
- Kakao API를 활용하여 소셜 로그인 및 레시피 공유     

5. 비밀 번호 관련 기능 구현
- React Query Hook을 통한 비밀번호 재인증 및 변경 기능 구현
- NodeEmailer API 활용하여 비밀번호 찾기 기능 구현

6. 관리자 페이지 UI 및 기능 구현
- chart.js 라이브러리를 기반으로 차트 구현
- 총 매출 및 신규 가입 고객, 주문상태를 시각화하여 제공
<br>

## API 문서

- [Swagger API Documentation (Local)](http://localhost:5000/api-docs)
- [Swagger API Documentation (Production)](http://whats-in-your-fridge.ap-northeast-2.elasticbeanstalk.com/api-docs)
<br>

## 프로젝트 구조

### 백앤드

### 백앤드 폴더 구조

[cooking-recipe-be.md](./cooking-recipe-be.txt)

### 백앤드 ERD

- [What's in your fridge ERD](https://drive.google.com/file/d/1nL1DgvbKRcPwwrjyzDOq8GV-lfK_8kFw/view?usp=sharing)



## 프론트앤드

### 프론트앤드 폴더구조

[cooking-recipe-fe.md](./cooking-recipe-fe.txt)

## 화면 구성

|레시피 페이지|레시피 상세 페이지|
|:------:|:------:|
|![whats-in-yours-fridge netlify app_ (8)](https://github.com/user-attachments/assets/37007615-07fc-410e-836c-7611e59a4db0)|![whats-in-yours-fridge netlify app_ (14)](https://github.com/user-attachments/assets/d4d163ab-0ee3-41fc-9af4-360fbc8b2538)|

|스토어 페이지|스토어 상세 페이지|
|:---:|:------:|
|![whats-in-yours-fridge netlify app_store](https://github.com/user-attachments/assets/66ba4893-6fee-40fc-b13c-84ba7e06ef75)|![whats-in-yours-fridge netlify app_store (1)](https://github.com/user-attachments/assets/24204e3e-d760-461c-8417-5132645e37e9)|

|My 냉장고 페이지|카트 페이지|
|:------:|:------:|
|![whats-in-yours-fridge netlify app_store (3)](https://github.com/user-attachments/assets/60bcce82-7113-4a4e-8e29-4d84c6388986)|![whats-in-yours-fridge netlify app_store (2)](https://github.com/user-attachments/assets/0f9eff2d-f9f8-498e-a568-d38a6810505e)|

|프로필 페이지|어드민 페이지|
|:------:|:------:|
|![whats-in-yours-fridge netlify app_ (13)](https://github.com/user-attachments/assets/b5ba696a-9aee-4d05-a7c4-d1106eac6932)|![스크린샷 2024-10-12 030341](https://github.com/user-attachments/assets/977b662d-b9c7-46a8-a441-4bd3f4aa65d1)|
<br>

## ⭐ 주요 기능 
  ### 1. 레시피 관리
  - 다양한 레시피 검색 및 작성
  - 레시피 상세 정보 보기
  - 레시피 좋아요 및 공유하기 
  ### 2. 식재료 관리
  - 필요한 식재료 장바구니 추가
  - 식재료 구매
  ### 3. 장보기 메모
  - 레시피 내 사용되는 재료 중 장보기 메모에 추가
  - 장보기 목록 중 완료 목록 이동
  - 장보기 목록 중 삭제가 필요한 목록 삭제 
  ### 4. 냉장고 관리
  - 냉장고 식재료 관리
  - 냉장고 내 식재료 레시피 추천
  ### 5. 리뷰 및 사용자 관리
  - 레시피, 식재료 리뷰 작성
<br>

## 사용 방법
1. 홈페이지에서 원하는 레시피 상세 페이지에 들어갑니다.
2. 필요한 식재료 장보기 메모에 추가 혹은 바로 구매가 필요한 식재료를 장바구니에 추가합니다.
3. 장바구니 페이지로 이동하여 식재료를 구매합니다.
3. My 냉장고 페이지 내 현재 자신이 가지고 있는 재료(상품)을 등록한 후 추천 레시피를 확인합니다.
5. 마이 페이지 내에서 주문 정보 및 장보기 메모, 자신이 등록한 레시피 등 개인 정보를 확인, 관리합니다.
<br>
