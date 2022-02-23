import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import CustomText from "../CustomText";
import { SIZES } from "../../constants";

const Heading = ({ title }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <CustomText
        style={[{ color: colors.text }, styles.headingText]}
        fontWeight="bold"
      >
        {title}
      </CustomText>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.windowWidth / 24,
  },
  headingText: { fontSize: SIZES.h3 },
});
