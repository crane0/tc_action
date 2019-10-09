import { isModuleSpecifier } from "@babel/types"

/* 
Jest，是facebook推出的单元测试工具。
*/

/* 
ts 的工具体系
编译工具
  ts-loader
  @babel/preset-typescript
代码检查工具
  eslint + typescript-eslint
  babel-eslint

单元测试工具，也不例外
  ts-jest
  babel-jest

babel系的，缺点是：不能对 ts 进行类型检查。
*/

/* 
需要依赖 和 脚本
"scripts": {
  "test": "jest"
}
"devDependencies": {
  "@types/jest": "^24.0.18",
  "jest": "^24.9.0",
  "ts-jest": "^24.1.0",
}

生成jest的配置文件 jest.config.js
npx ts-jest config:init
*/

/* 
在这里编写的，在/test/31jest.test.ts中引用，
并使用特殊的语法进行测试，
最后运行 npm run test ,就可以判断是否通过。

重大发现！！！
因为这个项目中，/src/part2/26engineer3文件夹下，有 ts 文件中包含 test字段，
都会被进行测试是否通过。
*/

function add(a: number, b: number) {
  return a + b
}

function minus(a: number, b: number) {
  return a - b
}

module.exports = {
  add,
  minus
}


/* 
关于babel-jest，
需要切换到 29babel 分支！
*/