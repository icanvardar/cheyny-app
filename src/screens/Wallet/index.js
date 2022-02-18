import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import CustomText from "../../components/CustomText";

import useStore from "../../store/useStore";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import { useTheme } from "@react-navigation/native";
import { SIZES } from "../../constants";

import productData from "../../data/productsData.json";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const Home = ({ navigation }) => {
  const { colors } = useTheme();
  const removeWallet = useStore((store) => store.removeWallet);
  const removePassword = useStore((store) => store.removePassword);
  const checkWallet = useStore((store) => store.checkWallet);

  const [productToStart, setProductToStart] = useState(2);

  const listRef = useRef(null);

  useEffect(() => {
    console.log(listRef.current);
  }, listRef.current);

  const handleClick = async () => {
    await removeWallet();
    await removePassword();
    await checkWallet();
  };

  const _handleNavigation = (tokenId) => {
    navigation.navigate("Drawer", {
      screen: "Product",
      params: { tokenId },
    });
  };

  const ProductCard = ({ item }) => (
    <TouchableOpacity onPress={() => _handleNavigation(item.id)}>
      <LinearGradient
        style={{
          // backgroundColor: colors.backgroundSecondary,
          borderRadius: 8,
          height: SIZES.windowWidth / 0.8,
          width: SIZES.windowWidth / 1.35,
          marginLeft: SIZES.windowWidth / 20,
          justifyContent: "space-between",
          paddingHorizontal: SIZES.windowWidth / 14,
        }}
        colors={["#2A3656", "#112031"]}
      >
        <View style={{ flex: 1, marginTop: SIZES.windowWidth / 10 }}>
          <CustomText
            style={{
              color: colors.text,
              fontSize: SIZES.h3,
            }}
            fontWeight="bold"
          >
            {item.name}
          </CustomText>
          <CustomText
            fontWeight="thin"
            style={{ color: colors.text, fontSize: SIZES.h5 }}
          >
            {item.type}
          </CustomText>
        </View>
        <View style={{ flex: 3, zIndex: 1 }}>
          <Image
            style={{ height: SIZES.windowWidth / 1.5 }}
            resizeMode={"contain"}
            source={{ uri: `https://ipfs.io/ipfs/${item.image}` }}
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            margin: 0,
          }}
        >
          <Image
            style={{ width: SIZES.windowWidth / 1.35, zIndex: 2 }}
            resizeMode="cover"
            source={require("../../../assets/images/glitters.png")}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    return <ProductCard item={item} />;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={handleClick}>
        <Text>Remove Wallet</Text>
      </TouchableOpacity>
      {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: SIZES.paddingHorizontal,
            marginBottom: SIZES.windowWidth / 20,
          }}
        >
          <Heading title={"My Wallet"} />
        </View>
        <FlatList
          ref={listRef}
          showsHorizontalScrollIndicator={false}
          // initialScrollIndex={productToStart}
          horizontal
          data={productData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
