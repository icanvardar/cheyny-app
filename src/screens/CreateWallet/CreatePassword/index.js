import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../../components/Container";
import Brand from "../../../components/Brand";
import Button from "../../../components/Button";
import CustomText from "../../../components/CustomText";
import ProgressBar from "../../../components/ProgressBar";
import { useTheme } from "@react-navigation/native";
import Checkbox from "expo-checkbox";

import { SIZES } from "../../../constants";

const CreatePassword = ({ navigation }) => {
  const { colors } = useTheme();
  const [isChecked, setChecked] = useState(false);

  const [isPasswordGiven, setPasswordGiven] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

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
    <Container style={styles.container}>
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
            <View style={styles.passwordContainer}>
              <CustomText
                style={[
                  {
                    color: colors.primary,
                    borderColor: colors.primary,
                  },
                  styles.passwordTitle,
                ]}
              >
                New Password
              </CustomText>
              <TextInput
                onChangeText={(text) => setPassword(text)}
                style={[
                  {
                    color: colors.text,
                    borderColor: colors.primary,
                  },
                  styles.passwordInput,
                ]}
              />
              <CustomText
                style={[
                  {
                    color: colors.text,
                  },
                  styles.inputInfo,
                ]}
              >
                Must be at least 8 characters.
              </CustomText>
            </View>
            {/* Confirm Password container */}
            <View>
              <CustomText
                style={[
                  {
                    color: colors.primary,
                    borderColor: colors.primary,
                  },
                  styles.passwordTitle,
                ]}
              >
                Confirm Password
              </CustomText>
              <TextInput
                onChangeText={(text) => setRepeatPassword(text)}
                style={[
                  {
                    color: colors.text,
                    borderColor: colors.primary,
                  },
                  styles.passwordInput,
                ]}
              />
            </View>
          </View>
          <View style={styles.checkboxContainer}>
            <View style={{ justifyContent: "center" }}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? colors.primary : undefined}
              />
            </View>
            <TouchableOpacity
              onPress={() => console.log("Go to learn more!")}
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
            onPress={() =>
              navigation.navigate("Mnemonics", {
                password,
              })
            }
            disabled={!isPasswordGiven}
            title={"Create Password"}
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
  passwordContainer: { marginBottom: SIZES.windowWidth / 20 },
  passwordTitle: { fontSize: SIZES.windowWidth / 24, marginBottom: 2 },
  passwordInput: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    width: "100%",
    fontSize: 16,
  },
  inputInfo: { fontSize: SIZES.windowWidth / 32, opacity: 0.5 },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: SIZES.windowWidth / 18,
    marginBottom: 12,
  },
  checkboxTextTouchable: { marginLeft: 12 },
  checkboxText: { opacity: 0.5, marginBottom: 12 },
  learnMore: {
    opacity: 1,
    textDecorationLine: "underline",
  },
});
