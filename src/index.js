import {h} from './vdom/index'
let oldVnode = h(
    'div',{id:'container'},
    h('span', {style:{color:'red'}},'hello'),
    'zf'
);

console.log(oldVnode);