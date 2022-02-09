import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SIZES = {
  windowHeight,
  windowWidth,
  paddingHorizontal: windowWidth / 12,
  h1: windowWidth / 9,
  h2: windowWidth / 11,
  h3: windowWidth / 13,
  h4: windowWidth / 15,
  h5: windowWidth / 17,
  p: windowWidth / 20,
};

export default SIZES;
