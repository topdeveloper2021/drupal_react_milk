if (webpack == undefined) {
  const webpack = require("webpack");
}
const configurator = (name, file) => {
  const parsedFileName = parsePath(file);
  console.log(`Configuring: ${parsedFileName.libraryName}`);
  const babelLoader = {
    loader: "babel-loader",
    options: {
      cacheDirectory: false,
      presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript",
      ],
      plugins: [
        "@babel/transform-runtime",
        "@babel/plugin-transform-typescript",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-class-properties",
        "transform-custom-element-classes",
        "@babel/plugin-transform-react-jsx",
      ],
    },
  };

  const toReturn = {
    entry: {},
    mode: "development",
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    cache: false,
    output: {
      filename: `${parsedFileName.libraryName}.entry.js`,
      path: parsedFileName.dirname,
    },
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
      plugins: [],
      alias: {
        components: "/var/www/src/Components",
      },
    },

    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [babelLoader],
        },

        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        Holder: "holderjs",
        holder: "holderjs",
        "window.Holder": "holderjs",
      }),
      new webpack.LoaderOptionsPlugin({
        debug: true,
      }),
    ],
    stats: {
      warnings: true,
      colors: true,
      modules: true,
      reasons: true,
      errorDetails: true,
    },
  };
  toReturn.entry[parsedFileName.libraryName] = file;
  return toReturn;
};

export default configurator;
