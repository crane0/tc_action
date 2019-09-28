/* 
高级类型--索引类型
*/

// 场景：从对象中，获取属性的值，建立一个集合。
let objAF2 = {
  a: 1,
  b: 2,
  c: 3,
}
function getValues(obj: any, keys: string[]) {
  return keys.map(key => obj[key])
}
console.log(getValues(objAF2, ['a', 'b']))

// 如果传入的属性，objAF2中没有，就会返回[undefined]
// ts 如何对这种模式，进行类型约束呢（让其提示出错）？
// 使用索引类型

/* 
索引类型的查询操作符 keyof T
表示：类型 T 的所有公共属性的 字面量的 联合类型
*/
interface objTAF2 {
  a: number,
  b: number
}

// let key: "a" | "b"
let key: keyof objTAF2


/*
索引访问操作符 T[K]
表示：对象 T 的属性 K，所代表的类型 
 */

// 表示objTAF2['a']所代表的类型，number
let value: objTAF2['a']



/* 
泛型约束 T extends U
表示泛型变量，可以通过继承某个类型，获得某个属性
*/

// 约束，keys的元素，一定是obj的属性
/* 
定义泛型变量 T，约束obj，
定义泛型变量 K，约束keys数组，
对K，增加类型约束，让它继承obj所有属性的联合类型，
函数返回值是数组，数组的元素属性类型，就是属性 K 对应的类型
*/
function getValues1<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(key => obj[key])
}
// 经过以上约束，ts类型检查就会生效，在传入obj中没有的属性时，会报错。
// console.log(getValues1(objAF2, ['c', 'd']))


// 索引类型，可以实现对 对象属性的查询和访问，
// 再配合泛型约束，可建立对象，对象属性，对象属性值的约束关系。