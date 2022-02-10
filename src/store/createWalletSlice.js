import * as SecureStore from "expo-secure-store";
import WalletHandler from "../handlers/WalletHandler";

const createWalletSlice = (set, get) => ({
  wallet: null,
  isWalletCreated: null,
  walletHandler: new WalletHandler(),
  checkWallet: async () => {
    if (await SecureStore.getItemAsync("wallet")) {
      set({ isWalletCreated: true });
    } else {
      set({ isWalletCreated: false });
    }
    console.log("wallet checked");
  },
  createWallet: async () => {
    const walletHandler = get().walletHandler;
    const walletInstance = walletHandler.createWallet();
    await SecureStore.setItemAsync("wallet", JSON.stringify(walletInstance));
    set({ wallet: walletInstance });
  },
  fetchWallet: async () => {
    const { privateKey } = JSON.parse(await SecureStore.getItemAsync("wallet"));
    set({ wallet: get().walletHandler.loadWallet(privateKey) });
  },
  removeWallet: async () => {
    await SecureStore.deleteItemAsync("wallet");
    console.log("wallet deleted");
  },
});

export default createWalletSlice;
