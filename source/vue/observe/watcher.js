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
    constructor(vm, exprOrFn, cb=()=>{}, opts={}){
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
        this.get();
    }
}
export default Watcher;