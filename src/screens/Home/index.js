import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView
} from "react-native";
import React, { useEffect } from "react";
import CustomText from "../../components/CustomText";

import useStore from "../../store/useStore";
import Container from "../../components/Container";
import { useTheme } from "@react-navigation/native";
import { SIZES } from "../../constants";

const productsData = {
  image: "QmZSTNGaecoEjogJD1zw6qnh2hZL26WvfjPHkYeeH87ZCE",
  name: "Consensux",
  type: "Watch",
  specifications: ["Rose Gold", "Water proof to 30m"],
  details:
    "Manually wound mechanical movement. Caliber CHR 29‑535 PS Q. Split-Seconds ch",
  info: {
    amount: 10,
    year: 1990,
    country: "Italy",
  },
};

const productsArr = Array(5).fill(productsData);

const Home = () => {
  const { colors } = useTheme();
  const removeWallet = useStore((store) => store.removeWallet);
  const removePassword = useStore((store) => store.removePassword);
  const checkWallet = useStore((store) => store.checkWallet);

  const handleClick = async () => {
    await removeWallet();
    await removePassword();
    await checkWallet();
  };

  const ProductCard = () => {
    return (
      <View
        style={{
          marginTop: SIZES.windowWidth / 18,
          height: SIZES.windowWidth / 0.75,
          width: "100%",
          backgroundColor: colors.backgroundSecondary,
          borderRadius: 24,
          justifyContent: "center",
          paddingBottom: SIZES.windowWidth / 10
        }}
      >
        <View
          style={{
            paddingHorizontal: SIZES.paddingHorizontal,
            paddingBottom: SIZES.windowWidth / 12,
          }}
        >
          <CustomText style={{ fontSize: SIZES.h2, color: colors.text }}>
            Consensux
          </CustomText>
          <CustomText style={{ fontSize: SIZES.h5, color: colors.text }}>
            Watch
          </CustomText>
        </View>
        <Image
          style={{ height: SIZES.windowWidth / 2, zIndex: 1 }}
          resizeMode="contain"
          source={{
            uri: `https://ipfs.io/ipfs/QmZSTNGaecoEjogJD1zw6qnh2hZL26WvfjPHkYeeH87ZCE`,
          }}
        />
        <View
          style={{
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            left: 12,
          }}
        >
          <Image
            resizeMode="stretch"
            source={require("../../../assets/images/glitters.png")}
          />
        </View>
      </View>
    );
  };

  return (
    <Container>
      <TouchableOpacity onPress={handleClick}>
        <Text>Remove Wallet</Text>
      </TouchableOpacity>
      <View>
        <CustomText
          style={{ color: colors.text, fontSize: SIZES.h3 }}
          fontWeight="bold"
        >
          My Wallet
        </CustomText>
      </View>
      {/* Product Card */}
      <ProductCard />
      {/* Products List */}
      <FlatList />
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerContainer: {},
});
