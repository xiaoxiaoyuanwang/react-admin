const path = require("path");
// eslint检验
const ESLintPlugin = require("eslint-webpack-plugin");
// html模板
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，支持link引入
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// css压缩插件
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
// js压缩插件
const TerserWebpackPlugin = require("terser-webpack-plugin");
// images压缩插件
const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin");
// 复制文件
const CopyPlugin = require("copy-webpack-plugin");
// 无网也能访问
const WorkboxPlugin = require("workbox-webpack-plugin");
// HMR
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
// 显示打包进度条
const WebpackBar = require("webpackbar");
const ProgressBarWebpackPlugin = require("progress-bar-webpack-plugin");


const MyPlugin = require('../plugins/MyPlugin');

const os = require("os");
const threads = os.cpus().length; // 获取cpu核数

const isProduction = process.env.NODE_ENV === "production";
function getOptions(dev, prod) {
  return isProduction ? prod : dev;
}
function getStyLoader(pre) {
  return [
    getOptions("style-loader", MiniCssExtractPlugin.loader),
    "css-loader",
    // 处理兼容性，配合package.json中的browserslist使用
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            [
              "postcss-preset-env",
              {
                // 其他选项
              },
            ],
          ],
        },
      },
    },
    pre,
  ].filter(Boolean); // 过滤掉underfind
}
module.exports = {
  entry: "./src/main.js",
  output: {
    path: getOptions(undefined, path.resolve(__dirname, "../dist")),
    filename: getOptions(
      "static/js/[name].js",
      "static/js/[name].[contenthash:10].js"
    ),
    chunkFilename: getOptions(
      "static/js/[name].chunk.js",
      "static/js/[name].[contenthash:10].chunk.js"
    ),
    assetModuleFilename: "static/media/[hash:10][ext][query]",
    clean: true,
  },
  mode: getOptions("development", "production"),
  devtool: getOptions("cheap-source-map", "source-map"),
  // 关闭性能分析提高打包速度
  performance: false,
  // 开发服务器不会输出资源，在内存中编译打包
  devServer: {
    open: true, // 是否自动打开浏览器
    port: 3000, // 启动服务器端口
    host: "localhost", // 启动服务器域名
    //     模块热替换(HMR - hot module replacement)功能会在应用程序运行过程中，替换、添加或删除 模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：
    // 保留在完全重新加载页面期间丢失的应用程序状态。
    // 只更新变更内容，以节省宝贵的开发时间。
    // 在源代码中 CSS/JS 产生修改时，会立刻在浏览器中进行更新，这几乎相当于在浏览器 devtools 直接更改样式。
    hot: true,
    // When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses.
    //  Enable devServer.historyApiFallback by setting it to true:
    historyApiFallback: true,
  },
  resolve: {
    // 自动解析文件扩展名
    extensions: [
      ".web.mjs",
      ".mjs",
      ".web.js",
      ".js",
      ".web.ts",
      ".ts",
      ".web.tsx",
      ".tsx",
      ".json",
      ".web.jsx",
      ".jsx",
    ],
  },
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/i,
        use: getStyLoader(),
      },
      {
        test: /\.less$/i,
        use: getStyLoader("less-loader"),
      },
      {
        test: /\.s[ac]ss$/i,
        use: getStyLoader("sass-loader"),
      },
      // 处理图片
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        // asset可以转换base64
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 小于4kb转化成base64.减少请求，资源会变大一些
            maxSize: 4 * 1024, // 4kb
          },
        },
        generator: {
          // :8,hash钱8位
          filename: "static/images/[hash:8][ext]",
        },
      },
      {
        test: /\.(ttf|mp4)$/i,
        // asset/resource 原封不动输出
        type: "asset/resource",
        // generator: {
        //   // :8,hash钱8位
        //   filename: "static/fonts/[hash:8][ext]",
        // },
      },
      // 处理js
      {
        test: /\.jsx?$/,
        // exclude: /(node_modules)/, // 排除的文件
        include: [path.resolve(__dirname, "../src")],
        use: [
          {
            loader: "thread-loader",
            options: {
              works: threads, // 进程数
            },
          },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 开启缓存
              cacheCompression: false, // 关闭缓存压缩
              plugins: [!isProduction && "react-refresh/babel"].filter(Boolean), // HMR js
            },
          },
        ],
      },
    ],
  },
  //
  plugins: [
    new MyPlugin(),
    new ESLintPlugin({
      // 检查哪些文件
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(__dirname, "../node_modules/.cache/eslint"),
      // // 进程数
      threads,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    isProduction &&
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:10].css",
        chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
      }),
    isProduction &&
      new WorkboxPlugin.GenerateSW({
        // 这些选项帮助快速启用 ServiceWorkers
        // 不允许遗留任何“旧的” ServiceWorkers
        clientsClaim: true,
        skipWaiting: true,
      }),
    isProduction &&
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "../public"),
            to: path.resolve(__dirname, "../dist"),
            globOptions: {
              // 忽略html文件
              ignore: ["**/index.html"],
            },
          },
        ],
        options: {
          concurrency: 100,
        },
      }),
    // HMR js
    !isProduction && new ReactRefreshWebpackPlugin(),
    // 显示打包进度
    new WebpackBar(),
    new ProgressBarWebpackPlugin(),
  ].filter(Boolean),
  optimization: {
    // 代码分割
    splitChunks: {
      // include all types of chunks
      chunks: "all",
      cacheGroups: {
        // react react-dom react-router-dom 一起打包成一个js文件
        react: {
          test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
          name: "chunk-react",
          priority: 40,
        },
        // antd 单独打包
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: "chunk-antd",
          priority: 30,
        },
        // 剩下node_modules单独打包
        libs: {
          test: /[\\/]node_modules[\\/]/,
          name: "chunk-libs",
          priority: 20,
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    // 是否需要压缩
    minimize: isProduction,
    minimizer: [
      // 压缩css
      new CssMinimizerWebpackPlugin(),
      // 压缩js
      new TerserWebpackPlugin({
        // 进程数
        parallel: threads,
      }),
      // 压缩图片
      new ImageMinimizerWebpackPlugin({
        minimizer: {
          implementation: ImageMinimizerWebpackPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
};
