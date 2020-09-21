import { observe } from ".";

// 拦截用户调用的 push shift unshift pop reverse sort splice
let oldArrayProtoMethods = Array.prototype;

export let arrayMethods = Object.create(oldArrayProtoMethods); // 这一步很有必要，我们只是重新定义了一部分方法，不是所有的方法，所以需要通过原型链查找到方法

let methods = [
    'push',
    'shift',
    'pop',
    'unshift',
    'reverse',
    'sort',
    'splice'
];

export function observerArray(inserted) { // 要循环数组一次 对数组中每一项进行观察
    for(let i = 0; i<inserted.length;i++){
        observe(inserted[i]);
    }

}

methods.forEach(method => {
    arrayMethods[method] = function (...args) {
        let r = oldArrayProtoMethods[method].apply(this, args);
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args

        }
        if(inserted) observerArray(inserted);
        return r;
    }
})