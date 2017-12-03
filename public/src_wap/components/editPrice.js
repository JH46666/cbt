import Vue from 'vue';
import editPrice from './editPrice.vue';


let editPannel = Vue.extend(editPrice);

let instance,status = {};

let callBack = (obj) => {
    obj.type === 'cancel' ? status.reject(obj) : status.resolve(obj)
}

let initInstance = function(el) {
    instance = new editPannel({
        el: el || document.createElement('div')
    })
}


let showDialog = function(obj = {}) {
    if(!instance) {
        initInstance()
    }
    if(instance.pannelShow === false) {
        initInstance(instance.$el)
    }
    instance.expressPrice = obj.expressPrice || '';
    instance.goodsPrice = obj.goodsPrice || '';
    instance.callBack = callBack;
    document.body.appendChild(instance.$el)
}

let EditPrice = function(obj = {}) {
    return new Promise(function(resolve,reject){
        status.resolve = resolve;
        status.reject = reject;

        showDialog(obj)
    })
}

export default EditPrice