"use strict";
// import $ from 'jquery'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// $('.app').css('color', 'red')
globalLib({ x: 1 });
globalLib.doSomething();
var module_lib_1 = __importDefault(require("./module-lib"));
module_lib_1.default({ y: 2 });
module_lib_1.default.doSomething();
var umd_lib_1 = __importDefault(require("./umd-lib"));
umd_lib_1.default.doSomething();
globalLib.doAnyting = function () { };
