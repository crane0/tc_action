/* 泛型函数和泛型接口 */


// 一个打印函数
function log1(value: string): string {
    console.log(value)
    return value
}

// 如果想实现不同的类型输入
// 可使用函数重载
function log2(value: string): string
function log2(value: string[]): string[]
function log2(value: any) {
    console.log(value)
    return value
}

// 或者是联合类型
function log3(value: string | string[]): string | string[] {
    console.log(value)
    return value
}

// 或者是any类型
// 虽然最简单实现这个需求，
// 但是any类型，丢失了类型之间的约束关系，
// 即：忽略了输入参数的类型，和返回值类型（2者需一致）
function log4(value: any) {
    console.log(value)
    return value
}


// 泛型就是为了解决以上问题
// 泛型
// 可使函数或类，支持多种数据类型，并保证输入参数和返回值一致。
function log5<T>(value: T): T {
    console.log(value)
    return value
}
// 调用方式
log5<string[]>(['a', 'b'])
// 利用ts的类型推断，省略写法：
log5(['a', 'b'])


// 泛型，可定义函数，也可定义函数的类型

// 定义泛型函数类型
type Log = <T>(value: T) => T
// 泛型函数实现
let log: Log = log5




// 泛型接口
// 和类型别名的定义方式一样
// 下面的定义，和上面使用type定义是等价的。
interface Log1 {
    // 泛型约束了函数
    <T>(value: T): T
}

// 接口的所有成员，都会受到泛型变量的约束
interface Log2<T> { 
    (value: T): T
}
// 等价于
type Log22<T> = (value: T) => T

// 如果约束了所有，在实现的时候，必须指定类型
let myLog: Log2<number> = log5
myLog(5)

// 也可指定默认的类型
interface Log3<T = string> { 
    (value: T): T
}
let myLog1: Log3 = log5
myLog1('s')


// 泛型的理解
// 可以理解为：和参数等同对待，是代表类型而不是值的 参数