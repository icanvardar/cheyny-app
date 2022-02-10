import { ethers } from "ethers";

class WalletHandler {
  constructor() {}

  createWallet() {
    const createdWallet = ethers.Wallet.createRandom();
    return {
      address: createdWallet.address,
      privateKey: createdWallet.privateKey,
      mnemonic: createdWallet.mnemonic,
    };
  }

  importWallet(mnemonic) {
    const importedWallet = ethers.Wallet.fromMnemonic(mnemonic);
    return {
      address: importedWallet.address,
      privateKey: importedWallet.privateKey,
      mnemonic: importedWallet.mnemonic,
    };
  }

  loadWallet(privateKey) {
    return new ethers.Wallet(privateKey);
  }
}

export default WalletHandler;
