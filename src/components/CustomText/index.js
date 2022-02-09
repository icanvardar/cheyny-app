import { View, Text } from "react-native";
import React from "react";

const CustomText = ({
  fontStyle = "normal",
  fontWeight = "normal",
  style,
  children,
}) => {
  const handleFontFamily = () => {
    switch (fontWeight) {
      case "light":
        if (fontStyle === "italic") {
          return "Poppins-LightItalic";
        }

        return "Poppins-Light";
      case "normal":
        if (fontStyle === "italic") {
          return "Poppins-Italic";
        }

        return "Poppins";
      case "bold":
        if (fontStyle === "italic") {
          return "Poppins-BoldItalic";
        }

        return "Poppins-Bold";
      case "black":
        if (fontStyle === "italic") {
          return "Poppins-BlackItalic";
        }

        return "Poppins-Black";
    }
  };

  return (
    <Text style={[{ fontFamily: handleFontFamily() }, style]}>{children}</Text>
  );
};

export default CustomText;
