import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import CustomText from "../CustomText";
import { SIZES } from "../../constants";

const ProgressBar = ({ status }) => {
  const { colors } = useTheme();

  const PinPoint = ({ subtitle, done }) => {
    return (
      <View style={styles.pinPointContainer}>
        <View
          style={[
            styles.pinPointMain,
            {
              borderColor: done ? colors.primary : colors.text,
              opacity: done ? 1 : 0.5,
            },
          ]}
        >
          <View
            style={[
              styles.pinPointInner,
              {
                backgroundColor: done ? colors.primary : colors.text,
                opacity: done ? 1 : 0.5,
              },
            ]}
          ></View>
        </View>
        <View style={styles.pinPointTextContainer}>
          <CustomText style={[styles.pinPointText, { color: colors.text }]}>
            {subtitle}
          </CustomText>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.pinPointsHolder}>
      <PinPoint
        subtitle={"Create Password"}
        done={status >= 1 ? true : false}
      />
      <PinPoint subtitle={"Secure Wallet"} done={status >= 2 ? true : false} />
      <PinPoint
        hasHairline={false}
        subtitle={"Confirm Secret Recovery Phrase"}
        done={status >= 3 ? true : false}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  pinPointsHolder: { flexDirection: "row", justifyContent: "space-between" },
  pinPointContainer: {
    alignItems: "center",
    paddingTop: SIZES.windowWidth / 18,
  },
  pinPointMain: {
    height: 20,
    width: 20,
    borderRadius: 50,
    borderWidth: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  pinPointInner: {
    height: 10,
    width: 10,
    borderRadius: 50,
  },
  pinPointTextContainer: {
    width: SIZES.windowWidth / 4,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
    flexGrow: 1,
  },
  pinPointText: {
    opacity: 0.6,
    fontSize: 10,
    textAlign: "center",
  },
});
