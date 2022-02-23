import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Drawer from "../../navigations/Drawer";
import WalletScreen from "../../screens/Wallet";
import ScanScreen from "../../screens/Scan";
import HistoryScreen from "../../screens/History";
import SettingsScreen from "../../screens/Settings";
import CertificateScreen from "../../screens/Wallet/Certificate";
import React from "react";
import { Image } from "react-native";

import { THEME } from "../../constants";

const Tab = createBottomTabNavigator();
const WalletStack = createStackNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          borderTopColor: THEME.colors.primary,
          borderTopWidth: 1,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          if (route.name === "Wallet") {
            icon = focused
              ? require("../../../assets/images/tab-icons/wallet-active.png")
              : require("../../../assets/images/tab-icons/wallet-inactive.png");
          } else if (route.name === "Scan") {
            icon = focused
              ? require("../../../assets/images/tab-icons/scan-active.png")
              : require("../../../assets/images/tab-icons/scan-inactive.png");
          } else if (route.name === "History") {
            icon = focused
              ? require("../../../assets/images/tab-icons/history-active.png")
              : require("../../../assets/images/tab-icons/history-inactive.png");
          } else if (route.name === "Settings") {
            icon = focused
              ? require("../../../assets/images/tab-icons/settings-active.png")
              : require("../../../assets/images/tab-icons/settings-inactive.png");
          }

          // You can return any component that you like here!
          return <Image source={icon} />;
        },
      })}
    >
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      {/* <Tab.Screen name="History" component={HistoryScreen} /> */}
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const WalletStacks = () => {
  return (
    <NavigationContainer theme={THEME}>
      <WalletStack.Navigator>
        <WalletStack.Screen
          options={{ headerShown: false }}
          name="Wallet"
          component={Tabs}
        />
        <WalletStack.Screen
          options={{ headerShown: false }}
          name="Drawer"
          component={Drawer}
        />
        <WalletStack.Screen
          options={{ headerShown: false }}
          name="Certificate"
          component={CertificateScreen}
        />
      </WalletStack.Navigator>
    </NavigationContainer>
  );
};

export default WalletStacks;
