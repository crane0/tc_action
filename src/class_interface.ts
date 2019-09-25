// 接口，
// 可以约束类的共有成员，有哪些属性，以及他们的类型
// 不能约束类的构造函数
interface Human {
  name: string
  eat(): void
}

// 类实现接口时，必须实现接口中所有的属性和方法
class Asian implements Human {
  constructor(name: string) {
    this.name = name
  }
  name: string
  eat() {}
}

// 接口可以相互继承，并且一个接口可以继承多个接口
// 可以抽离出可重用的接口，也可以将多个接口合并成一个接口
interface Man extends Human{
  run(): void
}

interface Child {
  cry(): void
}

interface Boy extends Man, Child {}

// boy需要实现Boy继承的所有属性和方法
let boy: Boy = {
  run() {},
  name: 'boy',
  eat() {},
  cry() {}

}

// 接口继承类