const path = require("path");
// eslint检验
const ESLintPlugin = require("eslint-webpack-plugin");
const webpack = require("webpack");
const envConfig = require("./url.config");
// html模板
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 添加注释块
const BannerWebpackPlugin = require("../plugins/banner-webpack-plugin");
const TimeWebpackPlugin = require("../plugins/time-webpack-plugin");
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
// 显示打包进度条
const WebpackBar = require("webpackbar");
const ProgressBarWebpackPlugin = require("progress-bar-webpack-plugin");
// 先清除 dist 文件夹
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const os = require("os");
const threads = os.cpus().length; // 获取cpu核数
function getStyLoader(pre) {
  return [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        modules: {
          mode: "local",
          auto: true,
          localIdentName: "[path][name]__[local]--[hash:5]",
          exportLocalsConvention: "camelCase",
        },
      },
    },
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
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/[name].[contenthash:10].js",
    chunkFilename: "static/js/[name].[contenthash:10].chunk.js",
    assetModuleFilename: "static/media/[hash:10][ext][query]",
    clean: true,
  },
  mode: "production",
  devtool: "source-map",
  // 关闭性能分析提高打包速度
  performance: false,
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
            // 可以在外面写
            options: {
              // presets: ['@babel/preset-env'],
              cacheDirectory: true, // 开启缓存
              cacheCompression: false, // 关闭缓存压缩
            },
          },
          {
            loader: "./loaders/clean-log-loader",
          },
          // {
          //   loader: "./loaders/banner-loader",
          //   options: {
          //     author: "小小愿望",
          //   },
          // },
        ],
      },
    ],
  },
  //
  plugins: [
    // 先清除 dist 文件夹
    new CleanWebpackPlugin(),
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
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
    }),
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
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
    // 显示打包进度
    new WebpackBar(),
    new ProgressBarWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.base_url": JSON.stringify(envConfig),
    }),
    new BannerWebpackPlugin({
      author: "小小愿望",
    }),
    new TimeWebpackPlugin(),
  ],
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
