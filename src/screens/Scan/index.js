import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SIZES } from "../../constants";
import CustomText from "../../components/CustomText";
import { useTheme } from "@react-navigation/native";
import { ethers } from "ethers";
import { TransferTokenContext } from "../../context/TransferTokenProvider";

const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const { setReceiverAddress } = useContext(TransferTokenContext);

  const { colors } = useTheme();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  function isAddress(address) {
    try {
      ethers.utils.getAddress(address);
    } catch (e) {
      return false;
    }
    return true;
  }

  const handleBarCodeScanned = ({ type, data }) => {
    // console.log(data);
    if (isAddress(data)) {
      setReceiverAddress(data);
      navigation.navigate("Send Token");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={(data) => handleBarCodeScanned(data)}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.frameHolder}>
        <View style={{ paddingBottom: SIZES.windowWidth / 2, opacity: 1 }}>
          <Image
            style={styles.frame}
            source={require("../../../assets/images/qr-frame.png")}
          />
        </View>
      </View>
      <View style={styles.infoTextHolder}>
        <CustomText
          fontWeight="bold"
          style={[{ color: colors.text }, styles.infoTextHeader]}
        >
          Scan Your Product Certificate QR code
        </CustomText>
        <CustomText
          style={[
            {
              color: colors.text,
            },
            styles.infoTextBody,
          ]}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          mattis tellus mauris.
        </CustomText>
      </View>
    </View>
  );
};

export default Scan;

const styles = StyleSheet.create({
  container: { flex: 1 },
  frameHolder: {
    position: "absolute",
    height: SIZES.windowHeight,
    width: SIZES.windowWidth,
    backgroundColor: "black",
    opacity: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  frame: {
    height: SIZES.windowWidth / 1.5,
    width: SIZES.windowWidth / 1.5,
  },
  infoTextHolder: {
    position: "absolute",
    bottom: SIZES.windowWidth / 2.5,
    alignItems: "center",
    width: SIZES.windowWidth,
    paddingHorizontal: 48,
  },
  infoTextHeader: { fontSize: SIZES.h5 },
  infoTextBody: { textAlign: "center", marginTop: 5, opacity: 0.75 },
});
