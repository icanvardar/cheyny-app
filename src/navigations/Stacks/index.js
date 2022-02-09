import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../../screens/Welcome";
import CreateWalletScreen from "../../screens/CreateWallet";
import ImportWalletScreen from "../../screens/ImportWallet";

import { THEME } from "../../constants";

const Stack = createNativeStackNavigator();

const Stacks = () => {
  return (
    <NavigationContainer theme={THEME}>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Welcome"
          component={WelcomeScreen}
        />
        <Stack.Screen name="Create Wallet" component={CreateWalletScreen} />
        <Stack.Screen name="Import Wallet" component={ImportWalletScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacks;
