/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require("path");

const watchFolders = [
  path.resolve(__dirname + "/.."),
  path.resolve(__dirname + "/../../node_modules"),
];

module.exports = {
  resolver: {
    sourceExts: ["jsx", "js", "ts", "tsx"],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  watchFolders,
};
