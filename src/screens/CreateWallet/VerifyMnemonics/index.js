import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Container from "../../../components/Container";
import Brand from "../../../components/Brand";
import Button from "../../../components/Button";
import CustomText from "../../../components/CustomText";
import ProgressBar from "../../../components/ProgressBar";

import { SIZES } from "../../../constants";
import { useTheme } from "@react-navigation/native";

const VerifyMnemonics = () => {
  const [mnemonics, setMnemonics] = useState(
    "gun mechanic lift second stamp clutch axis impulse nuclear omit damp rent".split(
      " "
    )
  );
  const [givenMnemonics, setGivenMnemonics] = useState([]);
  const [isMnemonicsGiven, setMnemonicsGiven] = useState(false);
  const { colors } = useTheme();

  const handleAddMnemonic = (phrase) => {
    setGivenMnemonics([...givenMnemonics, phrase]);
    const newMnemonics = mnemonics.filter((m) => m !== phrase);
    setMnemonics(newMnemonics);
  };

  const handleRemoveMnemonic = (phrase) => {
    const newGivenMnemonics = givenMnemonics.filter((m) => m !== phrase);
    setGivenMnemonics(newGivenMnemonics);
    setMnemonics([...mnemonics, phrase]);
  };

  return (
    <Container style={styles.container}>
      {/* Upper components */}
      <View>
        <Brand hasBackButton={true} />
        <ProgressBar status={3} />
      </View>
      {/* Middle components */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <View style={styles.infoBox}>
          <CustomText
            fontWeight="bold"
            style={[{ color: colors.text }, styles.infoBoxHeader]}
          >
            Verify Secret Phrase
          </CustomText>
          <CustomText style={[{ color: colors.text }, styles.infoBoxBody]}>
            Tap the words to put them next to each other in correct order.
          </CustomText>
        </View>
        <View style={styles.middleContainer}>
          <View
            style={[styles.mnemonicsContainer, { borderColor: colors.primary }]}
          >
            {givenMnemonics.map((mnemonic, key) => (
              <TouchableOpacity
                onPress={() => handleRemoveMnemonic(mnemonic)}
                key={mnemonic}
                style={styles.mnemonicsInnerContainer}
              >
                <CustomText style={{ color: colors.text }}>
                  {key + 1}. {mnemonic}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>
          <View style={[styles.givenMnemonicsContainer]}>
            {mnemonics.map((mnemonic, key) => (
              <TouchableOpacity
                onPress={() => handleAddMnemonic(mnemonic)}
                key={mnemonic}
                style={styles.mnemonicsInnerContainer}
              >
                <CustomText style={{ color: colors.text }}>
                  {mnemonic}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Bottom components */}
        <View style={styles.bottomContainer}>
          <Button
            onPress={() => navigation.navigate("Verify Mnemonics")}
            title={"Continue"}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default VerifyMnemonics;

const styles = StyleSheet.create({
  container: { justifyContent: "space-between" },
  infoBox: { paddingTop: SIZES.windowWidth / 20 },
  infoBoxHeader: { fontSize: SIZES.h5, paddingBottom: 12 },
  infoBoxBody: { opacity: 0.5 },
  middleContainer: { flex: 1 },
  bottomContainer: { marginBottom: SIZES.windowWidth / 24 },
  mnemonicsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: SIZES.windowWidth / 12,
    marginHorizontal: 12,
    borderWidth: 1,
    paddingTop: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    height: SIZES.windowWidth * 0.6,
    flexWrap: "wrap",
    marginBottom: 12,
  },
  givenMnemonicsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: SIZES.windowWidth / 24,
    marginHorizontal: 12,
    marginBottom: 24,
  },
  mnemonicsInnerContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  middleContainer: { flex: 1 },
  scrollViewContainer: { flexGrow: 1, justifyContent: "space-between" },
});
