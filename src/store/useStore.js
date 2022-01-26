import create from "zustand";
import createWalletSlice from "./createWalletSlice";

const useStore = create((set, get) => ({
  ...createWalletSlice(set, get),
}));

export default useStore;
