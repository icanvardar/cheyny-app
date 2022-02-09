import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SIZES } from "../../constants";
import { useTheme } from "@react-navigation/native";

const Brand = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[
          [
            {
              color: colors.primary,
            },
            styles.brandName,
          ],
        ]}
      >
        Cheyny
      </Text>
    </View>
  );
};

export default Brand;

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingTop: SIZES.windowHeight / 100 },
  brandName: { fontFamily: "Costigue", fontSize: SIZES.h1 },
});
