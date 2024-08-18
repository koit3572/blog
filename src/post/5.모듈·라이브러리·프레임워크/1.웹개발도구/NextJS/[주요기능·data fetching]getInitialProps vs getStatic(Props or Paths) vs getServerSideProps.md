---
createdAt: "2024-08-11 00:51:15"
discription: "NextJS 에서 data fetching을 위해 사용하기 위해 사용되는 getInitialProps와 getStaticProps,getStaticPaths, getServerSideProps의 사용법과 getInitialProps가 NextJS v9.3이후로 사용을 지양하게 된 이유에 대한 포스팅"
tags:
  [
    "getInitialProps",
    "getStaticProps",
    "getStaticPaths",
    "getServerSideProps",
    "data fetching",
    "데이터 패칭",
  ]
isFavorite: false
---

# 사전준비

## 정적 최적화(Authomatic Static Optimization)

- NextJS는 페이지에 getInitialProps또는 getServerSideProps가 없을 때 해당 페이지를 static페이지라고 인식하여 build시에 html파일로 만든다(pre-render)
  - .next/server/static/about.tsx파일이 build시
    ```contentBox
    getInitialProps또는 getServerSideProps가 없을 때
      .next/server/static/about.html
    getInitialProps또는 getServerSideProps가 있을 때
      .next/server/static/about.js
    ```
  - 위의 이유로 \_app.tsx에 getInitialProps를 적용시 모든 페이지가 static page로 인식되지 않는다.

# 사용 & 응용

## data fetching을 하는 이점

- getInitialProps, getStaticProps, getStaticPaths, getServerSideProps는 각각 용법은 다르지만, 서버에서 페이지를 연산한다는 점은 동일한다.
- 서버에서 data fetching을 하는 경우 이점
  - 브라우저의 연산을 서버와 함께하면 미리 데이터를 받아오고 브라우저는 렌더링만 하면 됨으로 속도가 빨라진다.
  - 일부 데이터가 필수적인 페이지의 경우 브라우저가 데이터를 받아올떄까지 화면 렌더링을 null(흰 화면)처리하는 경우가 있는데 이 과정이 없어지고, Initial한 데이터가 들어오는 과정을 전제로 코드를 작성할 수 있다.

## 각 메서드와 한줄 설명

| 메서드             | 설명                                                 |
| ------------------ | ---------------------------------------------------- |
| getInitialProps    |                                                      |
| getStaticProps     | 빌드시 데이터를 패칭하며, 빌드 이후 수정이 불가하다. |
| getStaticPaths     |                                                      |
| getServerSideProps |                                                      |

## \_app.tsx에서의 데이터 패칭

- \_app.tsx에서 전역적으로 패칭을 할 경우 getStaticProps나 getServerSideProps를 지원하지 않는다.
- 그러나 getInitialProps를 통해 모든 페이지에서 사용할 공통 속성값을 지정할 경우 자동으로 정적 최적화가 비활성화 되어 모든 페이지가 서버 사이드 렌더링을 통해 제공된다.

## getInitialProps

### 주의사항

- getInitialProps의 내부 로직은 서버에서 실행됨으로 Client에서만 가능한 로직은 피해야 한다.
  (Window, document 등)
- 한 페이지를 로드할 때 하나의 getInitialProps 로직만 실행된다.
  (자세한 내용은 getInitialProps Custom에서 확인)

### getInitialProps의 사용을 지양해야 하는 이유

- \_app.tsx에서 getInitialProps를 사용할 시 `Authomatic Static Optimization`의 기능이 꺼지기 때문에 사용하는것을 지양한다.

### default Props

- getInitialProps들은 기본적으로 받는 props가 있다. 이를 context(ctx)라고 한다.
  | 구성 | 설명 |
  | -------- | ---------------------------------------------------------------------------------- |
  | pathname | 현재 pathname /user?type=normal page 접속 시에는 /user |
  | query | 현재 query를 object형태로 출력 /user?type=normal page 접속 시에는 {type: 'normal'} |
  | asPath | 전체 path /user?type=normal page 접속 시에는 /user?type=normal |
  | req | HTTP request object (server only) |
  | res | HTTP response object (server only) |
  | err | Error object if any error is encountered during the rendering |

### getInitialProps Custom

- \_app.tsx와 page.tsx 모두 getInitialProp와 getServerSideProps가 정의 되어있다면 getInitialProps의 특성(한페이지를 로드할때 하나의 로직만 실행)으로 인해 \_app.js의 하부 페이지(page.tsx)의 getInitialProps는 실행되지 않는다.
- 그렇기에 위와같은 상황일 경우 getInitialProps를 커스텀 해주어야 한다.
- 아래와 같이 커스텀을 해준다면 app의 값만 props에 적용되던것과 다르게 page.tsx에서 불러온 props도 합쳐져서 전달되게 된다.

```tsx
//_app.tsx
export default function MyApp({
  Component,
  pageProps,
}: AppProps<{ app: string }>) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async ({
  Component,
  ctx,
}: AppContext): Promise<AppInitialProps<{ app: string }>> => {
  let pageProps;
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  const app = "hello MyApp";
  pageProps = { ...pageProps, app: app };
  return { pageProps };
};
// index.tsx
const inter = Inter({ subsets: ["latin"] });
interface HomeProps {
  app: string;
  page: string;
}
export default function Home({ app, page }: HomeProps) {
  return (
    <div>
      {app} {page}
    </div>
  );
}

Home.getInitialProps = async (
  context: AppContext,
): Promise<{ page: string }> => {
  const page = "hello Index!!";
  return { page };
};
```

## getServerSideProps

- SSR방식으로 외부데이터를 서버에서 받아와 default데이터로 설정,페이지 요청마다 계속 실행, getStaticProps보다 성능이 떨어지지만 동적으로 데이터를 가져와 업데이트에 용이하다.
