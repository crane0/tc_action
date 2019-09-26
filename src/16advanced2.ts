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
// 一般发生在，2个函数相互赋值的情况下，

// 传入的参数就是源类型，Handler就是目标类型
type Handler = (x: number, y: number) => void
function hof(handler: Handler) {
  return handler
}

// 如果目标函数，要兼容源函数，要同时满足3个条件

// 1，参数个数
// 目标函数 > 源函数
let handler1 = (a: number) => {}
hof(handler1)
let handler2 = (a: number, b: number, c: number) => {}
// 不能被传入，
// hof(handler2)

// 固定参数 和 剩余参数，可以兼容其他2个
// 可选参数，不可以兼容其他2个，如果要兼容，tsconfig中，strictFunctionTypes要设置为false
let ad = (a: number, b: number) => {}
let bd = (a?: number, b?: number) => {}
let cd = (...args: number[]) => {}
ad = bd
ad = cd


// 2，参数类型
// 需要匹配
let ed = (a: string) => {}
// 参数类型不兼容
// hof(ed)

interface Print2D {
  x: number
  y: number
}
interface Print3D {
  x: number
  y: number
  z: number
}
// 此时，参数个数和类型都相同
let p2 = (p: Print2D) => {}
let p3 = (p: Print3D) => {}
// 作为 参数 时，接口成员多的，兼容属性少的，记忆时参考情况1参数个数
// 与接口的兼容性相反！
p3 = p2
// 如果要兼容，strictFunctionTypes: false即可
// p2 = p3

// 函数的参数，可以相互赋值的情况，称为函数参数的双向协变，
// 允许将1个精确的类型，赋值给1个不精确的类型，
// 就不需要将1个不精确的类型断言为精确的类型了。


// 3，返回值类型
// 目标函数需要与源函数相同，或为其子类型
let fd = () => ({name: 'alice'})
let gd = () => ({name: 'alice', location: 'beijing'})
// 返回值类型：fd是gd的子类型
// 成员少的，兼容成员多的（与接口兼容性一致）。
fd = gd


// 函数重载列表，就是目标函数， 
// 具体的实现，就是源函数
// 程序在运行时，编译器会查找重载列表，用第1个匹配的定义，来执行实现的函数
// 所以在重载列表中，目标函数的参数，要多于源函数的参数，而且返回值类型也要符合相应的要求。
function overload(a: number, b: number): number
function overload(a: string, b: string): string
function overload(a: any, b: any): any {}
// 参数个数多了
// function overload(a: any, b: any, c: any): any {}
// 返回值类型不兼容
// function overload(a: any, b: any) {}



// 枚举类型兼容