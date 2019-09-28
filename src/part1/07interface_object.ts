
// 假设从后端获取一组数据，渲染到页面，
interface List {
  id: number,
  name: string
}

interface Result {
  data: List[]
}

function render(result: Result) {
  result.data.forEach((value) => {
    console.log(value.id, value.name)
  })
}

let result = {
  data: [
    {id: 1, name: 'A'},
    {id: 2, name: 'B'},
  ]
}
~
render(result)


// 如果传入的对象，满足必要的条件，那就是被允许的。
// 即使传入多余的字段，也可以通过类型检查。
// 形象的说法，如果一只鸟看起来像鸭子，叫起来像鸭子，游起来像鸭子，那就可以当做是一只鸭子。
// let result = {
//   data: [
//     { id: 1, name: 'A', sex: 8},
//     { id: 2, name: 'B' },
//   ]
// }

// 如果直接传入对象字面量的话，就会报错，ts会对额外的字段进行类型检查。
// render({
//   data: [
//     { id: 1, name: 'A', sex: 8 },
//     { id: 2, name: 'B' },
//   ]
// })

// 绕过检查的方式有3种，
// 第1种就是上述方式，把一个对象字面量赋值给一个变量

// 第2种方式，使用类型断言
// 明确的告诉编译器，我们知道这个对象的类型就是Result
// render({
//   data: [
//     { id: 1, name: 'A', sex: 8 },
//     { id: 2, name: 'B' },
//   ]
// } as Result)

// 2种断言方式等价（不建议这种，在React中会有歧义）
// render(<Result>{
//   data: [
//     { id: 1, name: 'A', sex: 8 },
//     { id: 2, name: 'B' },
//   ]
// })

// 第3种，使用字符串索引签名
// 返回值类型是 any，
// 用任意一个字符串去索引 List，可以得到任意的结果，这样List就会支持多个属性了。
// interface List {
//   id: number;
//   name: string;
//   [x: string]: any;
// }


// 接口成员的属性

// readonly 只读
// ? 可有可无
// interface List {
//   readonly id: number;
//   name: string;
//   age?: number
// }


// 以上接口属性的个数，都是固定的
// 当不确定接口中有多少个属性时，可使用 可索引类型的接口，可使用数字或字符串去索引


// 数字索引的接口

// 用任意的数字去索引StringArray，都会得到一个string
// 相当于声明了一个字符串类型的数组，
interface StringArray {
  [index: number]: string
}

let chars: StringArray = ['A', 'B']


// 字符串索引的接口

// 用任意的字符串去索引Names，都会得到一个string
interface Names {
  [x: string]: string
  // 以上声明之后，就不能再声明number类型的成员了
  // 因为 number 类型的 y 不能赋值给字符串索引类型 string
  // 例：'a' = Names.y(是一个数字) ,number 类型不能赋值给 string 类型
  // y: number
}
 
// 2种索引签名是可以混用的，
// 既可以用数字，也可以用字符串去索引Names2，都会得到一个string
interface Names2 {
  [x: string]: string
  // 数字索引签名的返回值，一定要是字符串索引签名的子类型
  // 因为js会进行类型转换，将number转换为string，为了保证类型的兼容性
  [z: number]: string
  // 如果是number，就不兼容了。
  // [z: number]: number
}

// 下面的就可以，因为number是any的子类型
interface Names3 {
  [x: string]: any
  [z: number]: number
}