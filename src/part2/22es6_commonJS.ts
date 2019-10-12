/* 
node，是comonJS的实现
node命令，不能直接执行 ts 文件，因为默认找的是 js

ts-node 命令可以实现
npm i ts-node -g

ts-node ./src/c.node.ts 就可以直接运行该文件
*/

/* 
在生产环境中，
通过 tsc --init 生成的tsconfig.json中的配置，
"target": "es5", 编译成的目标语言版本（其他可选配置项，注释中有）
另外，通过 tsc 这个命令编译的，默认是es3

"module": "commonjs", 编译成什么样的模块系统（默认选项和tsc一致）
*/

/* 
使用tsc命令时，
如果在命令中指定了文件，就会忽略tsconfig.json中的配置，
所有的配置，都只能在命令行中进行配置

编译 a.ts
tsc ./src/es6/a.ts -t es3  (-t是target的简写，-m是module的简写)
默认编辑为commonJS模块，
如果a.ts还有其他的依赖项，会一并进行编译。
如果target指定为es5，或es6，module会默认指定为es6 这句话存疑！

module umd模式，编写的类库有的就是这个样子
*/


/* 
兼容性问题：

因为默认module是commonJS，
则在编译时，ts处理es6的导出导入，就会做特殊处理。

在编译为commonJS模块后，会将es6模块中的顶级导出，加上default
exports['default'] = default_1  (default_1是原来的顶级导出)
并且在调用时，也会自动加上default。
不会有问题。
所以，顶级导出 export default编译后，不在是模块的顶级属性了。


在处理顶级的导入导出时，es6和commonJS是不兼容的。

es6的导出，允许有顶级导出，也有次级导出，
commonJS的导出，只要有了次级导出，exports.x = 'xx'，
  就不允许再有顶级导出了module.exports = {},
  如果写了顶级导出（无论在次级前后），则会覆盖所有的次级导出。

所以，如果一个模块用es6做了默认导出，另一模块用非es6模式做了导入，
比如let c = require(es6模块)，
则 c 并不是es6模块中的顶级导出，而是es6模块所有导出的整体，
要调用默认导出，需要 c.default （因为默认加在了default属性上）


解决：
方案1，2中模式不要混用
方案2，如果要混用，
比如在es6模块中，非要写一个顶级导出，使用语法 export = xx 
这相当于commonJS中的顶级导出module.exports = xx
所以，就不能再写其他的次级导出了。
所以，建议将所有需要导出的内容，放在一个对象中进行导出。

在commonJS中与上面的语法对应的，
导入语法：import a = require(es6模块)  a就是顶级导出。
或者可以直接使用es6的导入，import a from 'es6模块'

另外，tsconfig中的配置项 esModuleInterop 如果设置为false，就不允许上面的es6的导入了！
*/


// 文件中只要有 import 或 export ，这个文件就是一个模块!

/* 
在后面的课程中发现（第38节），
声明文件导出使用 export = xx
导入使用需要使用：import a = require(es6模块) 或 import a from 'es6模块'
才不会有问题，

否则无法使用导入函数的类型推断。
*/