import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../../screens/Welcome";
import CreateWalletScreen from "../../screens/CreateWallet";
import ImportWalletScreen from "../../screens/ImportWallet";

const Stack = createNativeStackNavigator();

const Stacks = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Create Wallet" component={CreateWalletScreen} />
        <Stack.Screen name="Import Wallet" component={ImportWalletScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacks;
