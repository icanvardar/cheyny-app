import { View, Text } from "react-native";
import React from "react";
import Container from "../../../components/Container";
import Brand from "../../../components/Brand";
import Button from "../../../components/Button";
import CustomText from "../../../components/CustomText";
import ProgressBar from "../../../components/ProgressBar";

const VerifyMnemonics = () => {
  return (
    <Container>
      <Brand />
      <ProgressBar status={3} />
      <CustomText>VerifyMnemonics</CustomText>
    </Container>
  );
};

export default VerifyMnemonics;
