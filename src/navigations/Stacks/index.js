import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from "../../screens/Welcome";
// Screens which are located in CreateWalletScreen
import CreatePasswordScreen from "../../screens/CreateWallet/CreatePassword";
import MnemonicsScreen from "../../screens/CreateWallet/Mnemonics";
import VerifyMnemonicsScreen from "../../screens/CreateWallet/VerifyMnemonics";
// Screens which are located in ImportWalletScreen
import ImportFromSeedScreen from "../../screens/ImportWallet/ImportFromSeed";
import CongratulationsScreen from "../../screens/Congratulations";

import { THEME } from "../../constants";

const MainStack = createStackNavigator();

const CreateWalletStack = createStackNavigator();
const ImportWalletStack = createStackNavigator();

const CreateWalletStacks = () => {
  return (
    <CreateWalletStack.Navigator>
      <CreateWalletStack.Screen
        name="Create Password"
        options={{ headerShown: false }}
        component={CreatePasswordScreen}
      />
      <CreateWalletStack.Screen
        name="Mnemonics"
        options={{ headerShown: false }}
        component={MnemonicsScreen}
      />
      <CreateWalletStack.Screen
        name="Verify Mnemonics"
        options={{ headerShown: false }}
        component={VerifyMnemonicsScreen}
      />
      <CreateWalletStack.Screen
        name="Congratulations"
        options={{ headerShown: false }}
        component={CongratulationsScreen}
      />
    </CreateWalletStack.Navigator>
  );
};

const ImportWalletStacks = () => {
  return (
    <ImportWalletStack.Navigator>
      <ImportWalletStack.Screen
        name="Import From Seed"
        options={{ headerShown: false }}
        component={ImportFromSeedScreen}
      />
      <ImportWalletStack.Screen
        name="Congratulations"
        options={{ headerShown: false }}
        component={CongratulationsScreen}
      />
    </ImportWalletStack.Navigator>
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
        <MainStack.Screen
          name="Import Wallet"
          options={{ headerShown: false }}
          component={ImportWalletStacks}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Stacks;
