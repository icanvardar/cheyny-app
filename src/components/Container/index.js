import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Constants from "expo-constants";

import { SIZES } from "../../constants";

const Container = ({ children, hasPaddingHorizontal = false, style = {} }) => {
//   const { colors } = useTheme();

  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: Constants.statusBarHeight,
          paddingHorizontal: SIZES.paddingHorizontal,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Container;
