这是 29讲：编译工具

简答的 Babel + ts 的工程配置，

整体没有安装 ts ，只是使用 babel 作为编译工具编译了 ts 文件。

### 1，package.json 中的依赖项，

这3个依赖是使用 Babel 所必须的：
```
{
  "@babel/cli": "^7.6.2",
  "@babel/core": "^7.6.2",
  "@babel/preset-env": "^7.6.2",
}
```

这是用来编译 ts 的：
```
{
  "@babel/preset-typescript": "^7.6.0",
}
```

支持剩余和扩展操作符，
```
{
  "@babel/plugin-proposal-object-rest-spread": "^7.6.0",
}
```

### 2，.babelrc配置

只是简单的引入了用到的 presets 和 plugins

### 3，启动项

使用 babel 的命令，并指定了输出目录，

因为 babel 无法自动识别 ts/tsx 文件，所以也需要指定扩展名。
```
"scripts": {
  "build": "babel src --out-dir dist --extension \".ts, .tsx\""
},
```

---

以上，可以正常进行编译。

但不能进行类型检查！

1，需要安装 ts，并指定配置项，通过 `tsc --init` 生成 tsconfig.json 后，将 `noEmit: true` 打开，意味着，不做任何输出，只做类型检查。

2，还需要一个类型检查脚本，在脚本中开启 ts 的监控模式
```
"scripts": {
  "type-check": "tsc --watch"
},
```
并且执行类型检查脚本，需要独占一个终端！

新建一个终端 `npm run type-check`，这时就会实时的监控编码中的错误。


---

以上，就将babel和ts结合在一起了，

babel 只做语言转换，ts 只做类型检查。


---

在 babel 中，使用 ts 需要注意的事项：

# 有4种语法，在 babel 中，是无法编译的，
1. 命名空间
2. 类型断言的写法
```
class A {
  a: number = 1
}
// 类型断言要使用 as ，使用 尖括号 就无法编译
let s = {} as A
s.a = 1
```
3. 常量枚举
```
const enum E { A }
```
4. 默认导出
```
export = s
```


---

如何选择 ts 的编译工具？

1. 项目中没有使用过 babel，则首选 ts 自身的编译器 （可配合 ts-loader 使用）
2. 已经使用了babel，安装 @babel/preset-typescript （可配合 tsc 做类型检查）
3. 2种编译工具不要混用，否则会增加项目的复杂度。