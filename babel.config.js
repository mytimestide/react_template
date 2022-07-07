const isDev = process.env.NODE_ENv === 'development'

module.exports = {
  // 执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
  presets:[
    [
      '@babel/preset-env',
      {
        "useBuiltIns": "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
        "corejs": 3,    // 配置使用core-js低版本
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  "plugins": [
    isDev && require.resolve('react-refresh/babel'),  // 如果是开发模式，就启动react热更新插件
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    [
      "import",				// babel-plugin-import按需加载插件
      {
        "libraryName": "antd",	// 需要按需加载的包的名字
        "style": true		// true - 加载antd的less样式文件， 'css' - 加载antd的css样式文件
      }
    ]
  ].filter(Boolean)  // 过滤空值
}
