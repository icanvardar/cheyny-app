import { ethers } from "ethers";
import { useState } from "react";

const PROVIDER_ENDPOINT =
  "https://speedy-nodes-nyc.moralis.io/59b28fd76ed78cfb68259512/avalanche/testnet";

const useBalance = () => {
  const [balance, setBalance] = useState();

  const getBalance = async (privateKey) => {
    try {
      const walletInstance = new ethers.Wallet(privateKey);
      const providerInstance = new ethers.providers.JsonRpcProvider(
        PROVIDER_ENDPOINT
      );
      let foundBalance = await providerInstance.getBalance(
        walletInstance.address
      );
      foundBalance = ethers.utils.formatEther(foundBalance);
      setBalance(foundBalance);
    } catch (err) {
      console.log(err);
    }
  };

  return [balance, getBalance];
};

export default useBalance;
