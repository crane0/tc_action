/* 
类型检查机制——类型兼容性 
之所以讨论，是因为ts中，可以将一些类型不同的变量，相互进行赋值
广泛存在于，接口，函数，类中
*/

/* 
当类型Y可以被赋值给另一个类型X，就可以说类型X兼容类型Y
X 兼容 Y，X（目标类型） = Y（源类型）
源类型，必须具备目标类型的必要属性
*/

// 当关闭tsconfig中strictNullChecks时，string可被赋值null
let advan: string = 'a'
advan = null
// 可以说，string类型是兼容null类型的
// 换句话说，null是string的子类型


// 接口兼容性
interface X {
  a: any,
  b: any
}

interface Y {
  a: any
  b: any
  c: any
}

let x: X = {a: 1, b: 2}
let y: Y = {a: 1, b: 2, c: 3}
// 只要Y接口具备X接口的所有属性，即使有额外的属性，也可以被认为X兼容Y类型
// 鸭式变形法。
// 成员少的，会兼容成员多的
x = y
// 无法兼容
// y = x


// 函数兼容性