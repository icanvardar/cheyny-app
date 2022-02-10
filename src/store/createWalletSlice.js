import * as SecureStore from "expo-secure-store";
import WalletHandler from "../handlers/WalletHandler";

const WALLET_STORE_KEY = "wallet";

const createWalletSlice = (set, get) => ({
  wallet: null,
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
    console.log("createWallet: Wallet created!");
  },
  importWallet: async (mnemonic) => {
    const walletHandler = get().walletHandler;
    const walletInstance = walletHandler.importWallet(mnemonic);
    await SecureStore.setItemAsync(
      WALLET_STORE_KEY,
      JSON.stringify(walletInstance)
    );
    set({ wallet: walletInstance });
    console.log("importWallet: Wallet imported!");
  },
  fetchWallet: async () => {
    const { privateKey } = JSON.parse(
      await SecureStore.getItemAsync(WALLET_STORE_KEY)
    );
    set({ wallet: get().walletHandler.loadWallet(privateKey) });
    console.log("fetchWallet: Wallet fetched!");
  },
  removeWallet: async () => {
    await SecureStore.deleteItemAsync(WALLET_STORE_KEY);
    console.log("removeWallet: Wallet removed!");
  },
});

export default createWalletSlice;
