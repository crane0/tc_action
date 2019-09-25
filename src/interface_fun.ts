// 定义函数
let adds: (x: number, y: number) => number

// 用接口来定义函数
// 不需要定义函数的名称，直接定义参数类型
interface Add {
  // 函数返回值用冒号，不是箭头
  (x: number, y: number): number
}
// 以上2种方式是等价的

// 使用类型别名，定义函数
// 使用 type 关键字为函数起个名字，Add1
type Add1 = (x: number, y: number) => number

// 以上都只是定义函数
// 实现
let addFea: Add = (a, b) => a + b


// 混合类型接口
// 即可以定义函数，也可以像对象一样，拥有属性和方法
interface Lib {
  // 既没有参数，也没有返回值，
  (): void
  version: string
  doSomething(): void
}

// 实现
// 这里需要使用类型断言，否则会报错
// 因为明确的知道，这个lib就是定义的接口类型
// let lib: Lib = (() => {}) as Lib
// lib.version = '1.0'
// lib.doSomething = () => {}

// 缺点，在全局暴露了一个lib变量。
// 这样就可以创建多个实例了。
function getLib() {
  let lib: Lib = (() => { }) as Lib
  lib.version = '1.0'
  lib.doSomething = () => { }
  return lib
}

let lib1 = getLib()
lib1()
lib1.doSomething()


// 接口还可以定义类和结构类型，在之后讲类的时候，会提到