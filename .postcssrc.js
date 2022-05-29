// postcss.config.js
module.exports = {
  plugins: {
    // VueCLI 内部已经配置了 autoprefixer 插件
    // 所以又配置了一次，所以产生冲突了
    // 配置要兼容到的环境信息
    //   'autoprefixer': {
    //     browsers: ['Android >= 4.0', 'iOS >= 8']
    //   },

    // 配置使用 postcss-pxtorem 插件
    // 作用：把 px 转为 rem
    'postcss-pxtorem': {
      //   lib-flexible REM适配方案，把一行分成十份
      // 故rootvalue的值就是设计稿宽度的十分之一
      // 设计稿一般是750，但vant基于375
      // 唯一缺点就是使用的设计稿尺寸必须都除以2
      // ？计算麻烦 如何使vant按照37.5，自己的样式按照75

      // 通过查阅postcss-pxtorem官方文档，发现 rootValue 支持两种类型
      // 数值：固定
      // 函数：动态处理返回
      // - postcss-pxtorem 处理每个 CSS 文件的时候都会来调用这个函数
      // - 它会把被处理的 CSS 文件相关的信息通过参数传递给该函数
      // rootValue: 37.5,
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的所有属性
      propList: ['*']
    }
  }
}
