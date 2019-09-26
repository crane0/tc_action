// js没有引入抽象类，ts做了扩展
// 抽象类，
// abstract修饰，只能被继承，不能是实例化
// 抽象类中定义的方法，派生类的实例可调用
abstract class Amimal {
  eat() {
    console.log('miao')
  }
   // 如果不指定方法的具体实现，就构成了抽象方法 
   // 抽象方法的好处，
   // 明确的知道有其他的实现，抽离出共性，利于代码复用和扩展
  abstract sleep(): void
}

class Cat extends Amimal {
  // 父类抽象方法，要在子类中进行实现
  sleep() {
    console.log('this is cat')
  }
}

let cat = new Cat()
cat.eat()


class Cow extends Amimal {
  sleep() {
    console.log('this is cow')
  }
}
let cow = new Cow()

// 抽象类也可以实现多态
// 在父类中定义抽象的方法，多个子类中对该方法有具体实现
// 在程序运行时，会根据不同的对象，执行不同的操作。实现运行时的绑定

// 这个写法，因为实例的类型就是类的类型，因为实例具备类的必要属性
let animals: Amimal[] = [cat, cow]
console.log(animals)
animals.forEach((item) => {
  item.sleep()
})


// this类型，是特殊的ts类型
// 类的成员方法，可以直接返回一个this，可以方便实现链式调用
class WorkFlow {
  step1() {
    console.log('step1')
    return this
  }
  step2() {
    console.log('step2')
    return this
  }
}
new WorkFlow().step1().step2()

// 在继承的时候，this类型也可以表现出多态，
// 指：this既可以是父类型，也可以是子类型
class MyFlow extends WorkFlow {
  next() {
    console.log('next')
    return this
  }
}
// 这个this1就是 MyFlow
// 甚至new MyFlow()后调用任何方法，返回的都是 MyFlow
let this1 = new MyFlow().next().step1().step2().next()

