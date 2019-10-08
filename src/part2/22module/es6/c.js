"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var a_1 = require("./a"); // 批量导入
var All = __importStar(require("./a")); // 导入模块中的所有成员，绑定在 All 上
var a_2 = __importDefault(require("./a")); // 不加{}，导入默认
console.log(a_1.a, a_1.b, a_1.c);
var p = {
    x: 1,
    y: 1
};
console.log(All);
a_2.default();
