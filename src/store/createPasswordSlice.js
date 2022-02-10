import * as SecureStore from "expo-secure-store";

const PASSWORD_STORE_KEY = "password";

const createPasswordSlice = (set, get) => ({
  checkPassword: async (givenPassword) => {
    const foundPassword = await SecureStore.getItemAsync(PASSWORD_STORE_KEY);
    if (foundPassword && foundPassword === givenPassword) {
      return true;
    }
    console.log("checkPassword: Password checked!");
    return false;
  },
  createPassword: async (givenPassword) => {
    await SecureStore.setItemAsync(PASSWORD_STORE_KEY, givenPassword);
    console.log("createPassword: Password created!");
  },
  removePassword: async () => {
    await SecureStore.deleteItemAsync(PASSWORD_STORE_KEY);
    console.log("removePassword: Password removed!");
  },
});

export default createPasswordSlice;
