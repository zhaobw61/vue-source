// 这个文件除了第一次的初始化渲染之外

export default function render(vnode, container) { // 让虚拟节点 渲染成真实节点
    let el = createElm(vnode);
    container.appendChild(el);
}
// 创建真实的节点
function createElm(vnode){
    let {tag,children,key,props,text} = vnode;
    if(typeof tag === 'string'){
        // 标签 一个虚拟节点 对应着他的真实节点
        vnode.el = document.createElement(tag);
        updateProperties(vnode);
        children.forEach(child => {
            return render(child, vnode.el); // 递归渲染当前孩子列表
        });
    }else{
        // 文本
        vnode.el = document.createTextNode(text);
    }
    return vnode.el;
}

function updateProperties(vnode, oldProps={}) {
    let newProps = vnode.props;
    let el = vnode.el;

    let newStyle = newProps.style || {};
    let oldStyle = oldProps.style || {};
    // 如果新的属性的样式没有了之前的样式 就删除 但是有个漏洞的地方是 如果修改了值 就不行了
    // 放在了第三步上重新赋值 哈哈哈哈
    for(let key in oldStyle){
        if(!newStyle[key]){
            el.style[key] = '';
        }
    }

    // 如果下次更新时 我应该用新的属性 来更新老的节点
    // 如果老的中有属性 新的中没有 就应该把节点上的属性删除

    for(let key in newProps) {
        if(!newProps[key]) {
            delete el[key];
        }
    }

    for(let key in newProps) {
        if(key == 'style') {
            for(let styleName in newProps.style) {
                el.style[styleName] = newProps.style[styleName];
            }
        }else if(key === 'class') {
            el.className = newProps.class;
        } else {
            el[key] = newProps[key];
        }
    }

}