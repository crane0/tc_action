// 接口，
// 只能约束类的共有成员，有哪些属性，以及他们的类型
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
// 相当于接口把类的成员都抽象了出来
// 即：只有类的成员结构，没有具体实现
class Auto {
  state = 1
  // 如果添加了私有成员，则class C 就会报错，
  // 因为它不是Auto的子类，自然也不能包含非Auto的非公有成员
  // private state2 = 2
}

// AutoInterface接口中隐含了state属性
// 注意，接口在抽离类的成员时，public private protected 都被抽离了
interface AutoInterface extends Auto {

}

// 要实现AutoInterface接口，只要类的成员有state属性即可
class C implements AutoInterface {
  state = 1
}

// Auto的子类也可以实现接口AutoInterface
// 不必再实现state属性了，因为时Auto的子类，自然就继承了
class Bus extends Auto implements AutoInterface {

}