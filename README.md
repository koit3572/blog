# 설치

## netlify

- npm i --save @netlify/plugin-nextjs

## 데이터

- npm i react-hook-form
- npm i dotenv

## markdown

- npm i gray-matter
- npm i react-markdown
- npm i rehype-highlight
- npm i remark-gfm

## tailwindcss

- npm i tailwind-scrollbar-hide

## 스타일

- npm i swiper

## 애니메이션

- npm i gsap
- npm i react-icons

## lodash

- npm i lodash
- npm i --save-dev @types/lodash

## redux

- npm i react-redux redux redux-persist @reduxjs/toolkit
- npm i --save-dev @types/redux-persist
- npm i next-redux-wrapper
- npm i redux-logger
- npm i --save-dev @types/redux-logger

# Nextjs

- https://velog.io/@taeung/Next.js-getStaticProps-%EC%82%AC%EC%9A%A9%EA%B8%B0
- https://velog.io/@nemo/getServerSideProps-getStaticProps
- https://www.inflearn.com/community/questions/526132/app-%EC%97%90%EC%84%9C-getinitialprops-%EC%82%AC%EC%9A%A9
- https://velog.io/@picpal/Next.js%EC%9D%98-SSG-Static-Site-Generation-SSR-Server-Side-Rendering%EC%9D%84-%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-%EB%B0%8F-%EC%82%AC%EC%9A%A9%EB%B2%95
- https://bigyou98.tistory.com/entry/Nextjs-%EC%93%B0%EB%A9%B4-SSR-%ED%95%98%EA%B3%A0-%EC%9E%88%EB%8A%94%EA%B1%B0-%EC%95%84%EB%8B%98
- https://velog.io/@devstone/Next.js-100-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0-feat.-initialProps-webpack-storybook#0-nextjs%EA%B0%80-ssr%EC%9D%84-%EC%88%98%ED%96%89%ED%95%98%EB%8A%94-%EB%B0%A9%EC%8B%9D
- https://nextjs.org/docs/pages/building-your-application/routing/custom-app
- https://velog.io/@chaerin00/Next.js-app.tsx%EC%97%90%EC%84%9C-getInitialProps-%EC%BB%A4%EC%8A%A4%ED%85%80%ED%95%98%EA%B8%B0
- error
  - Error: page / getStaticProps can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member
    - https://nextjs.org/docs/messages/gssp-component-member
- getStaticProps
  ```js
  export default function Home({ message }: InferGetStaticPropsType<typeof getStaticProps>) {
    return <div>{message}</div>;
  }
  export const getStaticProps = (async () => {
    return {
      props: {
        message: "안녕하세요",
      },
    };
  }) satisfies GetStaticProps<{ message: string }>;
  ```
- CSR, SSR, SSG
  - process.cwd()와 \_\_dirname차이
    - process.cwd()선언된 파일의 루트 경로
    - \_\_dirname선언된 파일의 경로

# tailwindcss

## prettier-plugin-tailwindcss

- npm i -D prettier eslint-config-prettier prettier-plugin-tailwindcss
  - prettier : 코드 스타일을 일관되게 유지할 수 있게 도와주는 툴
  - eslint-config-prettier : prettier와 충돌하는 모든 eslint규칙을 꺼주는 옵션
  - prettier-plugin-tailwindcss : tailwindcss 클래스를 권장 클래스 순서에 따라 자동으로 정렬해주는 prettier플러그인
- (설정 검색 ctrl+,) default formatter > Editor:Default Formatter
  - settings.json : "editor.formatOnSave": true
- (설정 검색 ctrl+,) format on > Editor:Format On Save
  - settings.json : "editor.defaultFormatter": "esbenp.prettier-vscode"
- 프로젝트 루트경로에 .prettierrc파일 생성
  ```
  {
    "plugins": [ "prettier-plugin-tailwindcss" ],
    "tailwindAttributes": [ "className" ]
  }
  ```

## tailwindCSS 커스텀 색상

- https://velog.io/@boorook/Tailwind-CSS%EC%97%90%EC%84%9C-%EC%BB%A4%EC%8A%A4%ED%85%80-%EC%BB%AC%EB%9F%AC-%EC%84%A4%EC%A0%95

# 에러 및 문제 해결

## URL에서 &를 문자열으로 사용하려 할때 문제

- https://blog.naver.com/csgct/220444910779

## Server Error

<!-- - SyntaxError: Cannot use import statement outside a module
  This error happened while generating the page. Any console logs will be displayed in the terminal window.
  - -->

- SyntaxError: Unexpected token 'export'
  - next.config.js > nextConfig에 transpilePackages:['gsap']
    (gsap/ScrollToPlugin를 사용하는 과정중 발생한 에러)

## 기타

- useEffect가 2번 동작한다.
  - next.config.js > nextConfig에 reactStrictMode: false
    (true를 false로 변경)
