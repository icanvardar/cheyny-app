import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../../components/Container";
import AdvancedHeader from "../../../components/AdvancedHeader";
import CustomText from "../../../components/CustomText";
import Button from "../../../components/Button";
import { LinearGradient } from "expo-linear-gradient";

import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useTheme } from "@react-navigation/native";
import { SIZES } from "../../../constants";
import { timeDifference } from "../../../helpers/timeManipulations";
import axios from "axios";

const GET_TOKEN = gql`
  query GetToken($id: Int!) {
    token(id: $id) {
      tokenID
      tokenURI
      creator {
        id
      }
      histories {
        txnHash
        action
        from {
          id
        }
        to {
          id
        }
        createdAtTimestamp
      }
    }
  }
`;

const Product = ({ navigation, route }) => {
  const { item } = route.params;
  const [tokenMetadata, setTokenMetadata] = useState();

  const [isDetailsExpanded, setDetailsExpanded] = useState(false);

  const { colors } = useTheme();

  const [getToken, { called, loading, error, data }] = useLazyQuery(GET_TOKEN, {
    variables: { id: parseInt(item.tokenID) },
    fetchPolicy: "network-only",
    onCompleted: async (res) => {
      let uri = res.token.tokenURI.replace("ipfs://", "");
      // console.log(uri);
      const { data } = await axios.get(`https://ipfs.io/ipfs/${uri}`);
      setTokenMetadata({
        ...data,
        txnHash: res.token.txnHash,
        tokenID: res.token.tokenID,
        tokenURI: res.token.tokenURI,
        histories: res.token.histories,
      });
      return data;
    },
  });

  useEffect(() => {
    // console.log("------------");
    // console.log(tokenMetadata);
    // console.log("------------");
  }, [tokenMetadata]);

  useEffect(() => {
    if (item && item.tokenID) {
      getToken();
    }
  }, [item]);

  if (data) {
    console.log(data);
  }

  if (called && loading) {
    // console.log("called and loading");
  }

  const _handleCertificateNavigation = () => {
    navigation.navigate("Certificate", { item: tokenMetadata });
  };

  const _renderSpecification = ({ item: specificationItem }) => {
    return <SpecificationBox specificationItem={specificationItem} />;
  };

  const SpecificationBox = ({ specificationItem }) => {
    return (
      <LinearGradient
        style={{
          // backgroundColor: colors.backgroundSecondary,
          borderRadius: 8,
          height: SIZES.windowWidth / 5.5,
          width: SIZES.windowWidth / 5.5,
          borderColor: "#2D3C65",
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 6,
          marginRight: 18,
        }}
        colors={["#2A3656", "#112031"]}
      >
        <CustomText
          style={{
            fontSize: 12,
            textAlign: "center",
            color: colors.text,
            opacity: 0.75,
          }}
        >
          {specificationItem.name}
        </CustomText>
      </LinearGradient>
    );
  };

  const InfoBox = ({ info }) => {
    const keys = Object.keys(info);

    return (
      <View>
        {keys.map((key, index) => {
          let value = info[keys[index]];
          const str =
            keys[index].charAt(0).toUpperCase() + keys[index].slice(1);

          return (
            <View
              key={key}
              style={{
                borderRadius: 50,
                width: SIZES.windowWidth / 5,
                height: SIZES.windowWidth / 5,
                borderColor: colors.primary,
                borderWidth: 2,
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
                marginVertical: SIZES.windowWidth / 75,
              }}
            >
              <CustomText style={{ color: colors.text, fontSize: 12 }}>
                {str}
              </CustomText>
              <CustomText
                fontWeight="bold"
                style={{ color: colors.text, fontSize: 12 }}
              >
                {value}
              </CustomText>
            </View>
          );
        })}
      </View>
    );
  };

  const HistoryBox = ({ histories, tokenId }) => {
    const actionHandler = (action) => {
      let text;

      if (action === "BUY") {
        text = "bought";
      } else if (action === "MINT") {
        text = "minted";
      } else if (action === "TRANSFER") {
        text = "transferred";
      }

      // console.log(text);
      return text;
    };

    console.log(histories);

    const DotCircle = () => {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            borderRadius: 50,
            borderWidth: 0.5,
            borderColor: colors.primary,
            height: 8,
            width: 8,
            marginRight: 6,
          }}
        >
          <View
            style={{
              height: 8,
              width: 8,
              backgroundColor: colors.primary,
              borderRadius: 50,
            }}
          ></View>
        </View>
      );
    };

    return (
      <View style={{ marginBottom: 24, marginTop: 8 }}>
        {histories.map((h, index) => (
          <View
            key={index.toString()}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <DotCircle />
            <CustomText
              style={{
                color: colors.text,
                opacity: 0.75,
                paddingVertical: SIZES.windowWidth / 72,
              }}
            >
              Token #{tokenId} {actionHandler(h.action)}{" "}
              {timeDifference(h.createdAtTimestamp)} ago.
            </CustomText>
          </View>
        ))}
      </View>
    );
  };

  return (
    <Container>
      <AdvancedHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {loading && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator color={colors.primary} size={"large"} />
            <CustomText
              style={{
                color: colors.text,
                marginTop: SIZES.windowWidth / 24,
                opacity: 0.75,
              }}
            >
              Fetching token data...
            </CustomText>
          </View>
        )}
        {tokenMetadata && data && (
          <View>
            <View>
              <CustomText
                style={{
                  color: colors.text,
                  fontSize: SIZES.h5,
                  marginTop: SIZES.windowWidth / 24,
                }}
                fontWeight={"bold"}
              >
                {tokenMetadata.name} {tokenMetadata.type}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 18,
              }}
            >
              <InfoBox info={tokenMetadata.info} />
              <Image
                style={{ width: SIZES.windowWidth / 2 }}
                resizeMode="contain"
                source={{ uri: `https://ipfs.io/ipfs/${tokenMetadata.image}` }}
              />
            </View>
            <View>
              <CustomText
                style={{
                  color: colors.text,
                  fontSize: SIZES.p,
                  marginTop: SIZES.windowWidth / 18,
                }}
              >
                Specifications
              </CustomText>
              <FlatList
                style={{ marginTop: 12 }}
                horizontal
                data={tokenMetadata && tokenMetadata.specifications}
                renderItem={_renderSpecification}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View>
              <CustomText
                style={{
                  color: colors.text,
                  fontSize: SIZES.p,
                  marginTop: SIZES.windowWidth / 18,
                }}
              >
                Details
              </CustomText>
              <TouchableOpacity
                onPress={() => setDetailsExpanded(!isDetailsExpanded)}
              >
                <CustomText
                  style={{ marginTop: 10, color: colors.text, opacity: 0.7 }}
                >
                  {isDetailsExpanded
                    ? tokenMetadata.details
                    : tokenMetadata.details.slice(0, 80)}{" "}
                  {!isDetailsExpanded && tokenMetadata.details.length >= 80 && (
                    <CustomText
                      fontWeight="bold"
                      style={{ color: colors.primary, opacity: 0.75 }}
                    >
                      More...
                    </CustomText>
                  )}
                </CustomText>
              </TouchableOpacity>
            </View>
            <View>
              <CustomText
                style={{
                  color: colors.text,
                  fontSize: SIZES.p,
                  marginTop: SIZES.windowWidth / 18,
                }}
              >
                History
              </CustomText>
              <HistoryBox
                histories={tokenMetadata && tokenMetadata.histories}
                tokenId={tokenMetadata.tokenID}
              />
            </View>
          </View>
        )}
      </ScrollView>
      {data && (
        <Button
          onPress={_handleCertificateNavigation}
          title={"My Certificate"}
        />
      )}
    </Container>
  );
};

export default Product;
