"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTime() {
    var time = new Date();
    return time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
}
exports.getTime = getTime;
