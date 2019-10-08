/* 
ts3.0新特性——工程引用

单个配置文件不能解决的问题，
比如src目录下，有3个文件夹client，server，common，
和src的同级目录下，还有test测试案例，

这样，如果想只编译某一个文件夹，单个配置文件是无法解决的。

工程引用，就是解决以上问题。
1，可以灵活配置输出目录，
2，可以使工程之间产生依赖关系，有利于将一个大的项目进行拆分。
3，可以利用增量编译，提升编译速度。
*/

/* 
新发现的问题
tsconfig.json，是针对于执行编译时的目录，并不一定是根目录。
*/

/* 
在26engineer3中有新旧的对比。
在new文件夹下，基础 tsconfig.json 配置中，下面2个配置是必须的：

// 工程可以被引用，并且可以增量编译。
"composite": true, 
// 生成声明文件
"declaration": true,

每个项目还有自己的 tsconfig.json 配置，
会继承基础的配置，
指定输出目录，
配置依赖的工程（reference）

新的构建模式 build 构建
可以单独构建一个工程，相应的依赖也会自动的构建
// verbose 打印构建信息
tsc -b src/server --verbose
tsc -b src/server --clean（会清空已经构建的文件）

并且因为 client 和 server 都依赖common，
如果已经构建了client，则common也会被构建，
当再次构建 server 时，common就不会再被构建了。

因为输出目录中，已经有增量编译的文件，所有二次构建的速度也会提升。
*/