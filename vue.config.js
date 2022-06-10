module.exports = {

  // 关闭 eslint 语法校验
  lintOnSave: false,

  // 配置代理服务器
  devServer: {
    proxy: {
      // 路由中有个 /api，走这个代理
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        // 路径重写，后台中路径确实存在 /api，无需重写
        // pathRewrite: { "^/api": "" },
      }
    }
  },
  // 生产环境，不生成 source-map文件
  productionSourceMap: false
}