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
import { useTheme } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import InputField from "../../../components/InputField";

import { SIZES } from "../../../constants";

import useStore from "../../../store/useStore";

const ImportFromSeed = ({ navigation }) => {
  const { colors } = useTheme();
  const [isChecked, setChecked] = useState(false);

  const [isActing, setActing] = useState(false);
  const [isPasswordGiven, setPasswordGiven] = useState(false);
  const [secretRecoveryPhrase, setSecretRecoveryPhrase] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const importWallet = useStore((state) => state.importWallet);
  const createPassword = useStore((state) => state.createPassword);

  const _handleNavigation = async () => {
    try {
      setActing(true);
      const importWalletTimeout = setTimeout(async () => {
        await importWallet(secretRecoveryPhrase);
        await createPassword(password);
        // console.log(secretRecoveryPhrase);
        navigation.navigate("Congratulations", {
          importedOrCreated: "imported",
        });
        setActing(false);
      }, 3000);

      return () => clearTimeout(importWalletTimeout);
    } catch (err) {
      setActing(false);
    }
  };

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
        <Brand hasBackButton={true} />
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
            <InputField
              // multiline
              isTogglable={true}
              title={"Secret Recovery Phrase"}
              onChangeText={(text) => setSecretRecoveryPhrase(text)}
              subtitle={
                "Typically 12 (sometimes 24) words seperated by single spaces."
              }
            />
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
            onPress={_handleNavigation}
            disabled={!isPasswordGiven}
            title={"Import"}
            loading={isActing}
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
  middleContainer: { flexGrow: 1, justifyContent: "space-between" },
  bottomContainer: { marginBottom: SIZES.windowWidth / 24 },
  passwordsContainer: {
    marginTop: SIZES.windowWidth / 12,
  },
  phrasesInputInfo: {
    fontSize: SIZES.windowWidth / 32,
    opacity: 0.5,
    marginTop: 4,
  },
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
