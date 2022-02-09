import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SIZES } from "../../constants";

const Container = ({ children, hasPaddingHorizontal = false, style = {} }) => {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          paddingVertical: Platform.OS === "android" ? 18 : 0,
          paddingHorizontal: SIZES.paddingHorizontal,
        },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

export default Container;
