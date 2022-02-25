import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import QRCode from "react-native-qrcode-svg";

import Container from "../../components/Container";
import Heading from "../../components/Heading";
import CustomText from "../../components/CustomText";
import { useTheme } from "@react-navigation/native";
import { SIZES } from "../../constants";
import useStore from "../../store/useStore";

import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import Brand from "../../components/Brand";
import * as Clipboard from "expo-clipboard";

import useBalance from "../../hooks/useBalance";

const SECURITY_LIST_ITEMS = [
  { title: "Change Password" },
  { title: "Network" },
];

const ABOUT_LIST_ITEMS = [
  { title: "Cheyny Introduction" },
  { title: "Cheyny Website" },
  { title: "Follow Us" },
  { title: "Contact Us" },
  { title: "Privacy Policies" },
  { title: "User Agreements" },
];

const Settings = () => {
  const [isModaVisible, setModalVisible] = useState(false);
  const wallet = useStore((state) => state.wallet);
  const privateKey = useStore((state) => state.privateKey);
  const { colors } = useTheme();

  const [balance, getBalance] = useBalance();

  const copyToClipboard = () => {
    if (wallet && wallet.address) {
      Clipboard.setString(wallet.address);
    }
  };

  useEffect(async () => {
    const getBalanceTimeout = setTimeout(
      async () => await getBalance(privateKey),
      1000
    );

    return () => clearTimeout(getBalanceTimeout);
  }, []);

  const _renderItem = ({ item, index }, itemsLength) => (
    <TouchableOpacity
      style={[
        styles.listItem,
        {
          backgroundColor: colors.backgroundSecondary,
          borderBottomWidth: index === itemsLength - 1 ? 0 : 0.5,
          borderTopLeftRadius: index === 0 ? 12 : 0,
          borderTopRightRadius: index === 0 ? 12 : 0,
          borderBottomLeftRadius: index === itemsLength - 1 ? 12 : 0,
          borderBottomRightRadius: index === itemsLength - 1 ? 12 : 0,
        },
      ]}
    >
      <CustomText
        fontWeight="bold"
        style={[styles.listItemText, { color: colors.text }]}
      >
        {item.title}
      </CustomText>
      <MaterialIcons name="navigate-next" size={24} color="#E2CDCD" />
    </TouchableOpacity>
  );

  return (
    <Container style={{ marginBottom: -24 }}>
      <Heading title={"Settings"} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.addressCard,
            {
              backgroundColor: colors.backgroundSecondary,
            },
          ]}
        >
          {wallet && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CustomText
                  style={{ color: colors.text, opacity: 0.75, fontSize: 18 }}
                  fontWeight={"bold"}
                >
                  {wallet.address.slice(0, 5)}...
                  {wallet.address.slice(-4, wallet.address.length)}
                </CustomText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CustomText
                  style={{ color: colors.text, opacity: 0.75, fontSize: 18 }}
                  fontWeight={"bold"}
                >
                  Balance: {balance && balance} AVAX
                </CustomText>
              </View>
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  paddingRight: SIZES.paddingHorizontal,
                  marginTop: 24,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={{ marginRight: 8 }}
                  onPress={() => setModalVisible(!isModaVisible)}
                >
                  <Ionicons name="qr-code" size={24} color={colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={copyToClipboard}>
                  <Feather name="copy" size={24} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
        <View>
          <CustomText
            fontWeight="bold"
            style={[
              styles.listItemHeading1,
              {
                color: colors.text,
              },
            ]}
          >
            Security
          </CustomText>
          <FlatList
            bounces={false}
            data={SECURITY_LIST_ITEMS}
            keyExtractor={(item) => item.title}
            renderItem={(data) => _renderItem(data, SECURITY_LIST_ITEMS.length)}
          />
        </View>
        <View style={styles.list2}>
          <CustomText
            fontWeight="bold"
            style={[
              styles.listItemHeading2,
              {
                color: colors.text,
              },
            ]}
          >
            About
          </CustomText>
          <FlatList
            bounces={false}
            data={ABOUT_LIST_ITEMS}
            keyExtractor={(item) => item.title}
            renderItem={(data) => _renderItem(data, ABOUT_LIST_ITEMS.length)}
            ListFooterComponent={
              <View style={{ marginBottom: 24 }}>
                <Brand size="small" />
              </View>
            }
          />
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModaVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!isModaVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={[styles.modalView, { backgroundColor: colors.background }]}
          >
            <View
              style={{
                borderRadius: 8,
                borderWidth: 1,
                borderColor: colors.primary,
                padding: 8,
                marginTop: SIZES.windowWidth / 24,
              }}
            >
              <QRCode
                size={SIZES.windowWidth / 2.5}
                color={colors.primary}
                backgroundColor={colors.background}
                value={wallet.address}
              />
            </View>
            <CustomText fontWeight="bold" style={{ color: colors.text, marginTop: 12 }}>
              {wallet.address.slice(0, 5)}...
              {wallet.address.slice(-4, wallet.address.length)}
            </CustomText>
            <Pressable
              style={[
                styles.button,
                styles.buttonClose,
                { backgroundColor: colors.primary },
              ]}
              onPress={() => setModalVisible(!isModaVisible)}
            >
              <CustomText
                fontWeight="bold"
                style={[styles.textStyle, { color: colors.background }]}
              >
                Close
              </CustomText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default Settings;

const styles = StyleSheet.create({
  list2: { marginTop: SIZES.windowWidth / 24 },
  addressCard: {
    borderRadius: 12,
    paddingVertical: SIZES.windowWidth / 28,
    paddingHorizontal: SIZES.windowWidth / 24,
    marginTop: SIZES.windowWidth / 24,
  },
  listItem: {
    paddingVertical: SIZES.windowWidth / 28,
    paddingHorizontal: SIZES.windowWidth / 24,
    borderBottomColor: "gray",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemText: {
    opacity: 0.75,
  },
  listItemHeading1: {
    fontSize: SIZES.h5,
    marginBottom: SIZES.windowWidth / 48,
    marginTop: SIZES.windowWidth / 24,
  },
  listItemHeading2: {
    fontSize: SIZES.h5,
    marginBottom: SIZES.windowWidth / 48,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 12,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
