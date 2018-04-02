var filter = {
    install: function(Vue,option) {

        // 保留两位小数
        Vue.filter('toFix2',function(val) {
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
        Vue.filter('filterPhone',function(val) {
            val += '';
            return val.substring(0,3) + '******' + val.substring(9);
        })

        // 99+
        Vue.filter('ninenineAdd',function(val) {
            return Number(val) > 99 ? '99+' : Number(val)
        })
        // 截取年月日
        Vue.filter('sliceDate',function(val) {
            return ('' + val).split(' ')[0]
        })
    }
}


export default filter;
