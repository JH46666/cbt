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


let formatDate = (date) => {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1 > 10 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1);
    let day = d.getDate() > 10 ? d.getDate() : '0' + d.getDate();
    let hours = d.getHours() >= 10 ? d.getHours() : '0' + d.getHours();
    let min = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes();
    let second = d.getSeconds() >= 10 ? d.getSeconds() : '0' + d.getSeconds();

    return `${year}-${month}-${day} ${hours}:${min}:${second}`
}



export {isWx}

export {math} 

export {isLogin}

export {formatDate}
