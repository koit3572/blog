'use client'
import { persistor, store } from "@/store";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ProviderContainer from "./ProviderContainer";
interface ProviderProps {
  className: string;
  children: React.ReactNode;
}

const Providers: React.FC<ProviderProps> = ({ className,children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ProviderContainer>
          <div className={className}>
            {children}
          </div>
        </ProviderContainer>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
