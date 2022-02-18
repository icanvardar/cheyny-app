import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import ProductScreen from "../../screens/Wallet/DrawerScreens/Product";
import ProofScreen from "../../screens/Wallet/DrawerScreens/Proof";
import TransferScreen from "../../screens/Wallet/DrawerScreens/Transfer";
import DeclareMissingScreen from "../../screens/Wallet/DrawerScreens/DeclareMissing";
import RepairScreen from "../../screens/Wallet/DrawerScreens/Repair";

import CustomText from "../../components/CustomText";
import { useTheme } from "@react-navigation/native";
import { SIZES } from "../../constants";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { colors } = useTheme();

  const CustomDrawerItem = (props) => {
    const _handleNavigation = () => {
      props.navigation.navigate(props.screenName);
    };

    return (
      <View
        style={{
          paddingHorizontal: 6,
          borderBottomWidth: 0.35,
          borderBottomColor: "gray",
          paddingVertical: 4,
        }}
      >
        <DrawerItem
          labelStyle={{
            color: colors.text,
            fontFamily: "Poppins-Bold",
            fontSize: 16,
            opacity: 0.75,
          }}
          label={props.label}
          onPress={_handleNavigation}
        />
      </View>
    );
  };

  const CustomDrawerContent = (props) => {
    const width = useWindowDimensions().width * 0.3;

    return (
      <DrawerContentScrollView {...props}>
        <View style={{ alignItems: "center" }}>
          <CustomText
            style={{
              fontFamily: "Costigue",
              color: colors.primary,
              fontSize: SIZES.h1,
              paddingTop: SIZES.windowWidth / 24,
            }}
          >
            Cheyny
          </CustomText>
        </View>
        <View
          style={{
            paddingVertical: SIZES.windowWidth / 24,
          }}
        >
          <CustomDrawerItem
            {...props}
            label={"Proof of Ownership"}
            screenName={"Proof"}
          />
          <CustomDrawerItem
            {...props}
            label={"Transfer my Certificate"}
            screenName={"Transfer"}
          />
          <CustomDrawerItem
            {...props}
            label={"Declare Missing"}
            screenName={"Declare Missing"}
          />
          <CustomDrawerItem {...props} label={"Repair"} screenName={"Repair"} />
        </View>
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName="Product"
      drawerPosition="right"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Product" component={ProductScreen} />
      <Drawer.Screen name="Proof" component={ProofScreen} />
      <Drawer.Screen name="Transfer" component={TransferScreen} />
      <Drawer.Screen name="Declare Missing" component={DeclareMissingScreen} />
      <Drawer.Screen name="Repair" component={RepairScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
