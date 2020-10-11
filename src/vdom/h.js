import {vnode} from './create-element'
// 初始化 讲虚拟节点 渲染到页面
export default function h(tag, props, ...children){
    // 简单的过滤下非法的属性
    let key = props.key;
    delete props.key; // 属性中不包括key属性
    children = children.map(child => {
        if(typeof child === 'object'){
            return child;
        }else{
            return vnode(undefined, undefined, undefined, undefined, child);
        }
    })
    return vnode(tag,props,key,children);
}

