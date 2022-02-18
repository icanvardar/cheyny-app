import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import Container from "../../../components/Container";
import AdvancedHeader from "../../../components/AdvancedHeader";
import CustomText from "../../../components/CustomText";

import { gql, useQuery } from "@apollo/client";
import { useTheme } from "@react-navigation/native";
import { SIZES } from "../../../constants";

const GET_TOKEN = gql`
  query Token($id: Int!) {
    token(id: $id) {
      id
      displayImage
    }
  }
`;

const Product = ({ navigation, route }) => {
  const { tokenId } = route.params;

  const { colors } = useTheme();

  const { loading, error, data } = useQuery(GET_TOKEN, {
    variables: { tokenId },
  });

  return (
    <Container>
      <AdvancedHeader />
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
    </Container>
  );
};

export default Product;
