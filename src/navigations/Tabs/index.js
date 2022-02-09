import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/Home";
import ScanScreen from "../../screens/Scan";
import HistoryScreen from "../../screens/History";
import SettingsScreen from "../../screens/Settings";

import { THEME } from "../../constants";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <NavigationContainer theme={THEME}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Tabs;
