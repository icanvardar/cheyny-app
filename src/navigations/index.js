import { View, Text } from "react-native";
import { useState, useEffect, useCallback } from "react";
import useStore from "../store/useStore";
import { useFonts } from "expo-font";
import Stacks from "./Stacks";
import Tabs from "./Tabs";

import * as SplashScreen from "expo-splash-screen";

const Root = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const isWalletCreated = useStore((state) => state.isWalletCreated);
  const checkWallet = useStore((state) => state.checkWallet);

  let [fontsLoaded] = useFonts({
    Costigue: require("../../assets/fonts/Costigue.ttf"),
  });

  useEffect(() => {
    // This methods loads all the dependencies before app startup
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

  // This layout event checks all the dependencies are set up correctly
  // and renders components according to it
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

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
