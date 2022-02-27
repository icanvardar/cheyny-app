import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
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

import { gql, useLazyQuery, useQuery } from "@apollo/client";
import axios from "axios";

const GET_TOKENS = gql`
  query GetTokens($owner: String!) {
    tokens(where: { owner: $owner }) {
      tokenID
      tokenURI
    }
  }
`;

const Home = ({ navigation }) => {
  const { colors } = useTheme();
  const removeWallet = useStore((store) => store.removeWallet);
  const removePassword = useStore((store) => store.removePassword);
  const checkWallet = useStore((store) => store.checkWallet);
  const wallet = useStore((state) => state.wallet);

  const [products, setProducts] = useState();

  const [refreshing, setRefreshing] = useState(false);

  const _getIpfsData = async (tokenUri) => {
    let uri = tokenUri.replace("ipfs://", "");
    const { data } = await axios.get(`https://ipfs.io/ipfs/${uri}`);
    // console.log(data);
    return data;
  };

  const [getTokens, { data, loading, called, error, refetch }] = useLazyQuery(
    GET_TOKENS,
    {
      onCompleted: async (data) => {
        let metadataArr = [];
        for await (const datum of data.tokens) {
          const metadata = await await _getIpfsData(datum.tokenURI);
          metadataArr.push({
            tokenID: datum.tokenID,
            ...metadata,
          });
        }
        setProducts(metadataArr);
      },
    }
  );

  const _onRefresh = async () => {
    try {
      setRefreshing(true);
      if (called) {
        await refetch();
      }
      setRefreshing(false);
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(async () => {
    const prepare = async () => {
      // console.log("Address------" + wallet.address.toLowerCase());
      await getTokens({ variables: { owner: wallet.address.toLowerCase() } });
    };

    if (wallet && wallet.address) {
      // console.log(wallet.address);
      await prepare();
    }
  }, [wallet]);

  const listRef = useRef(null);

  const _handleNavigation = (item) => {
    // console.log(item);
    navigation.navigate("Drawer", {
      screen: "Product",
      params: { item },
    });
  };

  const ProductCard = ({ item }) => (
    <TouchableOpacity onPress={() => _handleNavigation(item)}>
      <LinearGradient
        style={{
          // backgroundColor: colors.backgroundSecondary,
          borderRadius: 8,
          height: SIZES.windowWidth / 0.9,
          width:
            products && products.length === 1
              ? SIZES.windowWidth / 1.2
              : SIZES.windowWidth / 1.35,
          marginLeft:
            products && products.length !== 1 ? SIZES.windowWidth / 20 : 0,
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

  const EmptyComponent = () => {
    return (
      <View>
        <LinearGradient
          style={{
            // backgroundColor: colors.backgroundSecondary,
            borderRadius: 8,
            height: SIZES.windowWidth / 0.9,
            width: SIZES.windowWidth / 1.2,
            justifyContent: "space-between",
            paddingHorizontal: SIZES.windowWidth / 14,
          }}
          colors={["#15223D", colors.background]}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <CustomText
              style={{
                color: colors.text,
                fontSize: 18,
                textAlign: "center",
                marginBottom: 12,
              }}
              fontWeight="bold"
            >
              You don’t have any product yet!
            </CustomText>
            <CustomText
              fontWeight="thin"
              style={{
                color: colors.text,
                fontSize: 16,
                opacity: 0.75,
                textAlign: "center",
              }}
            >
              In order to import your first product, please scan the QR code of
              your product from the scan page.{" "}
            </CustomText>
          </View>
        </LinearGradient>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return <ProductCard item={item} />;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <TouchableOpacity onPress={handleClick}>
        <Text>Remove Wallet</Text>
      </TouchableOpacity> */}
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
        <ScrollView
          // bounces={false}
          style={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={_onRefresh}
            />
          }
        >
          {loading && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size={"large"} color={colors.primary} />
            </View>
          )}
          {products && products.length > 0 && (
            <>
              <FlatList
                bounces={false}
                contentContainerStyle={{
                  width: products && products.length === 1 ? "100%" : "auto",
                  justifyContent:
                    products && products.length === 1 ? "center" : "flex-start",
                }}
                ref={listRef}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={_onRefresh}
                // initialScrollIndex={productToStart}
                horizontal
                data={products && products}
                renderItem={renderItem}
                keyExtractor={(item) => item.tokenID}
              />
            </>
          )}
          {products && products.length === 0 && (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <EmptyComponent />
            </View>
          )}
        </ScrollView>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
