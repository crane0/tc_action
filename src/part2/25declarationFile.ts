/* 
如何在ts中引入外部类库，以及为他们编写声明文件
*/

/* 
类库
全局类库，（需要在index.html中引入）
模块类库
umd类库
  可以通过全局的方式引用（配合webpack插件实现），也可以用模块化的方式引用
*/

// --save-dev  ==  -D

/* 
在使用非ts编写的类库时，比如js编译的jQuery，
必须为这个类库，编写声明文件来暴露它的API。
有时，这些声明文件是包含在源码中的，
有时，是单独提供的，需要额外的安装。
大多数的声明文件，社区都已经为我们编写好了，使用方法，安装一个类型声明包
npm i @types/包名 -D
之后，就可以正常的使用依赖了。
*/

/* 
可以通过这个网站来查找，是否有目标包的声明文件
https://microsoft.github.io/TypeSearch/

如果没有，就需要自己编写，（正好也可以为社区做贡献）

这个网站，提供了如何为社区贡献声明文件的方法，
http://definitelytyped.org/guides/contributing.html

所以，首先需要学会如何编写。
*/

/* 
编写3种类库，其声明文件的写法
其声明文件命名格式为，包名.d.ts

全局类库，
编写格式文件中有讲解，
declare 为外部变量，提供类型声明

模块类库
和全局类库的差不多，

umd库
export as namespace 名称（umd库，该语句不可缺少）

另外，umd库一般是通过模块引入的，如果在模块中，通过全局引入使用，ts会有错误提示，
allowUmdGlobalAccess 设置为 false  即可。
*/


/* 
插件
*/

// 模块插件，为模块类库添加自定义的方法，

// import m from 'moment'
// // 需要使用declare来声明一下即可。
// declare module 'moment' {
//   export function myFunction(): void
// }
// m.myFunction = () => {}



// 全局插件，为全局类库添加自定义方法，
import moduleLib from './25libs/module-lib'
// declare global 只能用于环境模块声明中，所以上面的import为了将这个文件变为环境模块。
declare global {
  namespace globalLib {
    function doAnything(): void
  }
}
// 对全局的命名空间，造成了一定的污染（不建议这样做）
globalLib.doAnything = () => {}


/* 
声明文件的依赖
如果一个模块比较大，编写声明文件就会很麻烦，
会对整体进行拆分，分别编写声明文件，
此时，声明文件之间就会有依赖关系。
*/