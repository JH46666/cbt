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

// 格式化日期
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


// 判断设备
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端











export {isWx}

export {math} 

export {isLogin}

export {formatDate}

export {isAndroid}

export {isiOS}
