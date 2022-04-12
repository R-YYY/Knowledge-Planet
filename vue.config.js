const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    // 配置跨域请求
    devServer: {
        port: 8080,
        host: 'localhost',
        open: true,
        https: false,
        proxy: {
            // '/kp/resource': {
            //     target: 'http://101.35.194.132:81',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {
            //         "^/kp/resource": "/kp/resource/"
            //     },
            // },
            // '/kp/system': {
            //     target: 'http://49.235.232.7:81',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {
            //         "^/kp/system": "/kp/system/"
            //     },
            // },
        }
    }
})
