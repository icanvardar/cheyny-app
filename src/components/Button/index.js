import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { SIZES } from "../../constants";
import CustomText from "../CustomText";

const Button = ({ title, onPress, outlined = false, style = {} }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: outlined ? colors.background : colors.primary,
          borderWidth: outlined && 1,
          borderColor: outlined && colors.primary,
        },
        styles.buttonContainer,
        style,
      ]}
    >
      <CustomText
        fontWeight="bold"
        style={[
          styles.buttonText,
          {
            color: outlined ? colors.primary : colors.background,
          },
        ]}
      >
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    paddingVertical: SIZES.windowWidth / 30,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: SIZES.p,
  },
});
