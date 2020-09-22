import Vue from 'vue';
let vm = new Vue({
    el:'#app',
    data(){
        return {
            msg:'hello',
            school:{name:'zf',age:10},
            arr:[1,2,3]
        }
    },
    computed: {
        
    },
    watch: {
        
    }
})
vm.arr.push(10);
console.log(vm);