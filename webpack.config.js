const Encore = require("@symfony/webpack-encore");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack");

Encore.setOutputPath("static/")
  .setPublicPath("/")
  .addEntry("app.min", "./src/js/app.js")
  .addPlugin(
    new HtmlWebpackPlugin({
      template: "src/templates/index.html",
    })
  )
  .addPlugin(
    new HtmlWebpackPlugin({
      template: "src/templates/status.html",
      filename: "status.html",
    })
  )
  .addPlugin(
    new HtmlWebpackPlugin({
      template: "src/templates/policy.html",
      filename: "policy.html",
    })
  )
  .addPlugin(
    new HtmlWebpackPlugin({
      template: "src/templates/articles.html",
      filename: "articles.html",
    })
  )
  .addPlugin(
    new HtmlWebpackPlugin({
      template: "src/templates/b2b.html",
      filename: "b2b.html",
    })
  )
  .addPlugin(
    new HtmlWebpackPlugin({
      template: "src/templates/about.html",
      filename: "about.html",
    })
  )
  .addPlugin(
    new HtmlWebpackPlugin({
      template: "src/templates/catalog.html",
      filename: "catalog.html",
    })
  )
  .addPlugin(
    new HtmlWebpackPlugin({
      template: "src/templates/pray-list.html",
      filename: "pray-list.html",
    })
  )
  .addPlugin(
    new HtmlWebpackPlugin({
      template: "src/templates/feedback.html",
      filename: "feedback.html",
    })
  )
  .addPlugin(
    new HtmlWebpackPlugin({
      template: "src/templates/articles-details.html",
      filename: "articles-details.html",
    })
  )
    .addPlugin(
        new HtmlWebpackPlugin({
            template: "src/templates/map-example.html",
            filename: "map-example.html",
        })
    )
  .addPlugin(
    new HtmlWebpackPlugin({
      template: "src/templates/components.html",
      filename: "components.html",
    })
  );

Encore.enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableSassLoader()
  .enableEslintLoader()
  .enablePostCssLoader()
  .autoProvidejQuery()
  .configureUrlLoader({
    images: {
      limit: 8192,
    },
    fonts: {
      limit: 4096,
    },
  })
  .configureFilenames({
    images: "img/export/[name].[hash:8].[ext]",
  })
  .copyFiles({
    from: "./src/img",
    to: "img/[path][name].[ext]",
    pattern: /\.(png|jpe?g|gif|svg|webp)$/,
  })
  .copyFiles({
    from: "./src/favicon",
    to: "favicon/[path][name].[ext]",
  })
  .addPlugin(new FriendlyErrorsWebpackPlugin())
  .addPlugin(
    new ImageminPlugin({
      bail: false,
      cache: true,
      imageminOptions: {
        plugins: [
          ["gifsicle", { interlaced: true }],
          ["mozjpeg", { progressive: true, quality: 85 }],
          ["pngquant", { quality: [0.6, 0.83], speed: 1 }],
          [
            "svgo",
            {
              plugins: [
                { removeViewBox: false },
                { removeUnknownsAndDefaults: { unknownAttrs: false } },
                { cleanupIDs: false },
                { collapseGroups: false },
              ],
            },
          ],
        ],
      },
    })
  );

module.exports = Encore.getWebpackConfig();
