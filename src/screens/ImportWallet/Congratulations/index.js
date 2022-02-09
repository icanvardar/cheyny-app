import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../../components/Container";
import Brand from "../../../components/Brand";
import Button from "../../../components/Button";
import CustomText from "../../../components/CustomText";
import { useTheme } from "@react-navigation/native";
import Checkbox from "expo-checkbox";

import { SIZES } from "../../../constants";

const ImportFromSeed = ({ navigation }) => {
  const { colors } = useTheme();

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
        <View style={styles.confettiContainer}>
          <Image
            style={styles.confetti}
            source={require("../../../../assets/images/confetti.png")}
          />
          <CustomText
            fontWeight="bold"
            style={{ color: colors.text, fontSize: SIZES.h5, paddingTop: SIZES.windowHeight / 24 }}
          >
            Congratulations!
          </CustomText>
          <CustomText
            style={{
              color: colors.text,
              textAlign: "center",
              opacity: 0.65,
              paddingVertical: SIZES.windowHeight / 24,
            }}
          >
            You’ve successfully imported your wallet. Remember to keep your
            Secret Recovery Phrase safe, it’s your responsibility!
          </CustomText>
          <CustomText
            style={{
              color: colors.text,
              textAlign: "center",
              opacity: 0.65,
              paddingVertical: SIZES.windowHeight / 72,
            }}
          >
            You can find your Secret Recovery Phrase in Settings {">"} Security
            {"&"} Privacy.
          </CustomText>
        </View>
        <View style={styles.bottomContainer}>
          <Button
            onPress={() => navigation.navigate("Congratulations")}
            title={"Done"}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default ImportFromSeed;

const styles = StyleSheet.create({
  container: { justifyContent: "space-between" },
  middleContainer: { flexGrow: 1, justifyContent: "space-between" },
  bottomContainer: { marginBottom: SIZES.windowWidth / 24 },
  confettiContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: SIZES.windowWidth / 6,
  },
  confetti: {
    height: SIZES.windowWidth / 5,
    width: SIZES.windowWidth / 5,
  },
});
