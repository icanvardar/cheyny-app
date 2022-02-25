import * as SecureStore from "expo-secure-store";

const PASSWORD_STORE_KEY = "password";

const createPasswordSlice = (set, get) => ({
  isPasswordEntered: false,
  hasPassword: async () => {
    const foundPassword = await SecureStore.getItemAsync(PASSWORD_STORE_KEY);

    if (foundPassword) {
      return true;
    }
    console.log("hasPassword: Checked if there is saved password!");
    return false;
  },
  checkPassword: async (givenPassword) => {
    const foundPassword = await SecureStore.getItemAsync(PASSWORD_STORE_KEY);
    console.log(foundPassword);
    if (foundPassword && foundPassword === givenPassword) {
      set({ isPasswordEntered: true });
      console.log("password correct");
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
  changePassword: async (newPassword) => {
    await SecureStore.setItemAsync(PASSWORD_STORE_KEY, newPassword);
    console.log("changePassword: Password changed!");
  },
  setPasswordEntered: () => {
    set({ isPasswordEntered: true });
  },
});

export default createPasswordSlice;
