// plugins/MyPlugin.js

// 自定义 MyPlugin 插件，该插件输出 "webpack 构建正在启动！"，打包完成后输出总耗时
// 一个命名的 Javascript 方法 或 JavaScript 类
class MyPlugin {
  time = 0;
  // 原型上需要定义 apply 的方法
  apply(compiler) {
    debugger;
    // 通过 compiler 获取 webpack 内部的钩子，获取 Webpack 打包过程中的各个阶段
    compiler.hooks.environment.tap("MyPlugin", (compilation) => {
      console.log("\x1B[36m", "webpack 构建正在启动！");
      this.time = new Date().getTime();
    });
    // 通过 compiler 获取 webpack 内部的钩子，获取 Webpack 打包过程中的各个阶段
    compiler.hooks.afterEmit.tapAsync("MyPlugin", (compilation, callback) => {
      this.time = new Date().getTime() - this.time;
      const str = `webpack 构建已完成！总耗时 ${this.time} ms`
      console.log("\x1B[32m", str);
      // 分为同步和异步的钩子，异步钩子在功能完成后，必须执行对应的回调
      callback();
    });
  }
}

module.exports = MyPlugin;
