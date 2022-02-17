import "@ethersproject/shims";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Root from "./src/navigations";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./src/utils/apolloClient";

export default function App() {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <StatusBar style="light" />
        <Root />
      </ApolloProvider>
    </>
  );
}
