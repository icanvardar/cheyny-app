// const { getDefaultConfig } = require("metro-config");
const { getDefaultConfig } = require("@expo/metro-config");
// const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();

// exports.resolver = {
//   ...defaultResolver,
//   sourceExts: [...defaultResolver.sourceExts, "cjs", "png", "jpg"],
// };

// module.exports = (async () => {
//   const config = await getDefaultConfig(__dirname);

//   const { transformer, resolver } = config;

//   config.transformer = {
//     ...transformer,
//     babelTransformerPath: require.resolve("react-native-svg-transformer"),
//   };
//   config.resolver = {
//     ...resolver,
//     assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
//     sourceExts: [...resolver.sourceExts, "svg", "cjs"],
//   };

//   return config;
// })();

const {
  resolver: { sourceExts, assetExts },
} = getDefaultConfig(__dirname);

module.exports = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg", "cjs"],
  },
};
