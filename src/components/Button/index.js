import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { SIZES } from "../../constants";
import CustomText from "../CustomText";

const Button = ({
  title,
  onPress,
  outlined = false,
  style = {},
  size = "normal",
  disabled = false,
  loading = false,
}) => {
  const { colors } = useTheme();

  const handleSize = () => {
    switch (size) {
      case "smaller":
        return SIZES.windowWidth / 65;
      case "small":
        return SIZES.windowWidth / 55;
      case "normal":
        return SIZES.windowWidth / 40;
      case "big":
        return SIZES.windowWidth / 30;
      case "bigger":
        return SIZES.windowWidth / 25;
    }
  };

  const handleFontSize = () => {
    switch (size) {
      case "smaller":
        return SIZES.windowWidth / 40;
      case "small":
        return SIZES.windowWidth / 35;
      case "normal":
        return SIZES.windowWidth / 25;
      case "big":
        return SIZES.windowWidth / 20;
      case "bigger":
        return SIZES.windowWidth / 15;
    }
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          backgroundColor: outlined ? colors.background : colors.primary,
          borderWidth: outlined ? 1 : 0,
          borderColor: colors.primary,
          paddingVertical: handleSize(),
          opacity: disabled ? 0.25 : 1,
        },
        styles.buttonContainer,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.background}/>
      ) : (
        <CustomText
          fontWeight="bold"
          style={[
            {
              opacity: disabled ? 0.25 : 1,
              color: outlined ? colors.primary : colors.background,
              fontSize: handleFontSize(),
            },
          ]}
        >
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    borderRadius: 8,
  },
});
