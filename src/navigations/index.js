import { View, Text, ActivityIndicator } from "react-native";
import { useState, useEffect, useCallback } from "react";
import useStore from "../store/useStore";
import { useFonts } from "expo-font";
import Stacks from "./Stacks";
import Tabs from "./Tabs";
import React from "react";
import PasswordScreen from "../screens/Password";

import * as SplashScreen from "expo-splash-screen";
import { THEME } from "../constants";

const Root = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [appHasPassword, setAppHasPassword] = useState();
  const isWalletCreated = useStore((state) => state.isWalletCreated);
  const checkWallet = useStore((state) => state.checkWallet);
  const fetchWallet = useStore((state) => state.fetchWallet);
  const hasPassword = useStore((state) => state.hasPassword);
  const removeWallet = useStore((state) => state.removeWallet);
  const removePassword = useStore((state) => state.removePassword);
  const isPasswordEntered = useStore((state) => state.isPasswordEntered);
  const setPasswordEntered = useStore((state) => state.setPasswordEntered);

  let [fontsLoaded] = useFonts({
    Costigue: require("../../assets/fonts/Costigue/Costigue.ttf"),
    "Poppins-Light": require("../../assets/fonts/Poppins/Poppins-Light.ttf"),
    "Poppins-LightItalic": require("../../assets/fonts/Poppins/Poppins-LightItalic.ttf"),
    Poppins: require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-Italic": require("../../assets/fonts/Poppins/Poppins-Italic.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-BoldItalic": require("../../assets/fonts/Poppins/Poppins-BoldItalic.ttf"),
    "Poppins-Black": require("../../assets/fonts/Poppins/Poppins-Black.ttf"),
    "Poppins-BlackItalic": require("../../assets/fonts/Poppins/Poppins-BlackItalic.ttf"),
  });

  useEffect(() => {
    // This methods loads all the dependencies before app startup
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // await removePassword();
        // await removeWallet();
        await checkWallet();
        await fetchWallet();
        hasPassword()
          .then((val) => setAppHasPassword(val))
          .catch((err) => console.log(err));

        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();

    return function cleanup() {};
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

  const AppHandler = ({ walletCreated, passwordEntered }) => {
    if (walletCreated === true) {
      console.log("Tabs and password");
      if (passwordEntered === true) {
        return <Tabs />;
      } else if (passwordEntered === false) {
        return <PasswordScreen />;
      }
    }

    if (walletCreated === false) {
      console.log("stacks");

      return <Stacks />;
    }

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AppHandler
        walletCreated={isWalletCreated}
        passwordEntered={isPasswordEntered}
      />
    </View>
  );
};

export default Root;
