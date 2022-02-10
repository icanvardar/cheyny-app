import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../CustomText";

import { SIZES } from "../../constants";
import { useTheme } from "@react-navigation/native";

const InputField = ({
  onChangeText,
  title,
  isTogglable = false,
  subtitle = "",
  keyboardType = "number-pad",
}) => {
  const { colors } = useTheme();

  const [isHidden, setHidden] = useState(true);

  return (
    <View style={styles.passwordContainer}>
      <CustomText
        style={[
          {
            color: colors.primary,
            borderColor: colors.primary,
          },
          styles.passwordTitle,
        ]}
      >
        {title}
      </CustomText>
      <View
        style={[
          {
            borderColor: colors.primary,
          },
          styles.passwordOuterContainer,
        ]}
      >
        <TextInput
          keyboardType={keyboardType}
          secureTextEntry={isTogglable ? (isHidden ? true : false) : false}
          onChangeText={onChangeText}
          style={[
            {
              color: colors.text,
            },
            styles.passwordInput,
          ]}
        />
        {isTogglable && (
          <TouchableOpacity onPress={() => setHidden(!isHidden)}>
            <Ionicons
              name={isHidden ? "eye-off" : "eye"}
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        )}
      </View>
      {subtitle.length > 0 && (
        <CustomText
          style={[
            {
              color: colors.text,
            },
            styles.inputInfo,
          ]}
        >
          {subtitle}
        </CustomText>
      )}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  passwordContainer: { marginBottom: SIZES.windowWidth / 20 },
  passwordTitle: { fontSize: SIZES.windowWidth / 24, marginBottom: 2 },
  passwordInput: {
    padding: 12,
    width: "88%",
    fontSize: 16,
  },
  passwordOuterContainer: {
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  inputInfo: { fontSize: SIZES.windowWidth / 32, opacity: 0.5, marginTop: 4 },
});
