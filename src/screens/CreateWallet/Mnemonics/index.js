import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../../components/Container";
import Brand from "../../../components/Brand";
import Button from "../../../components/Button";
import CustomText from "../../../components/CustomText";
import ProgressBar from "../../../components/ProgressBar";
import Tooltip from "react-native-walkthrough-tooltip";
import { useNavigation, useTheme } from "@react-navigation/native";

import { SIZES } from "../../../constants";

import * as Clipboard from "expo-clipboard";

import useStore from "../../../store/useStore";

const Mnemonics = ({ route }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [toolTipVisible, setToolTipVisible] = useState(false);

  const removePassword = useStore((state) => state.removePassword);
  const removeWallet = useStore((state) => state.removeWallet);

  const wallet = useStore((state) => state.wallet);

  const showToast = () => {
    ToastAndroid.show("Copied!", ToastAndroid.SHORT);
  };

  const copyToClipboard = () => {
    Clipboard.setString(wallet.mnemonic.phrase);
    if (Platform.OS === "ios") {
      setToolTipVisible(true);
    } else if (Platform.OS === "android") {
      showToast();
    }
  };

  useEffect(() => {
    if (toolTipVisible) {
      const toolTipVisibleTimeout = setTimeout(() => {
        setToolTipVisible(false);
      }, 1000);

      return () => clearTimeout(toolTipVisibleTimeout);
    }
  }, [toolTipVisible]);

  const _handleBackEvent = async () => {
    try {
      await removePassword();
      await removeWallet();
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container style={styles.container}>
      {/* Upper components */}
      <View>
        <Brand optionalEvent={_handleBackEvent} hasBackButton={true} />
        <ProgressBar status={2} />
      </View>
      {/* Middle components */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <View>
          <View style={styles.infoBox}>
            <CustomText
              fontWeight="bold"
              style={[{ color: colors.text }, styles.infoBoxHeader]}
            >
              Your Secret Phrase
            </CustomText>
            <CustomText style={[{ color: colors.text }, styles.infoBoxBody]}>
              Write down or copy these words in the right order and save them
              somewhere safe.
            </CustomText>
          </View>
          <View style={styles.mnemonicsContainer}>
            {wallet.mnemonic.phrase.split(" ").map((mnemonic, key) => (
              <View
                key={mnemonic + Math.floor(Math.random() * 100).toString()}
                style={styles.mnemonicsInnerContainer}
              >
                <CustomText style={{ color: colors.text }}>
                  {key + 1}. {mnemonic}
                </CustomText>
              </View>
            ))}
          </View>
          {/* Copy button field */}
          <View style={styles.copyButtonContainer}>
            <Tooltip
              isVisible={toolTipVisible}
              backgroundColor={"transparent"}
              content={
                <View style={{ alignItems: "center" }}>
                  <CustomText style={{ color: colors.text }}>
                    Copied!
                  </CustomText>
                </View>
              }
              placement="bottom"
              contentStyle={{ backgroundColor: colors.background }}
              onClose={() => setToolTipVisible(false)}
            >
              <TouchableOpacity onPress={copyToClipboard}>
                <CustomText fontWeight="bold" style={{ color: colors.primary }}>
                  Copy
                </CustomText>
              </TouchableOpacity>
            </Tooltip>
          </View>
          <View
            style={[
              styles.mnemonicsInfoBox,
              { backgroundColor: colors.backgroundSecondary },
            ]}
          >
            <CustomText
              style={[
                {
                  color: colors.text,
                },
                styles.mnemonicsInfoTextHeader,
              ]}
            >
              Do not share your secret phrase!
            </CustomText>
            <CustomText
              style={[{ color: colors.text }, styles.mnemonicsInfoTextBody]}
            >
              If someone has your secret phase, they will have full control of
              your wallet.
            </CustomText>
          </View>
        </View>
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

export default Mnemonics;

const styles = StyleSheet.create({
  container: { justifyContent: "space-between" },
  infoBox: { paddingTop: SIZES.windowWidth / 20 },
  infoBoxHeader: { fontSize: SIZES.h5, paddingBottom: 12 },
  infoBoxBody: { opacity: 0.5 },
  bottomContainer: { marginBottom: SIZES.windowWidth / 24 },
  mnemonicsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: SIZES.windowWidth / 12,
    marginHorizontal: 12,
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
  mnemonicsInfoBox: {
    marginTop: SIZES.windowWidth / 18,
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
    borderRadius: 12,
    marginBottom: 24,
  },
  mnemonicsInfoTextHeader: {
    textAlign: "center",
    marginBottom: SIZES.windowWidth / 32,
    opacity: 0.65,
    fontSize: 16,
  },
  mnemonicsInfoTextBody: { textAlign: "center", opacity: 0.65 },
  scrollViewContainer: { flexGrow: 1, justifyContent: "space-between" },
  copyButtonContainer: {
    alignItems: "center",
    marginTop: 4,
  },
});
