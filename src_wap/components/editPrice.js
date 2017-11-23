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


let showDialog = function() {
    if(!instance) {
        initInstance()
    }
    if(instance.pannelShow === false) {
        initInstance(instance.$el)
    }
    instance.callBack = callBack;
    document.body.appendChild(instance.$el)
}

let EditPrice = function() {
    return new Promise(function(resolve,reject){
        status.resolve = resolve;
        status.reject = reject;

        showDialog()
    })
}

export default EditPrice