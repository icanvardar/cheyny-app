import create from "zustand";
import createWalletSlice from "./createWalletSlice";
import createPasswordSlice from "./createPasswordSlice";

const useStore = create((set, get) => ({
  ...createWalletSlice(set, get),
  ...createPasswordSlice(set, get),
}));

export default useStore;
