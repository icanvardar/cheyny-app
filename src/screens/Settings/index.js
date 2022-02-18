import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";

import Container from "../../components/Container";
import Heading from "../../components/Heading";
import CustomText from "../../components/CustomText";
import { useTheme } from "@react-navigation/native";
import { SIZES } from "../../constants";
import useStore from "../../store/useStore";

import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import Brand from "../../components/Brand";
import * as Clipboard from "expo-clipboard";

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
  const wallet = useStore((state) => state.wallet);
  const { colors } = useTheme();

  const copyToClipboard = () => {
    if (wallet && wallet.address) {
      Clipboard.setString(wallet.address);
    }
  };

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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CustomText
                style={{ color: colors.primary, opacity: 0.75, fontSize: 18 }}
                fontWeight={"bold"}
              >
                {wallet.address.slice(0, 5)}...
                {wallet.address.slice(-4, wallet.address.length)}
              </CustomText>
              <TouchableOpacity onPress={copyToClipboard}>
                <Feather name="copy" size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>
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
            ListFooterComponent={<Brand size="small" />}
          />
        </View>
      </ScrollView>
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
});
