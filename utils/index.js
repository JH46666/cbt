import store from '../store'
import math from 'mathjs' ;


 //判断是否是微信
let isWx = (function () {
    let ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
})();

// 是否登陆
let isLogin = () => {
    return Boolean(store.state.member.member.id) && store.state.member.memberAccount.status === 'ACTIVE'
}


// 判断设备
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

// 格式化日期
let formatDate = (date) => {
    if(date === null) return '2000-01-01 00:00:00'
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1);
    let day = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate();
    let hours = d.getHours() >= 10 ? d.getHours() : '0' + d.getHours();
    let min = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes();
    let second = d.getSeconds() >= 10 ? d.getSeconds() : '0' + d.getSeconds();
    // if(isiOS) {
    //     return `${new Date("2017-06-01T20:00:00.000Z")}`
    // } else {
        return `${year}-${month}-${day} ${hours}:${min}:${second}`
    // }
}
// 等级
let levelNum = (val) => {
    let g = Number(val);
    let l = 0;
    if(g >= 0 && g <= 10 || g >= 251 && g <= 500 || g >= 10001 && g <= 20000 || g >= 500001 && g <= 1000000 ) {
        l = 1;
    }
    if(g >= 11 && g <= 40 || g >= 501 && g <= 1000 || g >= 20001 && g <= 50000 || g >= 1000001 && g <= 2000000) {
        l = 2;
    }
    if(g >= 41 && g <= 90 || g >= 1001 && g <= 2000 || g >= 50001 && g <= 100000 || g >= 2000001 && g <= 5000000) {
        l = 3;
    }
    if(g >= 91 && g <= 150 || g >= 2001 && g <= 5000 || g >= 100001 && g <= 200000 || g >= 5000001 && g <= 10000000) {
        l = 4;
    }
    if(g >= 151 && g <= 250 || g >= 5001 && g <= 10000 || g >= 200001 && g <= 500000 || g > 10000000) {
        l = 5;
    }
    return l;
}





let shopType = ['茶厂','合作社','茶企','批发商','自营','自营']







export {isWx}

export {math}

export {isLogin}

export {formatDate}

export {isAndroid}

export {isiOS}

export {levelNum}


export {shopType}
