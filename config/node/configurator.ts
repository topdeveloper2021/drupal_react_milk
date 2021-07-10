const pathUtility = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const term = require("terminal-kit").terminal;
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const nameCallback = ({ identifier }, chunks, cacheGroupKey) => {
  const moduleFileName = identifier()
    .split("/")
    .reduceRight((item) => item);
  const allChunksNames = chunks.map((item) => item.name).join("~");
  return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
};

const progressCallback = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:
  term(
    Math.floor(percentage * 100)
      .toString()
      .concat("%\t"),
    message
  ).column(0);
};

const oicOpts = {
  rootDir: process.cwd(),
  devBuild: process.env.NODE_ENV !== "production",
};

const babelLoader = {
  loader: "babel-loader",
  options: {
    sourceType: "unambiguous",
    cacheDirectory: true,
    presets: [
      "@babel/preset-env",
      "@babel/preset-typescript",
      "@babel/preset-react",
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-export-default-from",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-transform-classes",
      "@babel/plugin-transform-react-jsx",
      "@babel/plugin-transform-runtime",
      "@babel/plugin-transform-typescript",
      "babel-plugin-styled-components",
    ],
    exclude: [
      // \\ for Windows, \/ for Mac OS and Linux
      /node_modules[\/]core-js/,
      /node_modules[\/]webpack[\/]buildin/,
    ],
  },
};

export function configurator(entry) {
  const { PathAliases, parsePath } = require("./PathAliases");
  if (typeof entry === "string") {
    entry = [entry];
  }
  const parsedFileNames = entry.map(parsePath);
  console.log(
    `Configuring: `,
    parsedFileNames.map((item) => {
      return item.libraryName;
    })
  );

  const toReturn = {
    entry: {},
    mode: "development",
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    cache: false,
    optimization: {
      emitOnErrors: false,
      splitChunks: {
        chunks: "async",
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            filename: (pathData) => {
              // Use pathData object for generating filename string based on your requirements
              return `web/modules/custom/milken_base/components/common/${pathData.chunk.id}-bundle.js`;
            },
          },
          default: {
            filename: (pathData) => {
              // Use pathData object for generating filename string based on your requirements
              return `web/modules/custom/milken_base/components/common/${pathData.chunk.id}-bundle.js`;
            },
            reuseExistingChunk: true,
          },
        },
      },
    },
    output: {
      filename: "[name].entry.js",
      path: pathUtility.resolve("."),
    },
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
      plugins: [],
      alias: PathAliases,
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [babelLoader],
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader",
        },
        {
          test: /\.css$/i,
          use: ["sass-to-string", "style-loader", "css-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            "sass-to-string",
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  outputStyle: "compressed",
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: true,
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "css/[id].css",
      }),
      new webpack.ProgressPlugin(progressCallback),
      new webpack.NoEmitOnErrorsPlugin(),
      /**
       *  new BrowserSyncWebpackPlugin({
       *   proxy: "http://localhost:8080",
       *   notify: false,
       *   port: 3130,
       *   reloadDelay: 3000
       * }),
       */
    ],
    stats: {
      warnings: true,
      colors: true,
      modules: true,
      reasons: true,
      errorDetails: true,
    },
  };
  for (const key in entry) {
    toReturn.entry[
      pathUtility.join(
        parsedFileNames[key].relativeDirectory,
        parsedFileNames[key].libraryName
      )
    ] = entry[key];
  }
  return toReturn;
}

export default configurator;
