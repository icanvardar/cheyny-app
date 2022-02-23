import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import CustomText from "../../components/CustomText";
import { SIZES, THEME } from "../../constants";

import useStore from "../../store/useStore";

const Password = () => {
  const [password, setPassword] = useState("");
  const checkPassword = useStore((state) => state.checkPassword);

  useEffect(() => {
    const check = async () => {
      await checkPassword(password);
    };

    check();

    return function cleanup() {};
  }, [password]);

  const PasswordButtons = () => {
    const numbers = Array.apply(null, { length: 12 }).map(function (_, i) {
      return i + 1;
    });

    const append = (num) => {
      setPassword(password + num.toString());
    };

    const eraseOne = () => {
      let removedPassword = password.substring(0, password.length - 1);
      setPassword(removedPassword);
    };

    const eraseAll = () => {
      setPassword("");
    };

    const _numberHandler = (i) => {
      if (i + 1 === 10) {
        return {
          action: () => eraseAll(),
          item: "X",
        };
      } else if (i + 1 === 11) {
        return {
          action: () => append(0),
          item: 0,
        };
      } else if (i + 1 === 12) {
        return {
          action: () => eraseOne(),
          item: "<",
        };
      } else {
        return {
          action: () => append(i + 1),
          item: i + 1,
        };
      }
    };

    return (
      <View style={styles.buttonsContainer}>
        {numbers.map((n, i) => {
          const numberHandler = _numberHandler(i);

          return (
            <TouchableOpacity
              key={i.toString()}
              onPress={numberHandler.action}
              style={styles.passwordButton}
            >
              <CustomText fontWeight="bold" style={styles.numberText}>
                {numberHandler.item}
              </CustomText>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <Container style={{ backgroundColor: THEME.colors.background, flex: 1 }}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.brandContainer}>
          <CustomText style={styles.brand}>Cheyny</CustomText>
        </View>
        <View style={styles.passwordContainer}>
          {password.split("").map((item, i) => (
            <CustomText
              key={i.toString()}
              fontWeight="bold"
              style={styles.passwordItem}
            >
              *
            </CustomText>
          ))}
        </View>
        <View style={styles.buttonsMainContainer}>
          <PasswordButtons />
        </View>
      </ScrollView>
    </Container>
  );
};

export default Password;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  brandContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: SIZES.windowWidth / 18,
  },
  brand: {
    color: THEME.colors.primary,
    fontFamily: "Costigue",
    fontSize: SIZES.h2,
  },
  passwordContainer: {
    borderWidth: 1,
    borderColor: THEME.colors.backgroundSecondary,
    borderRadius: 8,
    height: SIZES.windowWidth / 6,
    marginTop: SIZES.windowWidth / 18,
    width: "100%",
    flexDirection: "row",
    marginBottom: SIZES.windowWidth / 12,
    marginTop: SIZES.windowWidth / 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  passwordItem: {
    color: THEME.colors.text,
    fontSize: SIZES.h3,
    letterSpacing: 12,
  },
  passwordButton: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: THEME.colors.primary,
    height: SIZES.windowWidth / 5,
    width: SIZES.windowWidth / 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  numberText: {
    color: THEME.colors.text,
    fontSize: SIZES.h3,
    opacity: 0.75,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsMainContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
