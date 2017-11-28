const filter = {
    install(Vue,option) {
        
        // 保留两位小数
        Vue.filter('toFix2',(val) => {
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
    }
}


export default filter;