/* 泛型类和泛型约束 */

// 泛型也可以约束类成员

// 将泛型变量放到类名后面，就可以约束所有类成员。
class LogC<T> {
  run(value: T) {
    console.log(value)
    return value
  }
  // 泛型不能应用于，类的静态成员，静态成员不能引用类型参数
  // static run1(value: T) {
  //   console.log(value)
  //   return value
  // }
}

// 可以显式传入类的类型，
// 实例的方法，会受到泛型的约束
let logc1 = new LogC<number>()
logc1.run(2)

// 不指定类型参数，value值可任意
let logc2 = new LogC()
logc2.run({a: 'log'})


// 类型约束
interface Length {
  length: number
}
// 如下，直接获取value.length，T上是不存在length属性的，
// 继承Length接口后，T就收到了约束，不能再传递任意类型了，必须传有length属性的参数
function logf<T extends Length>(value: T): T {
  console.log(value, value.length)
  // 使用泛型后，函数的类型就不确定了，如果不是void 或 any，就必须有返回值
  return value
}
logf(['1'])
logf('beautiful')
logf({length: 1})


/* 
泛型的好处
1，增强程序的可扩展性，函数和类可以轻松支持多种数据类型
2，增强代码的可读性，不必写多条函数重载，也不用写冗长的联合类型声明
3，灵活控制类型之间的约束（类型可以友好的融入各种环境）
*/