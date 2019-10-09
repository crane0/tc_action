/* 
TS 官方 从 TSLint 转向 ESLint 的原因
1，TSLint 的执行规则，存在一些架构问题，影响性能。而修复这些问题，会破坏现有的规则。
2，ESLint 性能更好，并且社区用户都拥有 ESLint 的规则配置（比如针对 React 和 Vue 的规则 ），
    而不会拥有 TSLint 的规则配置。

所以，下面重点介绍 ESLint 在 ts 中的应用。
*/

/* 
ts，有类型检查，语言转换，语法错误，
ESLint，有代码风格，语法错误。

ESLint 无法直接解析 ts ,
需要一个依赖，typescript-eslint，
为 ESLint 提供了解析 ts 代码的编译器，
可以通过提供的 ESTree 将 TsLint 的抽象语法树（AST）转换为 ESLint 期望的语法树。
*/


/* 
需要安装的依赖
eslint  // 核心
@typescript-eslint/eslint-plugin  可以使eslint识别 ts 的一些特殊语法。
@typescript-eslint/parser   为eslint提供解析器

在 .eslintrc.json 配置文件中，
指定解析器，
指定插件,
有些规则需要使用类型信息，通过 parserOptions 指定 tsconfig.json 中的类型信息
具体的规则，通过 extends 指定，比如 recommended 规则。
*/

/* 
使用脚本做类型检查，
在package.json 中，指定lint脚本，可以自动检查 js, ts 文件，
"lint": "eslint src --ext .js, .ts",

现在运行 npm run lint 后，
可能会报错，比如某个规则未通过，
例，在index.ts中，let hello : string = 'Hello ts'
运行 npm run lint 后，会提示错误：不用指定变量类型，可以直接使用 ts 的类型推断即可，并会将具体规则打印出来。

如果想关闭这个规则的验证，需要在 .eslintrc.json 进行配置具体的规则（报错信息中会显示），
"rules": {
  "@typescript-eslint/no-inferrable-types": "off"
}
*/

/* 
还可以使用插件辅助开发，
比如在vscode的商店中，搜索 eslint 插件，
启用后-> 右下角设置/配置扩展设置 -> 选择在setting.json 中编辑，
在 setting.json 中，需要有2个配置项：
{
  "eslint.autoFixOnSave": true,   // 保存文件时，会自动修复
  "eslint.validate": [    // eslint检测的语言，这里配置了5种。
    "javascript",
    "javascriptreact",
    {
      "language": "javascript",
      "autoFix": true,
    }
    {
      "language": "html",
      "autoFix": true,
    }
    {
      "language": "vue",
      "autoFix": true,
    }
  ]
}

配置以上后，在 .eslintrc.json 中，rules使用默认的即可。
*/


/* 
babel-eslint 和 typescript-eslint

babel-eslint，支持ts 所没有的额外的 语法检查，但不支持类型检查。
typescript-eslint， 基于 ts 的 AST，支持创建基于类型信息的规则（tsconfig.json）

建议：
二者底层机制不同，不要混用，
babel体系，建议用 babel-eslint ，否则用 typescript-eslint
*/