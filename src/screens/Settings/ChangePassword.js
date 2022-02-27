import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CustomText from "../../components/CustomText";
import Container from "../../components/Container";
import AdvancedHeader from "../../components/AdvancedHeader";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import useStore from "../../store/useStore";

const ChangePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isChangable, setChangable] = useState(false);
  const [isChanging, setChanging] = useState(false);

  const changePassword = useStore((state) => state.changePassword);
  const checkPassword = useStore((state) => state.checkPassword);

  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");

  useEffect(async () => {}, []);

  const _changePassword = async () => {
    const res = await checkPassword(currentPassword);
    if (res === true) {
      setChanging(true);
      await changePassword(newPassword);
      setChanging(false);
      navigation.goBack();
    }
  };

  useEffect(() => {
    console.log(
      JSON.stringify({ currentPassword, newPassword, repeatPassword })
    );
    if (
      currentPassword.length >= 7 &&
      newPassword.length >= 7 &&
      repeatPassword.length >= 7 &&
      newPassword === repeatPassword
    ) {
      setChangable(true);
    } else {
      setChangable(false);
    }
  }, [currentPassword, newPassword, repeatPassword]);

  return (
    <Container>
      <AdvancedHeader hasDrawerButton={false} />
      <CustomText></CustomText>
      <InputField
        onChangeText={(text) => setCurrentPassword(text)}
        title={"Current Password"}
        isTogglable={true}
      />
      <InputField
        onChangeText={(text) => setNewPassword(text)}
        title={"New Password"}
        isTogglable={true}
      />
      <InputField
        onChangeText={(text) => setRepeatPassword(text)}
        title={"Repeat Password"}
        isTogglable={true}
      />
      <Button
        loading={isChanging}
        onPress={_changePassword}
        disabled={!isChangable}
        title={"Complete"}
      />
    </Container>
  );
};

export default ChangePassword;
