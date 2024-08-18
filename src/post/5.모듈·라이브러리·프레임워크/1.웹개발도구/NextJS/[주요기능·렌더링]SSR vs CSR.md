---
createdAt: "2024-08-11 00:51:20"
discription: "NextJS는 React에서 CSR만을 지원하는것과는 다르게 SSR과 CSR을 모두 지원한다. 그렇기에 두가지 방법의 렌더링에 대한 정리와 사용법에 대한 간단한 정리를 해두었다. "
tags: ["CSR", "SSR", "NextJS", "렌더링"]
isFavorite: false
---

# 사용 & 응용

## CSR(Client-side Rendering)

### CSR에서 페이지를 불러오는 과정

## SSR(Server-side Rendering)

### SSR에서 페이지를 불러오는 과정

1. Next Server가 GET 요청을 받는다.
1. 요청에 맞는 Page를 찾는다.
1. \_app.tsx의 getInitialProps가 있다면 실행한다.
1. Page Component의 getInitialProps가 있다면 실행한다. pageProps들을 받아온다.
1. \_document.js의 getInitialProps가 있다면 실행한다. pageProps들을 받아온다.
1. 모든 props들을 구성하고, \_app.js > page Component 순서로 rendering.
1. 모든 Content를 구성하고 \_document.js를 실행하여 html 형태로 출력한다.
