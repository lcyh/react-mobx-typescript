const path =require("path");
const webpack =require("webpack");
const HtmlWebpackPlugin =require("html-webpack-plugin");
const merge =require("webpack-merge");
const common =require("./webpack.base.config");

console.log("1");
setTimeout(() => {
  console.log("2");
  Promise.resolve().then(() => {
    console.log("3");
  });
  new Promise((resolve) => {
    console.log("4");
    resolve();
  }).then(() => {
    console.log("5");
  });
}, 10);
Promise.resolve().then(() => {
  console.log("6");
});
process.nextTick(() => {
  console.log("nextTick");
});
new Promise((resolve) => {
  console.log("7");
  resolve("lc");
}).then((res) => {
  console.log("8");
  return res;
});

module.exports = merge(common, {
  mode: "development",
  devServer: {
    open: true,
    port: 5000,
    // host: '0.0.0.0', // 允许ip访问
    hot: true,
    compress: true, // gzip压缩
    progress: true,
    // contentBase: path.join(__dirname, '../dist'), // 服务启动访问的目录，默认为跟目录 dist/index.html
    // 解决刷新页面404，当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过设置为 true 进行启用
    historyApiFallback: {
      disableDotRule: true,
    },
    // 出现错误时是否在浏览器上出现遮罩层提示
    overlay: true,
    // 设置接口请求代理，更多 proxy 配置请参考 https://github.com/chimurai/http-proxy-middleware#options
    proxy: {
      "/api/": {
        changeOrigin: true,
        // 目标地址
        target: "http://localhost:3000",
        // 重写路径
        pathRewrite: {
          "^/api/": "/",
        },
      },
    },
  },
  plugins: [
    // 自动在出口目录生成 html 并自动引入 js 文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      filename: "index.html",
      chunks: ["main"], // 与入口文件对应的模块名
    }),
    // 热加载插件
    new webpack.HotModuleReplacementPlugin(),
  ],
});
