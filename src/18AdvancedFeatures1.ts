/* 
高级类型
ts 为了保证语言的灵活性，所引入的一些语言特性。
有助于应变复杂的开发场景，
适合做对象的混入
*/

/* 
高级类型--交叉类型，联合类型
*/

/* 
交叉类型，
将多个类型合并为一个新的类型，
新的类型，具有所有的特性
虽然名称看是取交集，但其实是取并集。
可使类型有一定的不确定性，增加代码的灵活性
*/
interface DogInterface {
  run(): void
}
interface CatInterface {
  jump(): void
}
let pet: DogInterface & CatInterface = {
  run() {},
  jump() {},
}

/* 
联合类型，
声明的类型并且确定，
可以为多个类型中的一个，
*/


// 字面量联合类型
// aaf1的取值，可以是number或string
let aaf1: number | string
// 除了限定变量的类型，还可以限定取值的范围
// 取值只能是这几个。
let baf1: 'a' | 'b'| 'c' 
let caf1: 1 | 2 | 3


// 对象的联合类型
class DogAF1 implements DogInterface{
  run() {}
  eat() {}
}

class CatAF1 implements CatInterface{
  jump() {}
  eat() {}
}
enum Mater {
  Boy,
  Girl
}
function getPet(master: Mater) {
  let pet = master === Mater.Boy ? new DogAF1() : new CatAF1()
  // 如果一个对象是联合类型，在类型未确定时，就只能访问所有类型的共有成员
  // 虽然名称看是取并集，但其实是取交集。
  pet.eat()
  return pet
}

/*
1种模式：可区分的联合类型
本质：结合了联合类型，和字面量类型的一种类型保护方法，
核心思想：一个类型，如果是多个类型的联合类型，并且每个类型之间，有一个公共的属性，
        就可以凭借这个公共的属性，创建不同的类型保护区块。
*/

interface Square_AF1 {
  kind: 'square'
  size: number
}

interface Rectangle_AF1 {
  kind: 'rectangle'
  width: number
  height: number
}

interface Circle_AF1 {
  kind: 'circle'
  radius: number
}

type Shape = Square_AF1 | Rectangle_AF1 | Circle_AF1
function area(s: Shape) {
  // 通过kind，创建不同的类型保护区块
  switch (s.kind) {
    case 'square':
      return s.size * s.size
    case 'rectangle':
      return s.width * s.height
    case 'circle':
      return Math.PI * s.radius ** 2
    default:
      // 检查s是否为never类型
      // 如果是，说明前面的case都被覆盖了，这个default永远不会走到，于期望结果一致。
      // 如果不是，说明前面的case有遗漏，这里编辑器会报错，就可以知道需要检查case的完整性。
      return ((e: never) => {throw new Error(e)})(s)
  }
}

console.log(area({kind: 'circle', radius: 2}))

/* 
以上代码的问题：
当没有'circle'分支和default分支时，
因为联合类型 Shape 中包含了 Circle_AF1 接口，
所以，在指定area函数的调用时，虽然编辑器没有报错，程序运行也没有报错，结果为undefined，
可能会出问题，并不是期望的结果。

所以，我们期望在case分支有遗漏时，编辑器就会有提示。

如何用 ts 约束这种模式，给出相应的错误提示？
1，为函数指定明确的返回值类型
function area1(s: Shape): number {
  // 在这里会检查是否有 number 类型的返回值
}
2，如上代码中，配置default分支，
具体作用，上面注释有写。
*/
