let id = 0;// 每次产生一个watcher 都要有一个唯一的标识
import {pushTarget,popTarget} from './dep'
class Watcher {
    /**
     * 
     * @param {*} vm  当前组件的实例
     * @param {*} exprOrFn 用户可能传入的是一个表达式 也可能传入的是一个函数
     * @param {*} cb 用户传入的回调函数
     * @param {*} opts 一些其他的参数
     */
    constructor(vm, exprOrFn, ncb=()=>{}, opts={}){
        this.vm = vm;
        this.exprOrFn = exprOrFn;
        if(typeof exprOrFn === 'function') {
            this.getter = exprOrFn;
        }
        this.cb = cb;
        this.deps = [];
        this.depsId = new Set();
        this.opts = opts;
        this.id = id++;

        this.get();
    }
    get() {
        pushTarget(this);
        this.getter();
        popTarget();
    }
    addDep(dep){
        let id = dep.id;
        if(!this.depsId.has(id)){
            this.depsId.add(id);
            this.deps.push(dep);
            dep.addSub(this);
        }

    }
    update(){
        // this.get();
        queueWatcher(this);
    }
    run(){
        this.get();
    }
}
let has = {};
let queue = [];
function flushQueue() {
    // 等待当前这一轮全部更新后  再去让watcher 依次执行
    queue.forEach(watcher=>watcher.run());
    has = {};
    queue = [];
}
function queueWatcher(Watcher) { // 对重复的watcher进行过滤
    let id = watcher.id;
    if(has[id] == null){
        has[id] = true;
        queue.push(watcher); // 相同的watcher 只会存一个到queue

        // 延迟清空队列
        nextTick(flushQueue);
    }
}
let callbacks = [];
function fulshCallbacks(){
    callbacks.forEach(cb=>cb());
}
function nextTick(cb) {
    callbacks.push(cb);
    let timerFunc = () => {
        fulshCallbacks();
    }
    if(Promise) {
        return Promise.resolve().then(timerFunc);
    }
    if(MutationObserver){
        let observe = new MutationObserver(timerFunc);
        let textNode = document.createTextNode(1);
        observe.observe(textNode,{characterData:true});
        textNode.textContent(2);
        return;
    }
    if(setImmediate){
        return setImmediate(timerFunc);
    }
    setTimeout(timerFunc, 0);
}
export default Watcher;