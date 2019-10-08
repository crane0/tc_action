// import './06enum'
// import './07interface_object'
// import './08interface_fun'
// import './09function'
// import './10class1'
// import './11class2'
// import './12class_interface'
// import './14generics_class'
// import './15typeCheck1'
// import './16typeCheck2'
// import './17typeCheck3'
// import './18AdvancedFeatures1'
// import './part1/19AdvancedFeatures2'
// import './part2/24statementMerger'

let hello : string = 'Hello ts'
document.querySelectorAll('.app')[0].innerHTML = hello

// es2019数组扁平化
// console.log([1, 2, [3, 4]].flat())


// 26 noImplicitThis 检查举例
// class noImplicitThis {
//   a: number = 1
//   get () {
//     return function() {
//       // 如果关闭，这里就不会报错，但有隐藏问题
//       console.log(this.a)
//     }
//   }
// }

// 隐藏问题：得到的这个函数进行调用时，作用域发生了改变，this 是undefined
// let noImplicit = new noImplicitThis().get()
// noImplicit()

// 解决，将get方法返回的函数，改为箭头函数即可。


