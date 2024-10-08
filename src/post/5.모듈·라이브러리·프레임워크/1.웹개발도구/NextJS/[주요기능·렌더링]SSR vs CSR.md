---
createdAt: "2024-08-11 00:51:20"
description: "NextJS는 React에서 CSR만을 지원하는것과는 다르게 SSR과 CSR을 모두 지원한다. 그렇기에 두가지 방법의 렌더링에 대한 정리와 사용법에 대한 간단한 정리를 해두었다. "
tags: ["CSR", "SSR", "NextJS", "렌더링"]
isFavorite: false
---

# 사전준비

## 사전 지식

| 용어 | 설명                                                                                                                        |
| ---- | --------------------------------------------------------------------------------------------------------------------------- |
| CDN  | CDN(Content Delivery Network : 콘텐츠 전송 네트워크)는 엔드 유저의 요청에 '물리적'으로 가까운 서버에서 요청을 응답하는 방식 |

# 사용 & 응용

## CSR(Client-side Rendering)

- 클라이언트 사이드 렌더링은 서버에서 HTML파일과 JS파일을 받아와 클라이언트에서 HTML파싱 및 JS읽고 실행을 한다.

### CSR의 장단점

- 장점
  - 새로고침이 발생하지 않아 사용자 경험에 도움을 준다.
  - 초기 로딩 이후 빠른 웹사이트 렌더링이 가능<br/>
    (웹사이트가 로딩되는 즉시 상호작용 가능)
  - 필요한, 변경된 데이터만 받아오므로 트래픽 감소
- 단점
  - 검색엔진 최적화에 보완 필요
  - 초기 로딩 느림

### CSR에서 페이지를 불러오는 과정

1. 사용자가 웹사이트에 요청을 보낸다.
1. `CDN`이 빠르게 HTML파일과 JS파일에 접근할 수 있는 링크를 보낸다.
1. 브라우저는 HTML과JS파일을 다운로드를 받는다.<br/>
   (화면 안보임)
1. 브라우저가 JS파일을 읽는다.<br/>
   (화면 안보임)
1. 다운이 완료된 JS가 실행 및 데이터를 위한 API호출<br/>
   (placeholder를 보지만 JS에 의존한 행동은 할 수 없다.)
1. 서버가 API 요청에 응답
1. API로부터 받아온 data를 placeholder자리에 넣어준다.<br/>
   (해당 동작 이후 유저는 페이지와 상호작용을 할 수 있다.)

## SSR(Server-side Rendering)

- 서버 사이드 렌더링은 서버쪽에서 렌더링을 하여 화면을 보여주는 방식을 말한다.
- 서버로부터 완전하게 만들어진 HTML파일을 받아와 화면을 그리기 때문에 첫 화면 로딩 속도가 빠르다.

### SSR의 장단점

- 장점
  - 첫 페이지 로딩속도가 빠르다.
  - 검색엔진 최적화가 가능하다.
- 단점
  - 초기 로딩 이후 페이지 이동 시 속도가 CSR에 비해 느리다.
  - 깜빡임 이슈(페이지 이동시 새로고침이 이뤄지기 때문)
  - 서버측 자원을 많이 잡아먹어 서버에 과부하가 걸린다.
  - TTV(Time To View)와 TTI(Time To Interact)의 공백시간

### SSR에서 페이지를 불러오는 과정

1. Next Server가 GET 요청을 받는다.
1. 요청에 맞는 Page를 찾는다.
1. \_app.tsx의 getInitialProps가 있다면 실행한다.
1. Page Component의 getInitialProps가 있다면 실행한다. pageProps들을 받아온다.
1. \_document.js의 getInitialProps가 있다면 실행한다. pageProps들을 받아온다.
1. 모든 props들을 구성하고, \_app.js > page Component 순서로 rendering.
1. 모든 Content를 구성하고 \_document.js를 실행하여 html 형태로 출력한다.
