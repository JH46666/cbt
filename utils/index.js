import store from '../store'
import math from 'mathjs' ;
 
 
 //判断是否是微信
let isWx = (function () {
    let ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
})();

// 是否登陆
let isLogin = () => {
    return Boolean(store.state.member.member.id)
}





export {isWx}

export {math} 

export {isLogin}
