
// 函数定义+实现
function add1(x: number, y: number) {
  return x + y
}

// 以下3种只是定义，还没有实现
let add2: (x: number, y: number) => number
type add3 = (x: number, y: number) => number

interface add4 {
  (x: number, y: number): number
}


// ts中，函数的形参和实参的个数，必须对应

// 可选参数（必须位于必选参数之后）
function add5(x: number, y?: number) {
  return y ? x + y : x
}

// 函数默认值
function add6(x: number, y = 0, z: number, c = 1) {
  return x + y + z +c
}
// 在调用时，
// 必选参数前，默认参数是不可以省略的，必须明确的传入undefined，来获取默认值
// 必选参数后，可以不传。
add6(1, undefined, 3) // 5


// 剩余参数，是一个数组
function add7(x: number, ...rest: number[]) {
  return x + rest.reduce((pre, cur) => pre + cur)
}


// 函数重载，
// 在静态语言中，如果2个函数名称相同，但参数个数或类型不同
// 好处：不需要为相似功能的函数，使用不同的函数名称，增强函数的可读性。

// ts中略有不同。
// 要求先定义一系列名称相同的函数声明
// 然后在一个类型最宽泛的版本中，实现这个重载
function add8(...rest: number[]): number
function add8(...rest: string[]): string
function add8(...rest: any[]): any {
  let first = rest[0]
  if (typeof first === 'string') {
    return rest.join('')
  }
  if (typeof first === 'number') {
    return rest.reduce((pre, cur) => pre + cur)
  }
}
// ts编译器在处理重载时，会去查询定义的重载列表，
// 并会从第一个依次尝试，所以应该将最容易匹配的定义在最开始。
console.log(add8(1, 2, 5))
console.log(add8('1', '2', '5'))