import { Toast } from 'mint-ui';
let verify = {
    checkPhone(val){
        let reg = /^(1+\d{10})$/;
        if(!reg.test(val)){
            return false;
        }
        return true; 
    },
}

export default verify;