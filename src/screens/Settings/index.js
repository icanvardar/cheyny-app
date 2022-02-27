import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import QRCode from "react-native-qrcode-svg";

import { AntDesign } from "@expo/vector-icons";

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

import Tooltip from "react-native-walkthrough-tooltip";

import * as Linking from "expo-linking";

import useBalance from "../../hooks/useBalance";

const SECURITY_LIST_ITEMS = [
  { title: "Change Password" },
  { title: "Network" },
  { title: "Logout" },
];

const ABOUT_LIST_ITEMS = [
  { title: "Cheyny Introduction" },
  { title: "Cheyny Website" },
  { title: "Follow Us" },
  { title: "Contact Us" },
  { title: "Privacy Policies" },
  { title: "User Agreements" },
];

const Settings = ({ navigation }) => {
  const [isModaVisible, setModalVisible] = useState(false);
  const wallet = useStore((state) => state.wallet);
  const privateKey = useStore((state) => state.privateKey);
  const { colors } = useTheme();

  const [selectedNetwork, setSelectedNetwork] = useState("testnet");

  const [toolTipVisible, setToolTipVisible] = useState(false);

  const removeWallet = useStore((store) => store.removeWallet);
  const removePassword = useStore((store) => store.removePassword);
  const checkWallet = useStore((store) => store.checkWallet);

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isNetworkModalVisible, setIsNetworkModalVisible] = useState(false);

  const [balance, getBalance] = useBalance();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (toolTipVisible) {
      const toolTipVisibleTimeout = setTimeout(() => {
        setToolTipVisible(false);
      }, 1000);

      return () => clearTimeout(toolTipVisibleTimeout);
    }
  }, [toolTipVisible]);

  const showToast = () => {
    ToastAndroid.show("Copied!", ToastAndroid.SHORT);
  };

  const copyToClipboard = () => {
    if (wallet && wallet.address) {
      Clipboard.setString(wallet.address);
      if (Platform.OS === "ios") {
        setToolTipVisible(true);
      } else if (Platform.OS === "android") {
        showToast();
      }
    }
  };

  const handleLogout = async () => {
    await removeWallet();
    await removePassword();
    await checkWallet();
  };

  useEffect(async () => {
    await getBalance(privateKey);
  }, []);

  const _onRefresh = async () => {
    setRefreshing(true);
    await getBalance(privateKey);
    setRefreshing(false);
  };

  const _renderItem = ({ item, index }, itemsLength) => (
    <TouchableOpacity
      onPress={async () => {
        if (item.title === "Change Password") {
          navigation.navigate(item.title);
        } else if (item.title === "Logout") {
          setIsLogoutModalVisible(true);
        } else if (
          item.title === "Cheyny Website" ||
          item.title === "Cheyny Introduction" ||
          item.title === "Follow Us" ||
          item.title === "Contact Us" ||
          item.title === "Privacy Policies" ||
          item.title === "User Agreements"
        ) {
          Linking.openURL("https://www.cheyny.com/");
        } else if (item.title === "Network") {
          setIsNetworkModalVisible(true);
        }
      }}
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
        refreshControl={
          <RefreshControl
            tintColor={colors.primary}
            refreshing={refreshing}
            onRefresh={_onRefresh}
          />
        }
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
                  Balance: {balance && parseFloat(balance).toFixed(2)} AVAX
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
                    <Feather name="copy" size={24} color={colors.primary} />
                  </TouchableOpacity>
                </Tooltip>
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
            <CustomText
              fontWeight="bold"
              style={{ color: colors.text, marginTop: 12 }}
            >
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={isNetworkModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setIsNetworkModalVisible(!isNetworkModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={[styles.modalView, { backgroundColor: colors.background }]}
          >
            <CustomText
              fontWeight="bold"
              style={[
                styles.textStyle,
                { color: colors.text, marginVertical: 12, fontSize: SIZES.p },
              ]}
            >
              Network
            </CustomText>
            <View>
              <TouchableOpacity
                onPress={() => setSelectedNetwork("mainnet")}
                style={{
                  padding: 12,
                  width: SIZES.windowWidth / 2,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CustomText
                  fontWeight="bold"
                  style={{ color: colors.text, opacity: 0.75 }}
                >
                  Mainnet
                </CustomText>
                {selectedNetwork === "mainnet" && (
                  <AntDesign
                    name="checksquare"
                    size={18}
                    color={colors.primary}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedNetwork("testnet")}
                style={{
                  padding: 12,
                  width: SIZES.windowWidth / 2,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CustomText
                  fontWeight="bold"
                  style={{ color: colors.text, opacity: 0.75 }}
                >
                  Fuji Testnet
                </CustomText>
                {selectedNetwork === "testnet" && (
                  <AntDesign
                    name="checksquare"
                    size={18}
                    color={colors.primary}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  { backgroundColor: colors.text, marginHorizontal: 4 },
                ]}
                onPress={() => setIsNetworkModalVisible(!isNetworkModalVisible)}
              >
                <CustomText
                  fontWeight="bold"
                  style={[styles.textStyle, { color: colors.background }]}
                >
                  Cancel
                </CustomText>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  { backgroundColor: colors.primary, marginHorizontal: 4 },
                ]}
                onPress={() => setIsNetworkModalVisible(!isNetworkModalVisible)}
              >
                <CustomText
                  fontWeight="bold"
                  style={[styles.textStyle, { color: colors.background }]}
                >
                  Yes
                </CustomText>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLogoutModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setIsLogoutModalVisible(!isLogoutModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={[styles.modalView, { backgroundColor: colors.background }]}
          >
            <CustomText
              fontWeight="bold"
              style={[
                styles.textStyle,
                { color: colors.text, marginVertical: 12 },
              ]}
            >
              Are you sure you want to logout?
            </CustomText>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  { backgroundColor: colors.text, marginHorizontal: 4 },
                ]}
                onPress={() => setIsLogoutModalVisible(!isLogoutModalVisible)}
              >
                <CustomText
                  fontWeight="bold"
                  style={[styles.textStyle, { color: colors.background }]}
                >
                  Cancel
                </CustomText>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  { backgroundColor: colors.primary, marginHorizontal: 4 },
                ]}
                onPress={handleLogout}
              >
                <CustomText
                  fontWeight="bold"
                  style={[styles.textStyle, { color: colors.background }]}
                >
                  Yes
                </CustomText>
              </Pressable>
            </View>
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
    borderRadius: 8,
    paddingHorizontal: 35,
    paddingVertical: 18,
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
    borderRadius: 8,
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
