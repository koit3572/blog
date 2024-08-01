---
title: '[문제&질문]NextJS의 문제와 질문 모음'
createdAt: "2024-06-27 15:23:53"
updatedAt: "2024-06-27 15:23:53"
discription: "NextJS를 사용할 때 발생하는 문제나 질문들을 모아 해결방법을 기록"
tags: ['error','에러','ap-style','오류','suppressHydrationWarning']
isFavorite: false
---
# 사전준비
## 추후 정리 필요
- url : https://velog.io/@with-key/Next.js-%ED%99%98%EA%B2%BD%EB%B3%80%EC%88%98%EA%B0%80-undefined-%EC%9D%BC-%EB%95%8C

# 문제 & 질문
## 문제 & 질문 리스트
### 문제
|문제|설명|
|--|--|
|Error|Warning: Extra attributes from the server: ap-style|
## Warning: Extra attributes from the server: ap-style
- NextJS프로젝트를 CNA을 통해 만들고 코드 수정없이 바로 실행하더라도 콘솔에 해당 오류가 발생한다. 
### 문제직시
- 서버 사이드 렌더링을 사용하는 경우, 서버쪽에서 렌더링 하는 컨텐츠와 클라이언트쪽에서 렌더링하는 컨텐츠가 서로 불일치 할때 나타나는 에러
### 해결방안
body태그안에 suppressHydrationWarning속성을 넣으면 된다. 해당 속성은 위의 에러 발생 시 서로 일치시키는것이 `힘들거나 불가능할 경우` 속성과 요소 내용의 불일치에 대한 경고를 하지 않게 한다. 해당 속성의 특징으로는 바로 밑(자식)요소 까지만 영향을 끼치며, 남용하는것을 주의해야한다.
```jsx
<html lang="en">
  <body className={inter.className} suppressHydrationWarning>
    {children}
  </body>
</html>
```