const glob = require("glob");
const configurator = require("./config/node/configurator").default;
const path = require("path");

const entryFiles = path.resolve(__dirname, "./web/**/*.entry.t*");

console.log("Discovering Entry files:", entryFiles);
const webpackConfig = configurator(glob.sync(entryFiles, {}));

module.exports = webpackConfig;
