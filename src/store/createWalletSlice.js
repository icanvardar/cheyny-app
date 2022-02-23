import * as SecureStore from "expo-secure-store";
import WalletHandler from "../handlers/WalletHandler";

const WALLET_STORE_KEY = "wallet";

const createWalletSlice = (set, get) => ({
  wallet: null,
  privateKey: null,
  isWalletCreated: null,
  walletHandler: new WalletHandler(),
  checkWallet: async () => {
    if (await SecureStore.getItemAsync(WALLET_STORE_KEY)) {
      set({ isWalletCreated: true });
    } else {
      set({ isWalletCreated: false });
    }
    console.log("checkWallet: Wallet checked!");
  },
  createWallet: async () => {
    const walletHandler = get().walletHandler;
    const walletInstance = walletHandler.createWallet();
    await SecureStore.setItemAsync(
      WALLET_STORE_KEY,
      JSON.stringify(walletInstance)
    );
    set({ wallet: walletInstance });
    console.log(
      "createWallet: Wallet created!" + JSON.stringify(walletInstance)
    );
  },
  importWallet: async (mnemonic) => {
    const walletHandler = get().walletHandler;
    const walletInstance = walletHandler.importWallet(mnemonic);
    await SecureStore.setItemAsync(
      WALLET_STORE_KEY,
      JSON.stringify(walletInstance)
    );
    set({ wallet: walletInstance });
    console.log(
      "importWallet: Wallet imported!" + JSON.stringify(walletInstance)
    );
  },
  fetchWallet: async () => {
    const { privateKey } = JSON.parse(
      await SecureStore.getItemAsync(WALLET_STORE_KEY)
    );
    const genWallet = get().walletHandler.loadWallet(privateKey);
    set({ wallet: genWallet, privateKey });
    console.log("fetchWallet: Wallet fetched!" + JSON.stringify(genWallet));
  },
  removeWallet: async () => {
    await SecureStore.deleteItemAsync(WALLET_STORE_KEY);
    console.log("removeWallet: Wallet removed!");
  },
});

export default createWalletSlice;
