var config = require("./webpack.config.js");

var entry = "./index.ts";

module.exports = Object.assign(config, {
  entry,
  mode: "development",
  output: { filename: "natura-auth-core.js" },
});
