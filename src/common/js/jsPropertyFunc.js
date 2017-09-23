
// js原型连添加方法
Number.prototype.getToFixed = function (fractionDigits) { 
    return (Math.round(this*Math.pow(10,fractionDigits))/Math.pow(10,fractionDigits));
} 
