import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SIZES } from "../../constants";
import { useNavigation, useTheme } from "@react-navigation/native";

const AdvancedHeader = () => {
  const navigation = useNavigation();

  const { colors } = useTheme();

  return (
    <View
      style={{
        // paddingHorizontal: SIZES.paddingHorizontal,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: SIZES.windowHeight / 35,
        // width: SIZES.windowWidth,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Image source={require("../../../assets/images/drawer-icon.png")} />
      </TouchableOpacity>
    </View>
  );
};

export default AdvancedHeader;
