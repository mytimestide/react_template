const {merge} = require('webpack-merge')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.base')
const TerserPlugin = require('terser-webpack-plugin');
const globAll = require('glob-all')
const webpackbar = require('webpackbar') // 美化终端构建时的进度条样式
const CompressionPlugin  = require('compression-webpack-plugin')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(baseConfig, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,  // 开启多线程
                extractComments: false,  // 不将注释提取到单独的文件中
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log']    // 去除console.log
                    }
                }
            }),
            new CssMinimizerPlugin()
        ],
        splitChunks: {
            cacheGroups: {
                antdui: {
                    priority: 2,
                    test: /[\\/]node_modules[\\/](antd)[\\/]/, //(module) => (/antd/.test(module.context)),
                    name: 'antdui',
                    chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0, // 提取代码体积大于0就提取出来
                },
                // 拆分基础插件
                basic: {
                    priority: 3,
                    test: /[\\/]node_modules[\\/](moment|react|react-dom|react-router|react-router-dom|mobx|mobx-react|axios)[\\/]/,
                    name: 'basic',
                    chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0, // 提取代码体积大于0就提取出来
                },
                echartsui: {
                    priority: 4,
                    test: /[\\/]node_modules[\\/](echarts|echarts-for-react)[\\/]/,
                    name: 'echartsui',
                    chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0, // 提取代码体积大于0就提取出来
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',   // 提取文件命名为vendors,js后缀和chunkhash会自动加
                    minChunks: 1, // 只要使用一次就提取出来
                    chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0, // 提取代码体积大于0就提取出来
                    priority: -10, // 提取优先级为-10
                },
                commons: {
                    name: 'commons',   // 提取文件命名为commons
                    minChunks: 2,
                    chunks: 'initial',
                    minSize: 0
                }
            }
        }
    },
    plugins: [
        new webpackbar(),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css', // 抽离css的输出目录和名称
            ignoreOrder: true, // 忽略因CSS文件引入顺序不一致而抛出的警告信息，多为antd内部css引起
        }),
        new PurgeCSSPlugin({
            // 检测src下所有tsx文件和public下index.html中使用的类名和id和标签名称
            // 只打包这些文件中用到的样式
            paths: globAll.sync([`${path.join(__dirname, '../src')}/**/*`,`${path.resolve(__dirname, '../public')}/**/*`], { nodir: true }),
            safelist: {
                standard: [/^ant-/,/^anticon/,/^antd-/,/^table/], // 白名单，过滤以ant-开头的类名，避免吧antd的类名删除
            }
        }),
        new CompressionPlugin({
            test: /.(js|css)$/, // 只生成css,js压缩文件
            filename: '[path][base].gz', // 文件命名
            algorithm: 'gzip', // 压缩格式,默认是gzip
            threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
            minRatio: 0.8 // 压缩率,默认值是 0.8
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'), // 复制public下文件
                    to: path.resolve(__dirname, '../dist'), // 复制到dist目录中
                    filter: source => {
                        return !source.includes('index.html') // 忽略index.html
                    }
                },
            ],
        }),
    ]
})
