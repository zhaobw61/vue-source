import {h, render, patch} from './vdom/index'
let oldVnode = h(
    'div',{id:'container', style:{color:'red'}},
    h('span', {style:{color:'red'}},'hello'),
    'zf'
);

let container = document.getElementById('app');
render(oldVnode, container);

let newVnode = h('div',{id:'aa', style:{background:'yellow'}},
    h('span', {style:{color:'green'}},'world'),
    'px'
);

setTimeout(()=>{
    patch(oldVnode, newVnode);
},1000);