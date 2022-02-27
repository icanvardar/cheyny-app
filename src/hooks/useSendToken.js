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
  const [txn, setTxn] = useState();

  const sendToken = async (privateKey, to, tokenID) => {
    console.log("sendToken methods triggered.");
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
        tokenID.toString(),
        {
          value: ethers.utils.parseEther("0.5"),
          gasLimit: GAS_LIMIT,
          gasPrice,
          nonce: provider.getTransactionCount(wallet.address, "latest"),
        }
      );

      setTxnSending(false);
      setTxnSent(true);
      setTxn(txnResult);

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

  return [isTxnSending, isTxnSent, sendToken, txn];
};

export default useSendToken;
