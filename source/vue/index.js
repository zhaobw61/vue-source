import { initState } from './observe/index'
import Watcher from './observe/watcher';
import { compiler, util } from './util.js'
function Vue(options) {
    this._init(options);
}

Vue.prototype._init = function (options) {
    let vm = this;
    vm.$options = options;
    // MVVM原理 需要数据重新初始化
    initState(vm);
    // 渲染页面
    if(vm.$options.el){
        vm.$mount();
    }
}
function query(el){
    if(typeof el == 'string'){
        return document.querySelector(el);
    }
    return el;
}
Vue.prototype._update = function() {
    // 用用户传入的数据 去更新数据
    let vm = this;
    let el = vm.$el;
    // 要循环这个元素 将里面的内容 换成我们的数据
    let node = document.createDocumentFragment();
    let firstChild;
    while(firstChild = el.firstChild) {
        node.appendChild(firstChild); // appendChild 是具有移动的功能的
    }
    // 对文本进行替换
    compiler(node, vm);
    el.appendChild(node);
}
// 渲染页面 将组件进行挂载
Vue.prototype.$mount = function() {
    let vm = this;
    let el = vm.$options.el;
    el = vm.$el  = query(el);
    let updateComponent = () => {
        vm._update();
    }
    new Watcher(vm, updateComponent);
}

export default Vue;