// ?: 匹配不捕获
const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
export const util = {
    getValue(vm, expr){
        let keys = expr.split('.');
        return keys.reduce((memo,current) => {
            memo = memo[current];
            return memo;
        },vm)
    },
    compilerText(node, vm) {
        node.textContent = node.textContent.replace(defaultRE, function(...args){
            return util.getValue(vm, args[1]);
        });
    }
}
export function compiler(node, vm){
    let childNodes = node.childNodes;
    [...childNodes].forEach(child => {
        if(child.nodeType == 1) { // 1 代表元素  3表示文本
            compiler(child, vm);
        }else if(child.nodeType == 3) {
            util.compilerText(child, vm);
        }
    })
}