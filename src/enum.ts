// 数字枚举
enum Role{
  // 可以指定初始值，则下面的依次递增, 1,3,4,5,6
  Reporter = 1,
  Developer = 3,
  Maintainer,
  Owner,
  Guest,
}
// console.log(Role)
// console.log(Role.Reporter)

// 在编译为js后，是一个对象，并且添加了一些其他的成员，
// 就既可以用枚举成员的名字来索引，也可以用值来索引。
// 实现原理，反向映射，可以将代码拷贝到 playground 中就可以看到编译后的js

// var Role;
// (function (Role) {
//   Role[Role["Reporter"] = 1] = "Reporter";
//   Role[Role["Developer"] = 3] = "Developer";
//   Role[Role["Maintainer"] = 4] = "Maintainer";
//   Role[Role["Owner"] = 5] = "Owner";
//   Role[Role["Guest"] = 6] = "Guest";
// })(Role || (Role = {}));



// 字符串枚举，不能进行反向映射，
enum Message {
  Success = '成功',
  Fail = '失败'
}

// 编译后的js
// var Message;
// (function (Message) {
//   Message["Success"] = "\u6210\u529F";
//   Message["Fail"] = "\u5931\u8D25";
// })(Message || (Message = {}));



// 数字枚举和字符串枚举，混用，
// 异构枚举，容易引起混淆，不建议使用
enum Answer {
  N,
  Y = 'Yes'
}



// 枚举成员性质
// 值只读，不可修改，下面代码会报错
// Role.Reporter = 2



//  枚举成员类型，2类，
enum Char {
  // 第1类，const enum 常量枚举，包括3种情况
  // 常量枚举成员，会在编译时，计算出结果，以常量的形式，出现在运行环境，
  a, // 无初始值
  b = Char.a, // 对已有枚举成员的引用
  c = 1 + 3, // 常量表达式，

  //  第2类，computed enum ，需要被计算的枚举成员，就是一些非常量的表达式，必须赋初始值
  // 不会在编译阶段计算，而是被保留到程序执行阶段
  d = Math.random(),
  e = '123'.length
}

// 编译后的js
// var Char;
// (function (Char) {
//   // 第1类  
//   Char[Char["a"] = 0] = "a";
//   Char[Char["b"] = 0] = "b";
//   Char[Char["c"] = 4] = "c";
//   //  第2类，
//   Char[Char["d"] = Math.random()] = "d";
//   Char[Char["e"] = '123'.length] = "e";
// })(Char || (Char = {}));



// 常量枚举，通过const声明的枚举
const enum Month {
  Jan,
  Feb,
  Mar,
}

let month = [Month.Jan, Month.Feb, Month.Mar]

// 特性：会在编译阶段被移除，编译后的js什么都没有，
// 作用：当不需要对象，只需要对象的值的时候，可以减少在编译环境的代码，

// 以上一起编译后的js
// let month = [0 /* Jan */, 1 /* Feb */, 2 /* Mar */];


// 枚举类型
// 在某些情况下，枚举和枚举成员，都可以作为一种单独的类型存在，
// 情况1，枚举成员没有任何初始值
enum E {
  a, b
}
// 情况2，所有成员都是数字枚举 
enum F {
  a = 0,
  b = 1,
}
// 情况3，所有成员都是字符串枚举 
enum G {
  a = 'aa',
  b = 'bb'
}

// 例，任意的number类型赋值给枚举类型，取值也可以超出枚举成员的定义
let e: E = 3
let f: F = 3

// 2种不同类型的枚举，是不能进行比较的。
// e === f 会报错

// 定义枚举成员类型
let e1: E.a
let e2: E.b
let e3: E.a
// e1 === e2 会报错，因为不是同一类型。就算是，也需要赋值之后，才能使用（进行比较）

// 字符串枚举，取值只能是枚举成员的类型
let g1: G = G.b
// 这个就只能是自己了
let g2: G.a = G.a

// 不容易记忆的硬编码，在未来中可能改变的常量，抽取出来，定义为枚举类型，
// 可以提高程序的可读性，可维护性
