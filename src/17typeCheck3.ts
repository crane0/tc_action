/* 
类型检查机制3——类型保护
*/
enum Type {
  Strong, 
  Week
}

class Java {
  helloJava() {
    console.log('hello java')
  }
  java: string = 'java'
}

class JavaScript {
  helloJavaScript() {
    console.log('hello javaScript')
  }
  javascript: string = 'javascript'
}

// 如下函数，因为在运行时，不知道会传入哪个，每一处都需要加类型断言，可读性差
function getLanguage(type: Type, x: number | string) {
  let lang = type === Type.Strong ? new Java() : new JavaScript()
  // 这里直接写会报错
  if ((lang as Java).helloJava) {
    (lang as Java).helloJava()
  } else {
    (lang as JavaScript).helloJavaScript()
  }

  // 1，instanceof，用于判断实例是否属于某个类
  // 并且可以提示该实例的方法
  if (lang instanceof Java) {
    lang.helloJava()
  } else {
    lang.helloJavaScript()
  }

  // 2，in，判断某个属性，是否属于某个对象
  if ('java' in lang) {
    lang.helloJava()
  } else {
    lang.helloJavaScript()
  }

  // 3，typeof，判断某个变量的类型，
  // 并且会提示该类型的属性和方法。
  if (typeof x === 'string') {
    x.length
  } else {
    x.toFixed(2)
  }

  // 3类型保护函数
  if (isJava(lang)) {
    lang.helloJava()
  } else {
    lang.helloJavaScript()
  }

  return lang
}

// 类型保护机制，用来解决以上问题
// 可以提前对类型做出预判
/* 
ts 能够在特定的区块中，保证变量属于某种特定类型，
可在该区块中，放心引用此类型的属性，或调用此类型的方法。
*/

// 4种创建特殊区块的方法：
// （1）instanceof，用于判断实例，是否属于某个类
// （2）in，判断某个属性，是否属于某个对象
// （3）typeof

// （4）创建类型保护函数，判断对象的类型
// 类型保护函数：某些判断可能不是一条语句能够搞定的，需要更多复杂的逻辑，适合封装到一个函数内
// lang is Java叫类型伪词
function isJava(lang: Java | JavaScript): lang is Java {
  return (lang as Java).helloJava !== undefined
}