import { View, Text } from "react-native";
import React from "react";
import Container from "../../../components/Container";
import AdvancedHeader from "../../../components/AdvancedHeader";
import CustomText from "../../../components/CustomText";
import { useTheme } from "@react-navigation/native";

const DeclareMissing = () => {
  const { colors } = useTheme();

  return (
    <Container>
      <AdvancedHeader />
      <View
        style={{
          height: "85%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomText
          style={{ color: colors.text, fontSize: 20, textAlign: "center" }}
        >
          You can declare your missing product from here.
        </CustomText>
        <CustomText
          style={{ color: colors.text, marginTop: 24, opacity: 0.75 }}
        >
          This screen is for demo purposes.
        </CustomText>
      </View>
    </Container>
  );
};

export default DeclareMissing;
