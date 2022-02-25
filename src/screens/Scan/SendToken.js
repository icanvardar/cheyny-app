import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Container from "../../components/Container";
import { gql, useLazyQuery } from "@apollo/client";
import { TransferTokenContext } from "../../context/TransferTokenProvider";
import CustomText from "../../components/CustomText";
import { SIZES } from "../../constants";
import { useTheme } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { ethers } from "ethers";
import axios from "axios";
import { useBottomModal } from "react-native-bottom-modal";
import { FontAwesome } from "@expo/vector-icons";
import useSendToken from "../../hooks/useSendToken";

const WALLET_STORE_KEY = "wallet";

const GET_TOKENS = gql`
  query GetTokens($owner: String!) {
    tokens(where: { owner: $owner }) {
      tokenID
      tokenURI
    }
  }
`;

const SendToken = () => {
  const [walletInstance, setWalletInstance] = useState();
  const [products, setProducts] = useState();
  const { selectedTokenId, setSelectedTokenId, receiverAddress } =
    useContext(TransferTokenContext);
  const [isTxnSending, isTxnSent, sendToken] = useSendToken();

  const { showModal } = useBottomModal();

  const [getTokens, { data, loading, called, error }] = useLazyQuery(
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
        console.log(metadataArr);
        setProducts(metadataArr);
      },
    }
  );

  useEffect(() => {
    console.log(selectedTokenId);
  }, [selectedTokenId]);

  const _getIpfsData = async (tokenUri) => {
    let uri = tokenUri.replace("ipfs://", "");
    const { data } = await axios.get(`https://ipfs.io/ipfs/${uri}`);
    return data;
  };

  const { colors } = useTheme();

  const getWallet = async () => {
    const { privateKey } = JSON.parse(
      await SecureStore.getItemAsync(WALLET_STORE_KEY)
    );
    const foundWallet = new ethers.Wallet(privateKey);
    console.log(foundWallet);
    setWalletInstance(foundWallet);
  };

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(async () => {
    const prepare = async () => {
      await getTokens({
        variables: { owner: walletInstance.address.toLowerCase() },
      });
    };

    if (walletInstance && walletInstance.address) {
      // console.log(walletInstance.address);
      await prepare();
    }
  }, [walletInstance]);

  const trimAddress = (address) => {
    return address.slice(0, 5) + "..." + address.slice(-4, address.length);
  };

  const _handleTokenPress = (item) => {
    setSelectedTokenId(item.tokenID);
    showModal({
      // header: <ModalHeader />,
      content: (
        <View
          style={{
            width: SIZES.windowWidth,
            backgroundColor: colors.background,
            height: "100%",
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
            padding: SIZES.paddingHorizontal,
            alignItems: "center",
          }}
        >
          <CustomText
            fontWeight="bold"
            style={{
              fontSize: SIZES.p,
              color: colors.text,
            }}
          >
            Complete Transaction
          </CustomText>
          <Image
            style={{
              height: SIZES.windowWidth / 2,
              width: SIZES.windowWidth / 2,
            }}
            source={{ uri: `https://ipfs.io/ipfs/${item.image}` }}
          />
          <View style={{ justifyContent: "center", marginTop: -18 }}>
            <CustomText
              style={{ textAlign: "center", color: colors.text, opacity: 0.75 }}
            >
              Token #{item.tokenID}
            </CustomText>
            <CustomText
              style={{ textAlign: "center", color: colors.text, opacity: 0.5 }}
            >
              {item.name} {item.type}
            </CustomText>
          </View>
          <TouchableOpacity
            style={{
              borderRadius: 50,
              backgroundColor: colors.backgroundSecondary,
              padding: 18,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 24,
              textAlign: "center",
            }}
            onPress={sendToken}
          >
            <FontAwesome name="send" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      ),
    });
  };

  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => _handleTokenPress(item)}
        style={{
          width: "100%",
          backgroundColor: colors.backgroundSecondary,
          height: SIZES.windowWidth / 6,
          borderRadius: 8,
          // justifyContent: "center",
          paddingHorizontal: 24,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View>
          <Image
            style={{
              height: SIZES.windowWidth / 8,
              width: SIZES.windowWidth / 8,
            }}
            source={{ uri: `https://ipfs.io/ipfs/${item.image}` }}
          />
        </View>
        <View style={{ marginLeft: 12 }}>
          <CustomText style={{ color: colors.text, opacity: 0.75 }}>
            Token #{item.tokenID}
          </CustomText>
          <CustomText style={{ color: colors.text, opacity: 0.5 }}>
            {item.name} {item.type}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <CustomText
        fontWeight="bold"
        style={[styles.heading, { color: colors.text }]}
      >
        Transfer
      </CustomText>
      <View>
        {walletInstance && (
          <>
            <CustomText
              fontWeight="bold"
              style={[styles.addressText, { color: colors.text }]}
            >
              From: {trimAddress(walletInstance.address)}
            </CustomText>
            <CustomText
              fontWeight="bold"
              style={[styles.addressText, { color: colors.text }]}
            >
              To: {trimAddress(receiverAddress)}
            </CustomText>
          </>
        )}
      </View>
      {products && products.length > 0 ? (
        <>
          <Text
            font
            style={[
              styles.myTokens,
              { color: colors.text, fontWeight: "bold", marginTop: 36 },
            ]}
          >
            Select token you want to transfer:
          </Text>
          <FlatList
            style={{ marginTop: 12 }}
            data={products}
            keyExtractor={(item) => item.tokenID.toString()}
            renderItem={_renderItem}
          />
        </>
      ) : products && products.length === 0 ? (
        <CustomText
          fontWeight="bold"
          style={{ color: colors.text, marginTop: 24 }}
        >
          You need to get token before sending it!
        </CustomText>
      ) : null}
    </Container>
  );
};

export default SendToken;

const styles = StyleSheet.create({
  heading: { fontSize: SIZES.h3, marginTop: 12 },
  addressText: { fontSize: 16, opacity: 0.75, marginTop: 8 },
  myTokens: { fontSize: 16, marginTop: 8 },
});
