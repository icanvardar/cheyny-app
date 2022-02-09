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

const ImportFromSeed = ({ navigation }) => {
  const { colors } = useTheme();
  const [isChecked, setChecked] = useState(false);

  const [isPasswordGiven, setPasswordGiven] = useState(false);
  const [secretRecoveryPhrase, setSecretRecoveryPhrase] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  useEffect(() => {
    if (
      password.length >= 8 &&
      repeatPassword.length >= 8 &&
      password === repeatPassword &&
      secretRecoveryPhrase.split(" ").length >= 12 &&
      isChecked &&
      password === repeatPassword
    ) {
      setPasswordGiven(true);
    } else {
      setPasswordGiven(false);
    }
  }, [password, repeatPassword, isChecked, secretRecoveryPhrase]);

  return (
    <Container style={styles.container}>
      {/* Upper components */}
      <View>
        <Brand />
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
              Import From Seed
            </CustomText>
          </View>
          <View style={styles.passwordsContainer}>
            {/* Secret recovery phrase container */}
            <View style={styles.secretRecoveryPhraseContainer}>
              <CustomText
                style={[
                  {
                    color: colors.primary,
                    borderColor: colors.primary,
                  },
                  styles.passwordTitle,
                ]}
              >
                Secret Recovery Phrase
              </CustomText>
              <TextInput
                multiline
                onChangeText={(text) => setSecretRecoveryPhrase(text)}
                style={[
                  {
                    color: colors.text,
                    borderColor: colors.primary,
                  },
                  styles.secretRecoveryPhraseInput,
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
                Typically 12 (sometimes 24) words seperated by single spaces.
              </CustomText>
            </View>
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
              navigation.navigate("Congratulations", {
                password,
              })
            }
            disabled={!isPasswordGiven}
            title={"Import"}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default ImportFromSeed;

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
  secretRecoveryPhraseContainer: { marginBottom: SIZES.windowWidth / 20 },
  secretRecoveryPhraseInput: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    width: "100%",
    fontSize: 16,
    height: SIZES.windowWidth / 3,
  },
});
