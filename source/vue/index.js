import { initState } from './observe/index'
function Vue(options) {
    this._init(options);
}

Vue.prototype._init = function (options) {
    let vm = this;
    vm.$options = options;
    // MVVM原理 需要数据重新初始化
    initState(vm);
}

export default Vue;