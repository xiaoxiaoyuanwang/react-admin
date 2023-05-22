class BannerWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    // 在资源输出之前触发
    compiler.hooks.emit.tap("BannerWebpackPlugin", (compilation) => {
      const extensions = ["css", "js"];
      const prefix = `/*
          * Author: ${this.options.author}
          * Build Time: ${new Date()}
          */
          `;
      // 获取即将输出的资源文件：compilation.assets
      for (const filename in compilation.assets) {
        if (compilation.assets.hasOwnProperty(filename)) {
          // 将文件名进行切割
          const splitted = filename.split(".");
          // 获取文件扩展名
          const extension = splitted[splitted.length - 1];
          // 过滤只保留js和css资源，其他文件不处理
          if (extensions.includes(extension)) {
            const asset = compilation.assets[filename];
            // 获取原来内容
            let content = asset.source();
            // 拼接上注释
            content = prefix + content;
            // 修改资源
            compilation.assets[filename] = {
              // 最终资源输出时，调用source方法，source方法的返回值就是资源的具体内容
              source: () => content,
              // 资源大小
              size: () => content.length,
            };
          }
        }
      }
    });
  }
}

module.exports = BannerWebpackPlugin;
