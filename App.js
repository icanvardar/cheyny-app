import "@ethersproject/shims";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Root from "./src/navigations";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./src/utils/apolloClient";
import TokenTransferProvider from "./src/context/TransferTokenProvider";

import { Navigation } from "react-native-navigation";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

Navigation.registerComponent("com.sigma.cheyny", () =>
  gestureHandlerRootHOC(App)
);

export default function App() {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <TokenTransferProvider>
          {/* <BottomModalProvider> */}
          <StatusBar style="light" />
          <Root />
          {/* </BottomModalProvider> */}
        </TokenTransferProvider>
      </ApolloProvider>
    </>
  );
}
