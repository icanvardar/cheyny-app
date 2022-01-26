import { View, Text } from "react-native";
import { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import useStore from "../store/useStore";
import Stacks from "./Stacks";
import Tabs from "./Tabs";

const Root = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const isWalletCreated = useStore((state) => state.isWalletCreated);
  const checkWallet = useStore((state) => state.checkWallet);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await checkWallet();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {isWalletCreated === true ? (
        <Tabs />
      ) : isWalletCreated === false ? (
        <Stacks />
      ) : (
        <Text>This screen will be information screen!</Text>
      )}
    </View>
  );
};

export default Root;
