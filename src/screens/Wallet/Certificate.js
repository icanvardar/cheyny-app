import { View, Text } from "react-native";
import React from "react";

const Certificate = ({ navigation, route }) => {
  const { serialNumber } = route.params;

  console.log(serialNumber);

  return (
    <View>
      <Text>Certificate</Text>
    </View>
  );
};

export default Certificate;
