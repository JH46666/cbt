const filter = {
    install(Vue,option) {

        // 保留两位小数
        Vue.filter('toFix2',val => {
            val = String(val).trim();
            if (val === '') {
                return '0.00'
            }
            if (isNaN(val)) {
                return '0.00';
            }else {
                return String(Number(val).toFixed(2));
            }
        })
        // 过滤手机号
        Vue.filter('filterPhone',val =>{
            val += '';
            return val.substring(0,3) + '******' + val.substring(9);
        })

        // 99+
        Vue.filter('ninenineAdd',val =>{
            return Number(val) > 99 ? '99+' : Number(val)
        })
    }
}


export default filter;
