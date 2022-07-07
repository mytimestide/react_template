const path = require('path')
const {merge} = require('webpack-merge')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const baseConfig = require('./webpack.base')
const proxy = require('./proxy')

// 合并公共配置，并添加开发环境配置
module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',   // 源码调式模式
    devServer: {
        port: 3000,    // 服务端口号
        compress: false,  // gzip压缩，开发环境不开启，提升热更新速度
        hot: true,
        historyApiFallback: true,   // 解决history路由404问题
        open: true,
        proxy: proxy,
        static: {
            directory: path.join(__dirname, '../public')     // 托管静态资源public文件夹
        },
    },
    plugins: [
        new ReactRefreshWebpackPlugin(), // 添加热更新插件
    ]
})
