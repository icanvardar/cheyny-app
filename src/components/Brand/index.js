import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SIZES } from "../../constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Brand = ({
  hasBackButton = false,
  size = "default",
  optionalEvent = null,
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <>
      {hasBackButton && (
        <TouchableOpacity
          onPress={() => {
            {
              optionalEvent ? optionalEvent() : navigation.goBack();
            }
          }}
          style={{
            position: "absolute",
            top: SIZES.windowHeight / 35,
            zIndex: 1,
          }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      )}
      <View style={styles.container}>
        <Text
          style={[
            [
              {
                color: colors.primary,
                fontSize:
                  size === "default"
                    ? SIZES.h1
                    : size === "medium"
                    ? SIZES.h3
                    : size === "small"
                    ? SIZES.h5
                    : null,
              },
              styles.brandName,
            ],
          ]}
        >
          Cheyny
        </Text>
      </View>
    </>
  );
};

export default Brand;

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingTop: SIZES.windowHeight / 35 },
  brandName: { fontFamily: "Costigue" },
});
