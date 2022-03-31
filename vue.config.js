const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置跨域请求
  devServer: {
    port: 8080,
    host: 'localhost',
    open: true,
    https: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8888/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})