import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../../screens/Welcome";
// Screens which are located in CreateWalletScreen
import CreatePasswordScreen from "../../screens/CreateWallet/CreatePassword";
import MnemonicsScreen from "../../screens/CreateWallet/Mnemonics";
import VerifyMnemonicsScreen from "../../screens/CreateWallet/VerifyMnemonics";

import ImportWalletScreen from "../../screens/ImportWallet";

import { THEME } from "../../constants";

const MainStack = createNativeStackNavigator();

const CreateWalletStack = createNativeStackNavigator();

const CreateWalletStacks = () => {
  return (
    <CreateWalletStack.Navigator>
      <CreateWalletStack.Screen
        name="Create Password"
        options={{ headerShown: false }}
        component={CreatePasswordScreen}
      />
      <CreateWalletStack.Screen name="Mnemonics" component={MnemonicsScreen} />
      <CreateWalletStack.Screen
        name="Verify Mnemonics"
        component={VerifyMnemonicsScreen}
      />
    </CreateWalletStack.Navigator>
  );
};

const Stacks = () => {
  return (
    <NavigationContainer theme={THEME}>
      <MainStack.Navigator>
        <MainStack.Screen
          name="Welcome"
          options={{ headerShown: false }}
          component={WelcomeScreen}
        />
        <MainStack.Screen
          name="Create Wallet"
          options={{ headerShown: false }}
          component={CreateWalletStacks}
        />
        <MainStack.Screen name="Import Wallet" component={ImportWalletScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Stacks;
