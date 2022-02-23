import { ethers } from "ethers";
import React, { createContext, useEffect, useState } from "react";
import { abi as cheyny_abi } from "../abis/Cheyny.json";
import useStore from "../store/useStore";

export const TransferTokenContext = createContext();

const TransferTokenProvider = ({ children }) => {
  const [selectedTokenId, setSelectedTokenId] = useState(null);
  const [receiverAddress, setReceiverAddress] = useState(null);
  const privateKey = useStore((state) => state.privateKey);
  const [balance, setBalance] = useState();

  useEffect(async () => {
    const walletInstance = new ethers.Wallet(privateKey);
    const providerInstance = new ethers.providers.JsonRpcProvider(
      "https://speedy-nodes-nyc.moralis.io/59b28fd76ed78cfb68259512/avalanche/testnet"
    );
    const foundBalance = await providerInstance.getBalance(
      walletInstance.address
    );
    console.log(ethers.utils.formatEther(foundBalance));
    setBalance(ethers.utils.formatEther(foundBalance));
  }, []);

  const sendToken = async () => {
    console.log(receiverAddress);
    console.log(selectedTokenId);

    try {
      const wallet = new ethers.Wallet(privateKey);
      console.log(wallet.address);
      const provider = new ethers.providers.JsonRpcProvider(
        "https://speedy-nodes-nyc.moralis.io/59b28fd76ed78cfb68259512/avalanche/testnet"
      );

      let gasLimit = "0x100000";
      const currentGasPrice = await provider.getGasPrice();
      let gasPrice = ethers.utils.hexlify(parseInt(currentGasPrice));

      const signer = wallet.connect(provider);

      const cheynyContract = new ethers.Contract(
        "0x90752051a56079471e76a72c1bb4796945D2f871",
        cheyny_abi,
        signer
      );

      const txnResult = cheynyContract.transferFrom(
        wallet.address,
        receiverAddress,
        selectedTokenId.toString(),
        {
          gasLimit,
          gasPrice,
          nonce: provider.getTransactionCount(wallet.address, "latest"),
        }
      );

      console.log(txnResult);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TransferTokenContext.Provider
      value={{
        selectedTokenId,
        setSelectedTokenId,
        sendToken,
        setReceiverAddress,
        receiverAddress,
        balance,
      }}
    >
      {children}
    </TransferTokenContext.Provider>
  );
};

export default TransferTokenProvider;
