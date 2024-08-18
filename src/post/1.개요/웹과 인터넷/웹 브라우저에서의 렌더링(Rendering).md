---
title: '웹 브라우저에서의 렌더링(Rendering)'
createdAt: "2024-06-29 10:30:14"
updatedAt: "2024-06-29 10:30:14"
discription: "실시간으로 웹사이트가 그려지는 과정, 이 과정을 웹 브라우저의 렌더링 과정이라고 한다. "
tags: ['렌더링','Rendering','client-side rendering','pre-rendering','CSR','SSR','SSG','웹','web']
isFavorite: false
---



# 사전준비
## 렌더링(Rendering)이란
- 실시간으로 웹사이트가 그려지는 과정, 이 과정을 웹 브라우저의 렌더링 과정이라고 한다. 



# 사용 & 응용
## Rendering의 종류
### Client-Side Rendering
서버로부터 빈 HTML과 JavaScript를 전달받아 화면을 렌더링<br/>
(모든 렌더링 작업이 완료되기 전까지 사용자는 어떤 화면도 볼 수 없다.)<br/>
JavaScript를 차단하면 화면을 렌더링 할 수 없다.
### Pre-rendering
서버에서 미리 생성해둔 HTML을 전달하여 화면을 렌더링, 그 후 Hydration을 통해 동적인 UI로 바뀐다.<br/>
(JavaScript를 다 받아오지 않아도 초기에 화면을 볼 수 있다.)<br/>
(Hydration : HTML에 자바스크립트를 주입하여 화면을 동적으로 바꾸는 과정)<br/>
## Pre-rendering 방식
### SSG(Static Site Generation : 정적 사이트 생성기)
빌드 시에 데이터를 가져와서 HTML파일을 미리 생성<br/>
데이터가 바뀔 일이 없을 경우 유용하다.
### SSR(Server Side Rendering : 서버 사이드 렌더링)
서버에 요청이 있을때, 데이터를 가져오고 HTML파일을 만들어서 반환