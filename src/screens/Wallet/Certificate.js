import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Container from "../../components/Container";
import AdvancedHeader from "../../components/AdvancedHeader";
import CustomText from "../../components/CustomText";
import Button from "../../components/Button";
import { useTheme } from "@react-navigation/native";
import { SIZES } from "../../constants";
import { useBottomModal } from "react-native-bottom-modal";
import QRCode from "react-native-qrcode-svg";

const Certificate = ({ navigation, route }) => {
  const { item } = route.params;

  const { colors } = useTheme();

  const { showModal } = useBottomModal();

  return (
    <Container>
      <AdvancedHeader hasDrawerButton={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headingContainer}>
          <CustomText style={[styles.heading1, { color: colors.text }]}>
            Secured by
          </CustomText>
          <CustomText style={[styles.heading2, { color: colors.primary }]}>
            Cheyny
          </CustomText>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: SIZES.windowWidth / 0.8,
              marginTop: 24,
            }}
          >
            <Image
              style={{ height: SIZES.windowWidth / 0.8 }}
              resizeMode="contain"
              source={require("../../../assets/images/certificate-frame.png")}
            />
            <View
              style={{
                position: "absolute",
                top: SIZES.windowWidth / 4.5,
              }}
            >
              <CustomText
                style={[styles.certificateTexts, { color: colors.text }]}
                fontWeight="bold"
              >
                Certificate
              </CustomText>
              <CustomText
                style={[styles.certificateTexts, { color: colors.text }]}
                fontWeight="bold"
              >
                of
              </CustomText>
              <CustomText
                style={[styles.certificateTexts, { color: colors.text }]}
                fontWeight="bold"
              >
                Ownership
              </CustomText>
            </View>
            <View
              style={{
                position: "absolute",
                top: SIZES.windowWidth / 1.65,
                width: SIZES.windowWidth / 1.25,
                margin: 0,
                justifyContent: "center",
                paddingHorizontal: 12,
              }}
            >
              <CustomText style={{ textAlign: "center", color: colors.text }}>
                Tiffany Novo® Round Brilliant Engagement Ring with a Pavé
                Diamond Platinum Band
              </CustomText>
              <CustomText
                style={{
                  textAlign: "center",
                  color: colors.text,
                  opacity: 0.75,
                  marginTop: 6,
                }}
              >
                Serial Number: 6632
              </CustomText>
            </View>
            <View
              style={{ position: "absolute", bottom: SIZES.windowWidth / 12 }}
            >
              <Image
                source={require("../../../assets/images/certificate-checks.png")}
              />
            </View>
          </View>
        </View>
        <Button
          style={{ marginTop: SIZES.windowWidth / 6 }}
          onPress={() =>
            showModal({
              // header: <ModalHeader />,
              content: (
                <View
                  style={{
                    width: SIZES.windowWidth,
                    backgroundColor: colors.background,
                    height: "100%",
                    borderTopRightRadius: 16,
                    borderTopLeftRadius: 16,
                    padding: SIZES.paddingHorizontal,
                    alignItems: "center",
                  }}
                >
                  <CustomText
                    fontWeight="bold"
                    style={{
                      fontSize: SIZES.p,
                      color: colors.text,
                    }}
                  >
                    QR Code of Your Certificate
                  </CustomText>
                  <View
                    style={{
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: colors.primary,
                      padding: 8,
                      marginTop: SIZES.windowWidth / 24,
                    }}
                  >
                    <QRCode
                      size={SIZES.windowWidth / 2.5}
                      color={colors.primary}
                      backgroundColor={colors.background}
                      value="6632"
                    />
                  </View>
                  <CustomText
                    style={{
                      textAlign: "center",
                      color: colors.text,
                      fontSize: 14,
                      marginTop: 12,
                    }}
                  >
                    This QR code can be scanned  as your proof of ownership
                  </CustomText>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.primary,
                      width: "100%",
                      alignItems: "center",
                      paddingVertical: 8,
                      borderRadius: 8,
                      marginTop: 24
                    }}
                  >
                    <CustomText
                      style={{
                        color: colors.background,
                        fontSize: SIZES.windowWidth / 25,
                      }}
                      fontWeight="bold"
                    >
                      Share Your Proof Of Ownership
                    </CustomText>
                  </TouchableOpacity>
                </View>
              ),
            })
          }
          title={"Generate Proof Of Ownership"}
        />
      </ScrollView>
    </Container>
  );
};

export default Certificate;

const styles = StyleSheet.create({
  headingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  heading1: { fontSize: 18, marginBottom: SIZES.windowWidth / 48 },
  heading2: { fontFamily: "Costigue", fontSize: SIZES.h2 },
  certificateTexts: { textAlign: "center", fontSize: 16 },
});
