import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

import { SIZES } from "../../constants";
import React from "react";
import Container from "../../components/Container";
import Brand from "../../components/Brand";
import Button from "../../components/Button";
import CustomText from "../../components/CustomText";

const Welcome = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <Container style={{ justifyContent: "space-between" }}>
      {/* top part of view */}
      <View style={styles.topView}>
        <Brand />
        <View style={styles.infoBox}>
          <CustomText
            fontWeight="bold"
            style={[{ color: colors.text }, styles.infoBoxHeader]}
          >
            Wallet Setup
          </CustomText>
          <CustomText style={[{ color: colors.text }, styles.infoBoxBody]}>
            Before we start, Please Import your existing wallet or create a new
            one.
          </CustomText>
        </View>
      </View>
      {/* middle part of view */}
      <View style={styles.middleView}>
        <Button
          style={styles.importWalletButton}
          title={"Import Wallet"}
          outlined={true}
        />
        <Button onPress={() => navigation.navigate("Create Wallet")} title={"Create a new wallet"} />
      </View>
      {/* bottom part of view */}
      <View style={styles.bottomView}>
        <CustomText style={[{ color: colors.text }, styles.termsInfo]}>
          By proceeding, you agree these
        </CustomText>
        <TouchableOpacity>
          <CustomText style={[{ color: colors.text }, styles.terms]}>
            Terms and Conditions.
          </CustomText>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  topView: { flex: 1 },
  middleView: { flex: 2, justifyContent: "center" },
  bottomView: { flex: 1, alignItems: "center", justifyContent: "flex-end" },
  termsInfo: { opacity: 0.5 },
  terms: { textDecorationLine: "underline" },
  infoBox: { paddingTop: SIZES.windowWidth / 8 },
  infoBoxHeader: { fontSize: SIZES.h5, paddingBottom: 12 },
  infoBoxBody: { opacity: 0.5 },
  importWalletButton: { marginBottom: 18 },
});
