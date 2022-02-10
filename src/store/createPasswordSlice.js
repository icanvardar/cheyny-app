import * as SecureStore from "expo-secure-store";

const createPasswordSlice = (set, get) => ({
  checkPassword: async (givenPassword) => {
    const foundPassword = await SecureStore.getItemAsync("password");
    if (foundPassword && foundPassword === givenPassword) {
      return true;
    }

    return false;
  },
  createPassword: async (givenPassword) => {
    await SecureStore.setItemAsync("password", givenPassword);
  },
});

export default createPasswordSlice;
