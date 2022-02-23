import "@ethersproject/shims";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Root from "./src/navigations";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./src/utils/apolloClient";
import { BottomModalProvider } from "react-native-bottom-modal";
import TokenTransferProvider from "./src/context/TransferTokenProvider";

export default function App() {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <TokenTransferProvider>
          <BottomModalProvider>
            <StatusBar style="light" />
            <Root />
          </BottomModalProvider>
        </TokenTransferProvider>
      </ApolloProvider>
    </>
  );
}
