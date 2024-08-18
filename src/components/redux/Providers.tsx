import { ApiResPostData } from "@/pages/api/post";
import { persistor, store, wrapper } from "@/store";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ReduxDefaultSet from "./ReduxDefaultSet";
interface ProviderProps {
  pageProps: ApiResPostData;
  children: React.ReactNode;
}

const Providers: React.FC<ProviderProps> = ({ pageProps, children }) => {
  const { store } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ReduxDefaultSet pageProps={pageProps}>{children}</ReduxDefaultSet>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
