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
  },
  create: async () => {
    const walletHandler = get().walletHandler;
    const createdWallet = walletHandler.createWallet();
    await SecureStore.setItemAsync("wallet", JSON.stringify(createdWallet));
    set({ wallet: walletHandler.loadWallet(createdWallet.privateKey) });
  },
  fetch: async () => {
    const { privateKey } = JSON.parse(await SecureStore.getItemAsync("wallet"));
    set({ wallet: get().walletHandler.loadWallet(privateKey) });
  },
  remove: async () => {
    await SecureStore.deleteItemAsync("wallet");
  },
});

export default createWalletSlice;
