import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../../components/Container";
import Brand from "../../../components/Brand";
import Button from "../../../components/Button";
import CustomText from "../../../components/CustomText";
import ProgressBar from "../../../components/ProgressBar";
import { useTheme } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import InputField from "../../../components/InputField";
import * as Linking from "expo-linking";

import { SIZES } from "../../../constants";

import useStore from "../../../store/useStore";

const CreatePassword = ({ navigation }) => {
  const { colors } = useTheme();
  const [isChecked, setChecked] = useState(false);

  const [isPasswordGiven, setPasswordGiven] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [isActing, setActing] = useState(false);

  const createPassword = useStore((state) => state.createPassword);
  const createWallet = useStore((state) => state.createWallet);
  const setPasswordEntered = useStore((state) => state.setPasswordEntered);
  const [hasError, setHasError] = useState(false);

  const _handleNavigation = async (givenPassword) => {
    try {
      setActing(true);
      // setPasswordEntered();
      // sets password to SecureStore
      await createPassword(givenPassword);
      // creates wallet for Mnemonics screen
      await createWallet();
      navigation.navigate("Mnemonics");
      setActing(false);
      setHasError(false);
    } catch (err) {
      setHasError(true);
      console.log(err);
    } finally {
      setActing(false);
    }
  };

  useEffect(() => {
    if (
      password.length >= 8 &&
      repeatPassword.length >= 8 &&
      password === repeatPassword &&
      isChecked &&
      password === repeatPassword
    ) {
      setPasswordGiven(true);
    } else {
      setPasswordGiven(false);
    }
  }, [password, repeatPassword, isChecked]);

  return (
    <Container isKeyable={true} style={styles.container}>
      {/* Upper components */}
      <View>
        <Brand hasBackButton={true} />
        <ProgressBar status={1} />
      </View>
      {/* Middle components */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.middleContainer}
      >
        <View>
          <View style={styles.infoBox}>
            <CustomText
              fontWeight="bold"
              style={[{ color: colors.text }, styles.infoBoxHeader]}
            >
              Create Password
            </CustomText>
            <CustomText style={[{ color: colors.text }, styles.infoBoxBody]}>
              This password will unlock your Cheyny wallet only to this device.
            </CustomText>
          </View>
          <View style={styles.passwordsContainer}>
            {/* Password container */}
            <InputField
              keyboardType="number-pad"
              isTogglable={true}
              title={"New Password"}
              onChangeText={(text) => setPassword(text)}
              subtitle={"Must be at least 8 characters."}
            />
            {/* Confirm Password container */}
            <InputField
              keyboardType="number-pad"
              isTogglable={true}
              title={"Confirm Password"}
              onChangeText={(text) => setRepeatPassword(text)}
            />
          </View>
          <View style={[styles.checkboxContainer]}>
            <TouchableOpacity
              onPress={() => setChecked(!isChecked)}
              style={{
                justifyContent: "center",
                paddingRight: 8,
                paddingVertical: 8,
              }}
            >
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? colors.primary : undefined}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                Linking.openURL("https://www.cheyny.com/technology")
              }
              style={styles.checkboxTextTouchable}
            >
              <CustomText>
                <CustomText
                  style={[styles.checkboxText, { color: colors.text }]}
                >
                  I understand that Cheyny can not recover this password for me.{" "}
                </CustomText>

                <CustomText
                  style={[
                    {
                      color: colors.primary,
                      textDecorationColor: colors.primary,
                    },
                    styles.learnMore,
                  ]}
                >
                  Learn more.
                </CustomText>
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Button
            onPress={() => _handleNavigation(password)}
            disabled={!isPasswordGiven}
            title={"Create Password"}
            loading={isActing}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({
  container: { justifyContent: "space-between" },
  infoBox: { paddingTop: SIZES.windowWidth / 20 },
  infoBoxHeader: { fontSize: SIZES.h5, paddingBottom: 12 },
  infoBoxBody: { opacity: 0.5 },
  middleContainer: { flexGrow: 1, justifyContent: "space-between" },
  bottomContainer: { marginBottom: SIZES.windowWidth / 24 },
  passwordsContainer: {
    marginTop: SIZES.windowWidth / 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: SIZES.windowWidth / 18,
    marginBottom: 12,
  },
  checkboxTextTouchable: { marginLeft: 6 },
  checkboxText: { opacity: 0.5, marginBottom: 12 },
  learnMore: {
    opacity: 1,
    textDecorationLine: "underline",
  },
  checkbox: {
    padding: 10,
  },
});
