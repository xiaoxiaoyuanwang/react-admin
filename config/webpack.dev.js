const path = require("path");
// eslint检验
const ESLintPlugin = require("eslint-webpack-plugin");
// html模板
const HtmlWebpackPlugin = require("html-webpack-plugin");
// HMR
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
function getStyLoader(pre) {
  return [
    "style-loader",
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
  // 开发服务器不会输出资源，在内存中编译打包
  output: {
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[hash:10][ext][query]",
  },
  mode: "development",
  devServer: {
    open: true, // 是否自动打开浏览器
    port: 3000, // 启动服务器端口
    host: "localhost", // 启动服务器域名
    // 模块热替换(HMR - hot module replacement)功能会在应用程序运行过程中，替换、添加或删除 模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：
    // 保留在完全重新加载页面期间丢失的应用程序状态。
    // 只更新变更内容，以节省宝贵的开发时间。
    // 在源代码中 CSS/JS 产生修改时，会立刻在浏览器中进行更新，这几乎相当于在浏览器 devtools 直接更改样式。
    hot: true,
    // 解决开发时刷新404
    // 当使用HTML5 History API时，可能必须使用index.html页面来代替任何404响应。通过将devServer.historyPiFallback设置为true来启用它
    historyApiFallback: true,
  },
  devtool: "cheap-source-map",
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
        test: /\.(png|jpe?g|gif|webp)$/i,
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
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 开启缓存
              cacheCompression: false, // 关闭缓存压缩
              plugins: ["react-refresh/babel"], // HMR js
            },
          },
        ],
      },
    ],
  },
  //
  plugins: [
    new ESLintPlugin({
      // 检查哪些文件
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(__dirname, "../node_modules/.cache/eslint"),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // HMR js
    new ReactRefreshWebpackPlugin(),
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
  },
};
