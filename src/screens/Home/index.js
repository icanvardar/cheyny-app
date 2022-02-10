import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import useStore from "../../store/useStore";

const Home = () => {
  const removeWallet = useStore((store) => store.removeWallet);
  const checkWallet = useStore((store) => store.checkWallet);

  const handleClick = async () => {
    await removeWallet();
    await checkWallet();
  };

  return (
    <View>
      <TouchableOpacity onPress={handleClick}>
        <Text>Remove Wallet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
