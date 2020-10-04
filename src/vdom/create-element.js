export function vnode(tag,props,key,children,text){
    return {
        tag,
        props,
        key, // 唯一表示用户 可能传递
        children,
        text
    };
}