"use strict";
exports.__esModule = true;
// 单独导出
exports.a = 1;
// 批量导出
var b = 2;
exports.b = b;
var c = 3;
exports.c = c;
// 导出函数
function f() { }
exports.f = f;
// 导出时起别名
function g() { }
exports.G = g;
// 默认导出，无需函数名
function default_1() {
    console.log("I'm default");
}
exports["default"] = default_1;
// 引入外部模块，重新导出
var b_1 = require("./b");
exports.hello = b_1.str;
