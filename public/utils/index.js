import math from 'mathjs' ;
 
 
 //判断是否是微信
let isWx = (function () {
    let ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
})();


export {isWx}

export {math} 
