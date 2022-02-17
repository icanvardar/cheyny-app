import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ProductScreen from "../../screens/Wallet/DrawerScreens/Product";
import ProofScreen from "../../screens/Wallet/DrawerScreens/Proof";
import TransferScreen from "../../screens/Wallet/DrawerScreens/Transfer";
import DeclareMissingScreen from "../../screens/Wallet/DrawerScreens/DeclareMissing";
import RepairScreen from "../../screens/Wallet/DrawerScreens/Repair";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Product" drawerPosition="right">
      <Drawer.Screen name="Product" component={ProductScreen} />
      <Drawer.Screen name="Proof" component={ProofScreen} />
      <Drawer.Screen name="Transfer" component={TransferScreen} />
      <Drawer.Screen name="Declare Missing" component={DeclareMissingScreen} />
      <Drawer.Screen name="Repair" component={RepairScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
