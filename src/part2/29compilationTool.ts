/* 
ts-loader，内部使用的是ts官方的编译器tsc ,
所以，ts-loader和tsc是共享tsconfig.json配置文件的。

ts-loader 还有自己的配置，可以通过options属性传入（具体可参考官方文档）
use: [{
    loader: 'ts-loader',
    options: {
      // 默认false，开启后，会告诉编译器只做语言转换，不做类型检查。
      // 如果项目越来越大后，可以设置为true，不做类型检查，来提升编译速度。
      transpileOnly: false 
    }
}],

开启上面的配置后，如果项目中，出现了类型检查的错误，idea会提示出错，
但通过npm run build 还是可以正常编译。

如何通过开启 transpileOnly，在编译时有类型检查不通过时，报错呢？
需要借助一个插件，会将类型检查放在一个独立的进程中进行，不影响编译速度。
npm i fork-ts-checker-webpack-plugin -D

在 webpack.base.config.js中，
const forkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
引入后，直接 new forkTsCheckerWebpackPlugin() 即可
*/


/* 
在新的分支 29babel 中，记录了关于 babel + ts 实现的一些要点。
*/