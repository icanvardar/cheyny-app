import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const AdvancedHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={{ paddingHorizontal: SIZES.paddingHorizontal }}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          position: "absolute",
          top: SIZES.windowHeight / 35,
          zIndex: 1,
        }}
      >
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

export default AdvancedHeader;
