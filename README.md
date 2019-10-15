## 项目介绍

1. src 目录

+-- src
|   +-- part1 基础篇21讲
|   +-- part2 工程篇10讲

2. 其他分支

`29babel` 分支，和以下内容有关，具体的要点在分支对应的 READEME.md 中。

第29讲：编译工具——babel，

第31讲：jest单元测试——babel-jest

---

后来添加的，课程最后几节，渐进式迁移项目的策略

## 44共存策略

即：新的需求，用 ts 编写

### 1，改造

以 react 项目为例，先需要引入依赖
```
npm i typescript @types/react @types/react-dom -D
```

`tsc --init` 一个 tsconfig.json 文件，更改配置项
```
{
  "compilerOptions": {
    "jsx": "react"
  }
}
```

> 这时需要做一个选择，是否放弃 babel，如果是深度依赖，那就继续使用吧，用 babel 做语言转换，用 tsc 做类型检查即可。
否则，可以放弃 babel，使用轻量级的 ts-loader。

因为 react 的项目大多使用的都是 babel，下面以 babel 为例，

先安装依赖
```
npm i @babel/preset-typescript -D
```

修改 .babelrc 文件，引入 ts
```
{
  "presets": [
    "@babel/env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ]
}
```

修改 webpack 的基础配置 `webpack.base.config.js`
```
module.exports = {
  resolve: {
      extensions: ['.ts', '.tsx']
  },
  module: {
      rules: [
          {
              test: /\.(j|t)sx?$/i,
              use: [{
                  loader: 'babel-loader'
              }],
              exclude: /node_modules/
          }
      ]
  },
}
```

重新启动项目后，就可以正常运行了，不过还没有类型检查。

### 2，类型检查

tsconfig.json，更改配置项
```
{
  "compilerOptions": {
    "noEmit": "true"
  }
}
```

package.json，增加类型检查脚本
```
"scripts": {
  "type-check": "tsc --watch",
},
```

以上，对 ts, tsx 的类型检查也完成了。

还可以更进一步，对 js, jsx 也做类型检查

tsconfig.json，更改配置项
```
{
  // 为了不去检查 build 中 webpack 的配置文件，因为是 js 文件
  "inclue": [
    "./src/**/*"
  ]
  "compilerOptions": {
    "allowJs": "true",
    "checkJs": "true",
  }
}
```
`npm run type-check` 开启监听类型检查后，项目中可能会有很多的报错，为了暂时先不处理，可以先让目标文件不接受检查，

2 种不修改代码的避免类型检查的规则：
```
// @ts-nocheck
function add(a: number, b: number) {
  return a + b
}
```

js docker 的注释，添加之后会在使用被注释函数时，就会做类型检查。
```
/**
 * 
 * @param {number} a 
 * @param {number} b
 */
function add(a: number, b: number) {
  return a + b
}
```

---

## 45，宽松策略

即：将 js, jsx 文件重命名为 ts, tsx ，并在不修改代码的情况下，做最宽松的类型检查。

### 1，重命名，如果有很多就需要借助工具，比如 shelljs
```
npm i shelljs @types/shelljs ts-node -D
```

根目录下新建 renameJS.ts，用来做重命名，
```
// 查找目标文件夹，会返回一个数组，对数组进行过滤，只选择 js jsx 的文件，做重命名工作，
// 新文件的名字，会基于旧文件的名字进行替换，
import * as shelljs from 'shelljs'

shelljs.find('src')
.filter(file => file.mactch(/\.jsx?$/))
.forEach(file => {
  let newName = file.replace(/\.j(sx?)$/, '.t$1')
  shelljs.mv(file, newName)
})
```

package.json，增加重命名脚本
```
"scripts": {
  "rename-js": "ts-node renameJS.ts",
},
```

重命名后，需要做一些修改，比如 webpack 的入口文件不再是 js 了。

### 2，修改类型检查规则

更改 tsconfig.json 的下面的配置项，就变成了最宽松的类型检查规则。
```
{
  "compilerOptions": {
    // 注释下面的，因为已经没有 js 文件了
    // "allowJs": "true",
    // "checkJs": "true",

    // 因为之前的 js 文件有大量的变量都没有类型声明，关闭下面的规则（是否允许隐式的 any 类型），可以屏蔽一大部分的报错
    "noImplicitAny": false,
    // 甚至也可以将严格的类型检查选项关闭
    "strict": false,

    /* 和函数相关的选项，只会显示错误，不会阻碍编译 */
    "noUnusedLocals": false,                /* 检查只声明未使用的，局部变量 */
    "noUnusedParameters": false,            /* 检查未使用的，函数参数 */
    "noFallthroughCasesInSwitch": false,    /* 防止 switch 语句贯穿 */
    "noImplicitReturns": false,             /* 每个分支都要有返回值（if else 2个分支也都要有） */
  }
}
```

以上只是临时的过渡方案，但并不会影响构建。

--- 

## 46，严格策略

执行最严格的检查规则，处理剩余的报错。

上节课中的类型检查，只是临时的处理，最终还是要慢慢改为严格的策略。


## 结束语

ts 的关键点是学习类型思维，这是前端的短板。

投入产出比，ROI

收益
1. 提升代码质量
2. 增加代码可维护性
3. 提升开发效率
4. 重塑类型思维

成本
1. 思维转换
2. 对接现有开发生态
3. 项目迁移
4. 接口，声明文件维护

要开放，面向未来编程。