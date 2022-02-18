import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Drawer from "../../navigations/Drawer";
import WalletScreen from "../../screens/Wallet";
import ScanScreen from "../../screens/Scan";
import HistoryScreen from "../../screens/History";
import SettingsScreen from "../../screens/Settings";
import React from "react";

import { Ionicons } from "@expo/vector-icons";

import { THEME } from "../../constants";

const Tab = createBottomTabNavigator();
const WalletStack = createStackNavigator();

const WalletStacks = () => {
  return (
    <WalletStack.Navigator>
      <WalletStack.Screen
        options={{ headerShown: false }}
        name="Wallet"
        component={WalletScreen}
      />
      <WalletStack.Screen
        options={{ headerShown: false }}
        name="Drawer"
        component={Drawer}
      />
    </WalletStack.Navigator>
  );
};

const Tabs = () => {
  return (
    <NavigationContainer theme={THEME}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Wallet") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Scan") {
              iconName = focused ? "scan" : "scan-outline";
            } else if (route.name === "History") {
              iconName = focused ? "time" : "time-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            }

            // You can return any component that you like here!
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={THEME.colors.primary}
              />
            );
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopColor: THEME.colors.primary,
          },
        })}
      >
        <Tab.Screen name="Wallet" component={WalletStacks} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Tabs;
