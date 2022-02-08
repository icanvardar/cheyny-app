import { ApolloClient, InMemoryCache } from "@apollo/client";

// Subgraph URL
const API_URL =
  "https://api.thegraph.com/subgraphs/name/ismailcanvardar/cheyny";

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

export default client;
