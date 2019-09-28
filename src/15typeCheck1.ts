/* 类型检查机制——类型推断 */

// 基础类型推断
// 2种情况
// （1）初始化变量时，
// let a: any
let a
// let a1: number
let a1 = 1

// let b: any[]
let b = []
// let b: number[]
let b1 = [1]

// （2）设置函数默认参数时，
// x: number
let c = (x = 1) => {}

// （3）确定函数返回值时，
// let c1: (x?: number) => number
let c1 = (x = 2) => x + 1


// 最佳通用类型推断
// 当要从多个类型中，推断出一个类型时，ts会尽可能的推断出一个兼容所有类型的通用类型
// let d: (number | null)[]
// 如果设置tsconfig中，"strictNullChecks": false，则 number 和 null 就兼容了
// let d: number[]
let d = [1, null]


// 上面2种类型推断，都是从右往左，根据表达式的值推断变量的类型，
// 上下文类型推断（从左往右）
// 通常发生在事件处理中，
// 会根据左侧的事件绑定，推断右侧事件的类型
// 之前的版本里是有的，后来又没有了，无法推断了。需要手动加上。。。
window.onkeydown = (event: KeyboardEvent) => {
  // 只有指定了事件类型，这里event. 才会提示它的属性
  console.log(event)
}


// 类型断言
// 如果你很有自信，明确的知道自己的代码，是什么类型，
// 就可以推翻ts推断的类型。

interface Bar {
  foot: number
}
// 直接调用foot属性会报错，因为bar上没有该属性，
// 断言为定义接口后，就不会报错了。
let bar = {} as Bar
bar.foot = 1

// 注意，类型断言不能乱用
// 比如上面的例子，如果最后没有赋值一个foot属性，
// 虽然不会报错，但bar对象是期望有foot属性的，忘记赋值导致和预期的不一样，
// 因为已经明确的定义了接口，bar对象并没有按照接口的严格约定，赋值一个foot属性。
// 所以，最好在声明时，就指定类型，就不会遗漏
let bar1: Bar = {
  foot: 2
}

// 类型断言，可以增加代码的灵活性，
// 在改造一些旧代码时，会非常有效。
// 不能滥用，需要对上下文环境，有充足的预判