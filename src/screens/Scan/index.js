import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SIZES } from "../../constants";
import CustomText from "../../components/CustomText";
import { useTheme } from "@react-navigation/native";

const Scan = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const { colors } = useTheme();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
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
