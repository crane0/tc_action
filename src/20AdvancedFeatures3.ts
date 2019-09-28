/* 
高级类型--映射类型
可以从旧的类型，生成新的类型
*/

interface ObjAF3 {
  a: number,
  b: string,
  c: number,
}

// 比如，把一个类型中的所有属性，变成只读。
// 使用type定义类型别名，
// ts内置的泛型接口：Readonly
type ReadonlyObjAF3 = Readonly<ObjAF3>

/*
ts内置的泛型接口：Readonly内部实现方式
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
P in 相当于执行了一次封印操作，
将变量P，依次的绑定到 T 的所有属性上。
返回值就是P的类型，
最后，加上readonly
*/


// 所有属性可选
type PartialObjAF3 = Partial<ObjAF3>
/* 
type Partial<T> = {
    [P in keyof T]?: T[P];
};
*/
 

// 抽取指定子集
type PickObjAF3 = Pick<ObjAF3, 'a'| 'b'>
/* 
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
*/


/* 
同态，
只会作用于目标对象，不会引入新的属性。
以上3种预定义都属于
*/

/* 
非同态，
产生新的属性
*/
// 创建新的属性
type Record1ObjAF3 = Record<'x' | 'y' ,ObjAF3>
type Record2ObjAF3 = Record<'x' | 'y' ,ObjAF3['a']>