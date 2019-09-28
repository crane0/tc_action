
/* 
高级类型--条件类型
由条件表达式所决定的类型
*/

/* 
T extends U ? X : Y
如果类型 T 可以被赋值给类型 U，结果类型就是 X 类型
*/
type TypeName<T> = 
  T extends string ? 'string':
  T extends number ? 'number':
  T extends boolean ? 'boolean':
  T extends undefined ? 'undefined':
  T extends Function ? 'Function':
  'object'

// string
type T1AF4 = TypeName<string>
// object
type T2AF4 = TypeName<string[]>


// (A | B) extends U ? X : Y
// 即：(A extends U ? X : Y) | (B extends U ? X : Y)
type T3AF4 = TypeName<string | number>

// 利用上面的特性，可以实现类型的过滤
// 如下：从类型T中，过滤掉可以赋值给类型U的类型。
type Diff<T, U> = T extends U ? never : T

/* 
'b' | 'c'
因为 Diff<'a', 'a' | 'e'> | Diff<'b', 'a' | 'e'> | Diff<'c', 'a' | 'e'>
*/
type T4AF4 = Diff<'a' | 'b' | 'c', 'a' | 'e'>

// 过滤undefined 和 null类型
type NotNull<T> = Diff<T, undefined | null>
type T5AF4 = NotNull<number | undefined | string | null>

/* 
Diff 和 NotNull，官方已经定义好了
Exclude<T, U>
NonNullable<T>
*/

/*
还有其他的
Extract<T, U> 从类型T中，抽取可以赋值给类型U的类型
*/
// 'a'
type T6AF4 = Extract<'a' | 'b' | 'c', 'a' | 'e'>

/* 
ReturnType接受一个函数做参数
获取函数返回值的类型
*/
// string | number
type T7AF4 = ReturnType<() => string | number>