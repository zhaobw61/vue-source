import Observe from './observe.js'
export function initState(vm) {
    // 做不同的初始化
    let opts = vm.$options;
    if(opts.data){
        initData(vm);
    }
    if(opts.computed){
        initComputed(vm);
    }
    if(opts.watch){
        initWatch(vm);
    }
}
export function observe(data){
    if(typeof data != 'object' || data == null) {
        return;
    }
    return new Observe(data);
}

function proxy(vm, source, key) {
    Object.defineProperty(vm,key,{
        get(){
            return vm[source][key];
        },
        set(newValue){
            vm[source][key] = newValue;
        }
    })

}

function initData(vm){ // 将用户插入的数据 通过object.defineProperty重新定义
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
    for(let key in data){
        proxy(vm,'_data',key); // 会将对vm上的取值操作和赋值操作代理给vm._data属性
    }
    observe(vm._data);
}
function initComputed(){

}
function initWatch(){

}