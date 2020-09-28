import {observe} from './index';
import { arrayMethods, observerArray} from './array';
import Dep from './dep';
export function defineReactive(data, key, value) {
    // 如果value 依旧是一个对象的话 需要深度观察
    observe(value);
    let dep = new Dep();
    Object.defineProperty(data, key, {
        get() {
            if(Dep.target) {
                dep.depend();
                // dep.addSub(Dep.target);
            }
            return value;
        },
        set(newValue) {
            if(newValue === value) return;
            observe(newValue);
            value = newValue;
            dep.notify();
        }
    })
}
class Observe {
    constructor(data) { // 双向绑定要观察的对象
        if(Array.isArray(data)) {
            // 拦截数组的方法
            data.__proto__ = arrayMethods;
            // 检测数组的每一项是不是对象或数组
            observerArray(data);
        } else {
            // 将用户数据使用defineProperty重新定义
            this.walk(data);
        }
    }

    walk(data) {
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = data[key];
            defineReactive(data, key, value);
        }
    }
}

export default Observe;