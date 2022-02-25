import { ethers } from "ethers";
import { useState } from "react";
import { abi as cheyny_abi } from "../abis/Cheyny.json";

const PROVIDER_ENDPOINT =
  "https://speedy-nodes-nyc.moralis.io/59b28fd76ed78cfb68259512/avalanche/testnet";

const CONTRACT_ADDRESS = "0x90752051a56079471e76a72c1bb4796945D2f871";

const GAS_LIMIT = "0x100000";

const useSendToken = () => {
  const [isTxnSent, setTxnSent] = useState(false);
  const [isTxnSending, setTxnSending] = useState(false);

  const sendToken = async (privateKey, to, tokenID) => {
    try {
      setTxnSending(true);
      const wallet = new ethers.Wallet(privateKey);
      const provider = new ethers.providers.JsonRpcProvider(PROVIDER_ENDPOINT);

      const currentGasPrice = await provider.getGasPrice();
      let gasPrice = ethers.utils.hexlify(parseInt(currentGasPrice));

      const signer = wallet.connect(provider);

      const cheynyContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        cheyny_abi,
        signer
      );

      const from = wallet.address;

      const txnResult = await cheynyContract.transferFrom(
        from,
        to,
        selectedTokenId.toString(),
        {
          gasLimit: GAS_LIMIT,
          gasPrice,
          nonce: provider.getTransactionCount(wallet.address, "latest"),
        }
      );

      setTxnSending(false);
      setTxnSent(true);

      const txnLog = {
        from,
        to,
        tokenID,
        txnResult,
      };

      console.log(JSON.stringify(txnLog));

      return txnResult;
    } catch (err) {
      setTxnSending(false);
      console.log(err);
    }
  };

  return [isTxnSending, isTxnSent, sendToken];
};

export default useSendToken;
