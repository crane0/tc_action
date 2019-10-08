/* 
tsconfig.json 的配置
本节，与文件相关的选项。
*/


/* 
"files": []
编译器需要编译的单个文件的列表，

"include": ["src"]
编译器需要编译的文件或目录,
例，会编译src文件夹下的所有文件，包括子目录
支持通配符，如果是"src/*"，就只会编译一级目录。

files和include会合并。

"exclude": ['src/lib']
默认始终会排除node_modules，和所有的声明文件
*/

/* 
配置文件之间是可以继承的，
可以把基础的配置抽离出来，方便复用。
比如在根目录下自定义的是 tsconfig.base.json
可以在tsconfig.json中使用
{
  "extends": "./tsconfig.base"
  如果在这里定义了和tsconfig.base.json中相同的配置，会将其覆盖！
}

在保存文件时，自动编译
compileOnSave: true
但是vscode不支持。。。
*/