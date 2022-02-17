import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../../screens/Home";
import ProductsScreen from "../../screens/Products";
import ProofScreen from "../../screens/Products/Proof";
import TransferScreen from "../../screens/Products/Transfer";
import DeclareMissingScreen from "../../screens/Products/DeclareMissing";
import RepairScreen from "../../screens/Products/Repair";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Products" component={ProductsScreen} />
      <Drawer.Screen name="Proof" component={ProofScreen} />
      <Drawer.Screen name="Transfer" component={TransferScreen} />
      <Drawer.Screen name="Declare Missing" component={DeclareMissingScreen} />
      <Drawer.Screen name="Repair" component={RepairScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
