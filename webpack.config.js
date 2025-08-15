const path = require("path");
const fs = require('fs-extra');
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BuildPaths = require("./lib/build-paths");
const BuildExtension = require("./lib/build-extension-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const manifest = fs.readJSONSync(path.join(BuildPaths.SRC_ROOT, 'manifest.json'));
const version = manifest.version;

const entries = {
  viewer: ["./extension/src/viewer.js"],
  "viewer-alert": ["./extension/styles/viewer-alert.scss"],
  options: ["./extension/src/options.js"],
  backend: ["./extension/src/backend.js"],
  "omnibox-page": ["./extension/src/omnibox-page.js"]
};

function findThemes(darkness) {
  return fs.readdirSync(path.join('extension', 'themes', darkness))
    .filter(function (filename) {
      return /\.js$/.test(filename);
    })
    .map(function (theme) {
      return theme.replace(/\.js$/, '');
    });
}

function includeThemes(darkness, list) {
  list.forEach(function (filename) {
    entries[filename] = ["./extension/themes/" + darkness + "/" + filename + ".js"];
  });
}

const lightThemes = findThemes('light');
const darkThemes = findThemes('dark');
const themes = { light: lightThemes, dark: darkThemes };

includeThemes('light', lightThemes);
includeThemes('dark', darkThemes);

console.log("Entries list:");
console.log(entries);
console.log("\n");

const webpackConfig = {
  mode: process.env.NODE_ENV || 'development',
  context: __dirname,
  entry: entries,
  target: 'web',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, "build/json_viewer/assets"),
    filename: "[name].js",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset/source'
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css', '.scss'],
    modules: [
      path.resolve(__dirname, './extension'),
      'node_modules'
    ]
  },
  externals: [
    {
      "chrome-framework": "chrome"
    }
  ],
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        VERSION: JSON.stringify(version),
        THEMES: JSON.stringify(themes)
      }
    }),
    new BuildExtension(themes)
  ],
  optimization: {
    minimize: process.env.NODE_ENV === 'production'
  }
};

module.exports = webpackConfig;