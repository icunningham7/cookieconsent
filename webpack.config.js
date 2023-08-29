"use strict"

const join = require("path").join
// const common = require( "./webpack.common.js" )
// const exp = Object.assign({}, common, {
//     entry: join( __dirname, 'src', 'index.js' ),
//     module: {
//       rules: [
//         {
//           test   : /\.js?$/,
//           loader : "babel-loader",
//           options: {
//             root    : __dirname,
//             rootMode: "upward-optional"
//           }
//         },
//         {
//           test: /\.scss?$/,
//           use : [
//             "style-loader", // creates style nodes from JS strings
//             "css-loader", // translates CSS into CommonJS
//             "sass-loader", // compiles Sass to CSS, using Node Sass by default
//             "postcss-loader"
//           ]
//         }
//       ]
//     }
//   })
//   module.exports = exp
module.exports = function (env, argv) {
  return {
    mode: env.production ? 'production' : 'develompent',
    entry: join(__dirname, 'src', 'index.js'),
    output: env.production ? {
      path: join(__dirname, 'build'),
      filename: 'cookieconsent.min.js'
    } : {
      path: join(__dirname, 'src'),
      filename: 'bundle.js'
    },
    optimization: env.production ? {
      moduleIds: 'size',
      mangleWasmImports: true,
      // concatenateModules: false
    } : {},
    module: {
      rules: env.production ? [
        {
          // test: /\.js?$/,
          // use: {
          //   loader: "string-replace-loader",
          //   options: {
          //     search: "(?<=>)\\n\ {2,}|\\n\ {2,}(?=<)",
          //     replace: () => '',
          //     flags: "g"
          //   }
          // },
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            "css-loader", 
            "sass-loader",
            "postcss-loader"
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
    watch: !env.production
  }
}