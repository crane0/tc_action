// 总体而言，覆盖了es6的类，同时引入的其他的一些特性
// 类的继承，成员修饰符

// 技巧，鼠标放到 方法或函数上，就可以查看返回值类型
// 冒号后面的叫：类型注解

// 无论在js ,还是ts中，
// 类成员的属性，是实例属性，不是原型属性
// 类成员的方法，是原型方法
class Dog {
  constructor(name: string) {
    this.name = name
  }
  name: string
  run() {}
  private pri() {}
  protected pro() {}
  readonly legs: number = 4
  static food: string = 'bones'
}

// 只有 constructor 和 run
console.log(Dog.prototype)
// 实例，可以理解为类的引用
let dog = new Dog('wang')

// ts中，实例的属性，必须有初始值，或在构造函数中被初始化。（如果没有属性，可以不写构造函数）
// 3种方式
// this.name = name
// name: string = 'dog'
// name?;: string


// 类的继承 
class Husky extends Dog {
  // super表示父类的实例，
  // 父类的构造参函数的参数都要加上
  constructor(name: string, color: string) {
    super(name)
    // this 一定要在super之后调用
    // 自己的属性，也要在构造函数中初始化
    this.color = color
  }
  color: string
}


// 类的成员修饰符

// 共用成员 public （类的所有成员，默认都是public）

// 私有成员 private，
// 只能被类本身调用，不能被实例调用，也不能被子类调用
// 构造函数加上private，则该类既不能被实例化，也不能被继承

// 受保护成员 protected，
// 只能在类，或子类中使用，不能在实例中访问
// 构造函数加上protected，则该类不能被实例化，只能被继承，相当于声明了一个基类。

// 只读 readonly（只能修饰属性，不能修饰方法）
// 不能更改，且必须被初始化，

// 静态成员 static
// 只能通过类名调用，不能被实例调用，但可以被继承（子类类名调用）。


// 构造函数的参数，也可添加修饰符
// 将参数自动变成实例的属性，就可以省略在类中的定义和初始化了
class Husky1 extends Dog {
  constructor(name: string, public color: string) {
    super(name)
  }
}