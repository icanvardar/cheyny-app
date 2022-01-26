import "@ethersproject/shims";
import { StatusBar } from "expo-status-bar";
import Root from "./src/navigations";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Root />
    </>
  );
}
