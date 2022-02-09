import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

import { SIZES } from "../../constants";
import React from "react";
import Container from "../../components/Container";
import Brand from "../../components/Brand";

const Welcome = () => {
  const { colors } = useTheme();

  return (
    <Container>
      <Brand />
      <View style={styles.infoBox}>
        <Text style={[{ color: colors.text }, styles.infoBoxHeader]}>
          Wallet Setup
        </Text>
        <Text style={[{ color: colors.text }, styles.infoBoxBody]}>
          Before we start, Please Import your existing wallet or create a new
          one.
        </Text>
      </View>
    </Container>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  infoBox: { paddingTop: SIZES.windowWidth / 10 },
  infoBoxHeader: { fontSize: SIZES.h4, paddingBottom: 12 },
  infoBoxBody: { opacity: 0.5 },
});
