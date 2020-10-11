import {h, render} from './vdom/index'
let oldVnode = h(
    'div',{id:'container'},
    h('span', {style:{color:'red'}},'hello'),
    'zf'
);

let container = document.getElementById('app');
render(oldVnode, container);
console.log(oldVnode);