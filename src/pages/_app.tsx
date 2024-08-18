import FooterContainter from "@/components/layout/footer/FooterContainter";
import HeaderContainer from "@/components/layout/header/HeaderContainer";
import NavBarContainer from "@/components/layout/navbar/NavBarContainer";
import ScrollTo from "@/components/layout/navbar/ScrollTo";
import SectionContainer from "@/components/layout/section/SectionContainer";
import SideBarContainer from "@/components/layout/sidebar/SideBarContainer";
import { LAYOUT_NAVBAR_HEIGHT } from "@/constent";
import "@/styles/globals.css";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { setPostData } from "@/store/post/postSlice";
import { wrapper, RootState } from "@/store";
import { ApiResApp, PostInfo } from "@/types/post";
import { persistStore } from "redux-persist";

import dotenv from "dotenv";
dotenv.config();

Layout.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({
      Component,
      ctx,
    }: AppContext): Promise<AppInitialProps<{ post: ApiResApp }>> => {
      let pageProps;
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
      if (
        Object.keys((store.getState() as RootState).postSlice.menu).length === 0
      ) {
        const res = await fetch("https://main--koitblog.netlify.app/api/app");
        const app: ApiResApp = await res.json();
        store.dispatch(
          setPostData({
            posts: app.posts,
            menu: app.menu,
            error: app.error,
          }),
        );
        return {
          pageProps: {
            ...pageProps,
            post: {
              posts: app.posts,
              menu: app.menu,
              error: app.error,
            } as ApiResApp,
          },
        };
      } else {
        return {
          pageProps: {
            ...pageProps,
            post: (store.getState() as RootState).postSlice,
          },
        };
      }
    },
);

function Layout({ Component, pageProps }: AppProps<ApiResApp>) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ScrollTo className="z-[999]" />
        <div className="flex w-[100vw] bg-blog-white">
          <SideBarContainer className="fixed z-[999] h-full overflow-hidden transition-[width] duration-300" />
          <SectionContainer className="flex w-[100vw] flex-col items-center transition-[padding] duration-300 xl:pl-[15rem]">
            <NavBarContainer
              style={{ height: LAYOUT_NAVBAR_HEIGHT }}
              className="fixed left-0 top-0 z-[997] w-full p-2 transition-all duration-300 xl:left-[15.5rem] xl:w-[calc(100%-15.5rem)]"
            />
            <HeaderContainer
              style={{ paddingTop: LAYOUT_NAVBAR_HEIGHT + 0 }}
              className="h-[50rem] w-full"
            />
            <SectionContainer className="z-[996] min-h-[calc(100vh-50rem)] w-full bg-slate-700">
              <Component {...props.pageProps} />
            </SectionContainer>
            <FooterContainter />
          </SectionContainer>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(Layout);
