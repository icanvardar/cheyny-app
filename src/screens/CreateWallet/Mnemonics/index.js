import { View, Text } from "react-native";
import React from "react";
import Container from "../../../components/Container";
import Brand from "../../../components/Brand";
import Button from "../../../components/Button";
import CustomText from "../../../components/CustomText";
import ProgressBar from "../../../components/ProgressBar";

const Mnemonics = () => {
  return (
    <Container>
      <Brand />
      <ProgressBar status={2} />
      <CustomText>Mnemonics</CustomText>
    </Container>
  );
};

export default Mnemonics;
