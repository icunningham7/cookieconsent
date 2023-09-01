"use strict"

const TerserPlugin = require("terser-webpack-plugin")
const join = require("path").join

module.exports = function (env, argv) {
  return {
    mode: env.production ? 'production' : 'development',
    entry: join(__dirname, 'src', 'index.js'),
    output: env.production ? {
      path: join(__dirname, 'build'),
      filename: 'cookieconsent.min.js'
    } : {
      path: join(__dirname, 'src'),
      filename: 'bundle.js'
    },
    optimization: env.production ? {
      minimize: true,
      minimizer: [
        new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          compress: {
            defaults: true,
            arrows: true,
            drop_console: true,
            ecma: 2015,
          },
        },
      })],
      moduleIds: 'size',
      mangleWasmImports: true,
    } : {},
    module: {
      rules: env.production ? [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // "style-loader",
            "css-loader", 
            "sass-loader",
            "postcss-loader",
          ]
        }
      ] : [
        {
          test: /\.js?$/,
          loader: "babel-loader",
          options: {
            root: __dirname,
            rootMode: "upward-optional"
          }
        },
        {
          test: /\.scss?$/,
          use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader", // compiles Sass to CSS, using Node Sass by default
            "postcss-loader"
          ]
        }
      ]
    },
  }
}