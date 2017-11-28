<template lang="html">
    <div class="regist">
        <div class="regist_head">
            请填写以下资料等待审核，审核后就可以发布商品啦，如需帮助请拨打：400-996-3399
        </div>
        <div class="regist_section">
            <div class="regist_item">
                <label for="1">单位名称</label>
                <textarea id="1" v-model="companyName" row="2"  placeholder="请填写单位名称"></textarea>
            </div>
            <div class="regist_item">
                <label for="2">店铺名称</label>
                <input id="2" v-model="shopName" type="text" maxlength="10" placeholder="请填写店铺名称" />
                <div class="text_tips"><span>{{ shopName.length }}</span>/10</div>
            </div>
            <div class="regist_item">
                <label for="1">入驻类型</label>
                <div class="type_list">
                    <div class="type_item" v-for="(item,index) in typeList" :key="index" :class="{on: index === typeClass}" @click="typeClass = index">{{ item }}</div>
                </div>
            </div>
        </div>
        <div class="f5-2"></div>
        <div class="regist_upload">
            <label for="photo1" class="upload_item">
                <img src="../../assets/images/upload.png" />
                <p>上传营业执照</p>
                <div class="img_look" ref="img1"></div>
            </label>
            <input type="file" id="photo1" hidden ref="photo1" />
            <input type="file" id="photo2" hidden ref="photo2" />
            <label for="photo2" class="upload_item">
                <img src="../../assets/images/upload.png" />
                <p>上传生产许可证</p>
                <div class="img_look" ref="img2"></div>
            </label>
        </div>
        <div class="f5-2"></div>
        <div class="regist_sure">
            <mt-button type="primary">立即注册</mt-button>
            <p>点击 立即注册 即表示您同意茶帮通平台的<span>交易规则</span></p>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            companyName: '',
            shopName: '',
            joinType: 1,
            typeList: ['茶商','合作社','茶企','批发商'],
            typeClass: 0,
        }
    },
    methods: {

    },
    mounted() {
        // console.log(this.$refs.photo1);
        // this.$refs.photo1.onchange=(e)=> {
        //     var files = this.files;
    	// 	var img = new Image();
    	// 	var reader = new FileReader();
        //     console.log(files[0]);
    	// 	reader.readAsDataURL(files[0]);
    	// 	reader.onload = (e) => {
    	// 		var mb = (e.total/1024)/1024;
    	// 		if(mb>= 2){
    	// 			alert('文件大小大于2M');
    	// 			return;
    	// 		}
    	// 		img.src = this.result;
    	// 		img.style.width = "100%";
    	// 		// self.$refs.img1.innerHTML = '';
    	// 		// self.$refs.img1.appendChild(img);
        //         // self.$refs.img1.style.display = block;
    	// 	}
        // }

    }
}
</script>

<style lang="less">
@import '~@/styles/seller/regist.less';
</style>
