import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import useStore from "../../store/useStore";
import Container from "../../components/Container";

const Home = () => {
  const removeWallet = useStore((store) => store.removeWallet);
  const removePassword = useStore((store) => store.removePassword);
  const checkWallet = useStore((store) => store.checkWallet);

  const handleClick = async () => {
    await removeWallet();
    await removePassword();
    await checkWallet();
  };

  return (
    <Container>
      <TouchableOpacity onPress={handleClick}>
        <Text>Remove Wallet</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Home;
