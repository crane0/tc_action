/* 
声明合并，ts中独特概念，
编译器会把程序中多个地方，具有相同名称的声明，合并为一个声明。
好处：将程序中散落各处的重复声明合并在一起。 
甚至，在不用的文件中，也算是重复声明。

其实该特性，是为了兼容旧的开发模式，
在以后的开发中，还是尽量避免。
*/

/* 
声明合并——接口
*/

// 非函数成员，保证唯一性，如果不唯一，类型必须相同。
interface ASTA {
  x: number
  // y: string
}
interface ASTA {
  y: number
}

// 上面的接口声明，默认会合并在一起，
// 约束的对象，需要全部实现。
let aSTA: ASTA = {
  x: 1,
  y: 1
}

// 函数成员，每一个函数，都会被声明为函数重载。在接口中定义的，就是函数重载的列表。
interface BSTA {
  foo(bar: number): number // 5
  foo(bar: 'a'): number // 1
}
interface BSTA {
  foo(bar: string): string // 3
  foo(bar: number[]): number[] // 4
  foo(bar: 'b'): number[] // 1
}
// 所以，在实现时，就需要一个更宽泛的类型。
let bSTA: BSTA = {
  foo(bar: any) {
    return bar
  }
}

/* 
之前说函数重载时，会有顺序的问题，默认是按照重载列表的声明顺序。
接口合并时，顺序是如何确定的？
原则：
接口内部，按书写顺序，
接口之间，后面的接口会排在前面。
例外，函数的参数，是字符串字面量，该声明会提升到整个列表的最顶端。
*/


/* 
声明合并——命名空间

1，命名空间，导出的成员，是不可以重新定义的
*/
namespace CSTA {
  const pi = Math.PI
  export function circle(radius: number) {
    // 2个**，代表后面的是次方数
    return pi * radius ** 2
  }
  // 导出的成员，是不可以重新定义的
  // export function square(x: number) {
  //   return x * x
  // }
}

namespace CSTA {
  export function square(x: number) {
    return x * x
  }
}


/* 
声明合并——命名空间和函数

同名的命名空间，相当于给函数，增加了属性
*/
function DSTA() {}
namespace DSTA {
  export let version = '1.0'
}


/*
声明合并——命名空间和类

同名的命名空间，相当于给类，增加了静态属性
*/
class ESTA { }
namespace ESTA {
  export let state = 1
}


/*
声明合并——命名空间和枚举

同名的命名空间，相当于给枚举类型，增加了一个属性或方法
*/
enum FSTA { 
  Red,
  Yellow,
  Blue
}
namespace FSTA {
  export let item = 'color'
  // export function mix() {}
}

console.log(FSTA)


// 注意，命名空间和函数，类在一起合并时，要放在其后，否则会报错
// 和枚举在一起时，顺序不影响。