<template>
    <div class="newshelves3_wrapper">
        <!-- 商品轮播图 -->
        <div class="_add-title">
            <div class="_add-title-text">
                <div class="_add-title-small-box"></div>
                商品轮播图
            </div>
            <!-- <div class="_add-title-tips">
                <i class="iconfont icon-chuangjianshangpinshuoming"></i>
                <div>传图规范</div>
            </div> -->
        </div>
        <div class="floor main-imgs _add-main-imgs">
            <p style="font-size: 0.26rem; color: #666;">1-5张，建议800*800像素等宽高，单张图片小于8M的清晰商品照片</p>
            <div class="main-img-box _fix-main-img-box">
                <div class="_fix-img-box" v-for="(item,index) in resize.imgs.mainImg" @click="getPrevImgSrc(index,'main')">
                    <img :src="item" />
                    <a class="delete-btn _fix-delete-btn" href="javascript: void(0);" @click.stop="deleteImg(index,'main')">
                        <i class="iconfont icon-tupianshangshanchuanniu"></i>
                    </a>
                </div>
                <!-- 上传图标 -->
                <div class="_fix-img-box _add-upload-box" v-if="resize.imgs.mainImg.length<5">
                    <label class="camera-bg _fix-camera-bg">
                        <input type="file" accept="image/*" hidden @change="onPreview('main',$event)">
                    </label>
                    <div class="_add-up-num">
                        <span style="color: #333" v-if="resize.imgs.mainImg.length==0">{{ resize.imgs.mainImg.length }}</span>
                        <span style="color: #f08200" v-else>{{ resize.imgs.mainImg.length }}</span>
                        / 5
                    </div>
                </div>
            </div>
        </div>
        <!-- 商品详情展示 -->
        <div class="_add-title">
            <div class="_add-title-text">
                <div class="_add-title-small-box"></div>
                商品详情展示
            </div>
            <div class="_add-title-tips">
                <i class="iconfont icon-chuangjianshangpinshuoming"></i>
                <div>传图规范</div>
            </div>
        </div>
        <div class="floor detail-imgs _fix-detail-imgs">
            <p style="font-size: 0.26rem; color: #666;">1-10张，尺寸宽度介于640像素至750像素之间，单张图片小于8M，图片尽量保持尺寸一致</p>
            <div class="main-img-box _fix-main-img-box">
                <div class="_fix-img-box" v-for="(item,index) in resize.imgs.detailImg1" @click="getPrevImgSrc(index,'detailImg1')">
                    <img :src="item" />
                    <a class="delete-btn _fix-delete-btn" href="javascript: void(0);" @click.stop="deleteImg(index,'one')">
                        <i class="iconfont icon-tupianshangshanchuanniu"></i>
                    </a>
                </div>
                <!-- 上传图标 -->
                <div class="_fix-img-box _add-upload-box" v-if="resize.imgs.detailImg1.length<10">
                    <label class="camera-bg _fix-camera-bg">
                        <input type="file" accept="image/*" hidden @change="onPreview('one',$event)">
                    </label>
                    <div class="_add-up-num">
                        <span style="color: #333" v-if="resize.imgs.detailImg1.length==0">{{ resize.imgs.detailImg1.length }}</span>
                        <span style="color: #f08200" v-else>{{ resize.imgs.detailImg1.length }}</span>
                        / 10
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部按钮 -->
        <div class="flex btns">
            <mt-button type="primary" @click="$router.go(-1)">上一步</mt-button>
            <mt-button type="primary" :disabled="disabledBol || loading1" @click="saveMethod('0')">
                <img src="../../assets/images/loading3.gif" height="20" width="20" slot="icon" :class="{on: loading1 && !flag}"> 保存
            </mt-button>
        </div>
        <div class="save-rackup" v-if="$route.query.state == 'OFF_SHELF'">
            <mt-button type="primary" :disabled="disabledBol || loading2" @click="saveMethod('1')">
                <img src="../../assets/images/loading3.gif" height="20" width="20" slot="icon" :class="{on: loading2 && flag}"> 保存并上架
            </mt-button>
        </div>
        <!-- 底部空白 -->
        <div class="bottom-blank" style="background-color: #fff"></div>
        <!-- 预览大图 -->
        <div class="popup suc_popup _add-preview" v-if="previewFlag">
            <div class="preview-inner">
                <div class="preview-img">
                    <img :src="previewImgSrc" alt="">
                </div>
                <div class="preview-close-btn" @click="closePreviewBtn">
                    <i class="iconfont icon-danchuangguanbianniu"></i>
                </div>
            </div>
        </div>
        <!-- 成功上架弹窗 -->
        <div class="popup suc_popup" v-show="sucFlag">
            <div class="popup_inner suc_inner">
                <div class="algin_c">
                    <p class="suc-tip">{{ sussTips }}</p>
                </div>
                <div class="flex pop-btns">
                    <a class="flex-1 see" href="javascript:void(0);" @click="goShopMange">查看商品</a>
                    <a class="flex-1 go-on" href="javascript:void(0);" @click="goCreated">继续创建</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { Toast, MessageBox } from 'mint-ui';
    import { mapState } from 'vuex'
    import store from 'store';
    import $api from 'api';
    export default {
        data() {
            return {
                sucFlag: false,             // 是否成功上架
                previewFlag: false,         // 预览大图
                previewImgSrc: '',          // 预览图片地址
                changeIndex: {
                    main: 1,
                    one: 1,
                    two: 1,
                    three: 1,
                    four: 1
                },
                region: 'oss-cn-hangzhou',
                bucket: 'imgcbt',
                urls: {
                    main: [],
                    one: [],
                    two: [],
                    third: [],
                    four: []
                },
                flag: null,
                sussTips: '成功上架！',
                loading1: false,
                loading2: false,
                saveOrCreated:''
            }
        },
        computed: {
            imgsStep4Len() {
                if (this.resize.imgs.imgsStep4.length > 0) {
                    return true;
                } else {
                    return false;
                }
            },
            ...mapGetters([
                'resize'
            ]),
            disabledBol() {
                if (this.resize.imgs.mainImg.length > 0 && this.resize.imgs.detailImg1.length != 0) {
                    return false;
                } else {
                    return true;
                }
            },
        },
        created() {
            // 设置title
            this.$store.commit('SET_TITLE', '商品修改');
        },
        mounted(){
            // 获取手机屏幕高度
            var clientH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var bottomBlank = $('.bottom-blank').eq(0);
            // console.log('H:', clientH);
            // console.log(bottomBlank.offset().top);
            bottomBlank.css({
                height: clientH - bottomBlank.offset().top
            });
        },
        methods: {
            random_string(len) {
                len = len || 32;
                var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                var maxPos = chars.length;
                var pwd = '';
                for (let i = 0; i < len; i++) {
                    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return pwd;
            },
            getToken() {
                let data = {};
                return new Promise((resolve, reject) => {
                    this.$api.post('/oteao/file/getSignature', data, res => {
                        resolve(res);
                    }, res => {
                        return Toast({
                            message: res.errorMsg,
                            iconClass: 'icon icon-fail'
                        });
                    })
                })
            },
            saveMethod(flag) {
                this.disabledBol = true;
                this.loading1 = true;
                this.loading2 = true;
                if (flag === '0') {
                    this.flag = 0;
                    this.saveOrCreated = 'save';
                } else {
                    this.flag = 1;
                    this.saveOrCreated = 'created';
                    let status = store.state.member.shop.shopStatus;
                    if (status == -2) {
                        return this.$messageBox({
                            title: '提示',
                            message: `您因违规操作而被冻结无法发布商品，若有疑问，请联系客服400-996-3399`,
                            confirmButtonText: '我知道了'
                        }).then(res => {
                            this.disabledBol = false;
                            this.loading1 = false;
                            this.loading2 = false;
                        });
                    }
                }
                this.doUpload(flag).then(() => {
                    this.onlySave(this.flag);
                })
            },
            // 上传图片
            doUpload(flag) {
                let flags = {
                    main: 0,
                    one: 0,
                    two: 0,
                    third: 0,
                    four: 0
                }
                let isFlag = (resolve, reject) => {
                    if (flags.main != this.resize.mainImgFile.length) return;
                    if (flags.one != this.resize.oneImgFile.length) return;
                    // if( flags.two != this.resize.secondImgFile.length) return;
                    // if( flags.third != this.resize.thirdImgFile.length) return;
                    // if( flags.four != this.resize.fourImgFile.length) return;
                    resolve()
                }
                return new Promise((resolve, reject) => {
                    this.getToken().then((res) => {
                        let client = new OSS.Wrapper({
                            region: this.region,
                            accessKeyId: res.data.accessKeyId,
                            accessKeySecret: res.data.accessKeySecret,
                            stsToken: res.data.securityToken,
                            bucket: this.bucket,
                            secure: true
                        })
                        for (let i = 0; i < this.resize.mainImgFile.length; i++) {            // 主图
                            // 如果有就是新增图
                            if (this.resize.mainImgFile[i]) {
                                let random_name = res.data.basePath + 'goods/' + this.random_string(6) + '_' + new Date().getTime() + '.' + this.resize.mainImgFile[i].name.split('.').pop()
                                client.multipartUpload(random_name, this.resize.mainImgFile[i]).then((results) => {
                                    const url = '//img3.oteao.com/' + results.name;
                                    this.urls.main.push(url);
                                    flags.main++;
                                    isFlag(resolve, reject);
                                }).catch((err) => {
                                    flags.main++;
                                    isFlag(resolve, reject);
                                })
                            } else {
                                this.urls.main.push(this.resize.imgs.mainImg[i]);
                                flags.main++;
                                isFlag(resolve, reject);
                            }
                        }
                        for (let i = 0; i < this.resize.oneImgFile.length; i++) {            // 1图
                            // 如果有就是新增图
                            if (this.resize.oneImgFile[i]) {
                                let random_name = res.data.basePath + 'goods/' + this.random_string(6) + '_' + new Date().getTime() + '.' + this.resize.oneImgFile[i].name.split('.').pop()
                                client.multipartUpload(random_name, this.resize.oneImgFile[i]).then((results) => {
                                    const url = '//img1.oteao.com/' + results.name;
                                    this.urls.one.push(url);
                                    flags.one++;
                                    isFlag(resolve, reject);
                                }).catch((err) => {
                                    flags.one++;
                                    isFlag(resolve, reject);
                                })
                            } else {
                                this.urls.one.push(this.resize.imgs.detailImg1[i]);
                                flags.one++;
                                isFlag(resolve, reject);
                            }
                        }
                        // for(let i=0; i<this.resize.secondImgFile.length; i++){            // 2图
                        //     let random_name = res.data.basePath +'goods/' + this.random_string(6) + '_' + new Date().getTime() + '.' + this.resize.secondImgFile[i].name.split('.').pop()
                        //     client.multipartUpload(random_name, this.resize.secondImgFile[i]).then((results) => {
                        //         const url = '//img2.oteao.com/'+ results.name;
                        //         this.urls.two.push(url);
                        //         flags.two++;
                        //         isFlag(resolve,reject);
                        //     }).catch((err) => {
                        //         flags.two++;
                        //         isFlag(resolve,reject);
                        //     })
                        // }
                        // for(let i=0; i<this.resize.thirdImgFile.length; i++){            // 3图
                        //     let random_name = res.data.basePath +'goods/' + this.random_string(6) + '_' + new Date().getTime() + '.' + this.resize.thirdImgFile[i].name.split('.').pop()
                        //     client.multipartUpload(random_name, this.resize.thirdImgFile[i]).then((results) => {
                        //         const url = '//img3.oteao.com/'+ results.name;
                        //         this.urls.third.push(url);
                        //         flags.third++;
                        //         isFlag(resolve,reject);
                        //     }).catch((err) => {
                        //         flags.third++;
                        //         isFlag(resolve,reject);
                        //     })
                        // }
                        // for(let i=0; i<this.resize.fourImgFile.length; i++){            // 4图
                        //     let random_name = res.data.basePath +'goods/' + this.random_string(6) + '_' + new Date().getTime() + '.' + this.resize.fourImgFile[i].name.split('.').pop()
                        //     client.multipartUpload(random_name, this.resize.fourImgFile[i]).then((results) => {
                        //         const url = '//img4.oteao.com/'+ results.name;
                        //         this.urls.four.push(url);
                        //         flags.four++;
                        //         isFlag(resolve,reject);
                        //     }).catch((err) => {
                        //         flags.four++;
                        //         isFlag(resolve,reject);
                        //     })
                        // }
                    })
                })
            },
            onlySave(stata) {
                let mainImg = [];
                let detailImg = [];
                // 商品轮播图url
                for (let i = 0; i < this.urls.main.length; i++) {
                    mainImg.push({
                        imgUrl: this.urls.main[i]
                    })
                }
                // 商品详情图url
                for (let i = 0; i < this.urls.one.length; i++) {
                    detailImg.push(
                        this.urls.one[i]
                    )
                }

                // let oneImg = {
                //     title: '外形细节展示',
                //     content: this.resize.textMs1,
                //     imgArray: []
                // };
                // let oneImgSrc = ``;
                // for (let obj of this.urls.one) {
                //     oneImg.imgArray.push({
                //         imgUrl: obj
                //     })
                //     oneImgSrc = oneImgSrc + `<img src="${obj}">`;
                // }
                // let oneImgStr = `<a class="mint-cell">` +
                //     `<div class="mint-cell-left"></div>` +
                //     `<div class="mint-cell-wrapper">` +
                //     `<div class="mint-cell-title">` +
                //     `<span class="mint-cell-text"></span>` +
                //     `</div>` +
                //     `<div class="mint-cell-value">` +
                //     `<div class="mint_cell_img_title">${oneImg.title}</div>` +
                //     `<div class="mint_cell_img">${oneImgSrc}</div>` +
                //     `<p class="mint_cell_img_content">${oneImg.content}</p>` +
                //     `</div>` +
                //     `</div>` +
                //     `<div class="mint-cell-right"></div>` +
                //     `</a>`;
                // let twoImg = {
                //     title: '汤色细节展示',
                //     content: this.resize.textMs2,
                //     imgArray: []
                // }
                // let twoImgSrc = ``;
                // for (let obj of this.urls.two) {
                //     twoImg.imgArray.push({
                //         imgUrl: obj
                //     })
                //     twoImgSrc = twoImgSrc + `<img src="${obj}">`;
                // }
                // let twoImgStr = `<a class="mint-cell">` +
                //     `<div class="mint-cell-left"></div>` +
                //     `<div class="mint-cell-wrapper">` +
                //     `<div class="mint-cell-title">` +
                //     `<span class="mint-cell-text"></span>` +
                //     `</div>` +
                //     `<div class="mint-cell-value">` +
                //     `<div class="mint_cell_img_title">${twoImg.title}</div>` +
                //     `<div class="mint_cell_img">${twoImgSrc}</div>` +
                //     `<p class="mint_cell_img_content">${twoImg.content}</p>` +
                //     `</div>` +
                //     `</div>` +
                //     `<div class="mint-cell-right"></div>` +
                //     `</a>`;
                // let threeImg = {
                //     title: '叶底细节展示',
                //     content: this.resize.textMs3,
                //     imgArray: []
                // }
                // let threeImgSrc = ``;
                // for (let obj of this.urls.third) {
                //     threeImg.imgArray.push({
                //         imgUrl: obj
                //     })
                //     threeImgSrc = threeImgSrc + `<img src="${obj}">`;
                // }
                // let threeImgStr = `<a class="mint-cell">` +
                //     `<div class="mint-cell-left"></div>` +
                //     `<div class="mint-cell-wrapper">` +
                //     `<div class="mint-cell-title">` +
                //     `<span class="mint-cell-text"></span>` +
                //     `</div>` +
                //     `<div class="mint-cell-value">` +
                //     `<div class="mint_cell_img_title">${threeImg.title}</div>` +
                //     `<div class="mint_cell_img">${threeImgSrc}</div>` +
                //     `<p class="mint_cell_img_content">${threeImg.content}</p>` +
                //     `</div>` +
                //     `</div>` +
                //     `<div class="mint-cell-right"></div>` +
                //     `</a>`;
                // let fourImg = {
                //     title: '其它细节展示',
                //     content: this.resize.textMs4,
                //     imgArray: [],
                // };
                // let fourImgSrc = ``;
                // if (this.urls.four.length != 0) {
                //     for (let i = 0; i < this.urls.four.length; i++) {
                //         fourImg.imgArray.push({
                //             imgUrl: this.urls.four[i]
                //         })
                //         fourImgSrc = fourImgSrc + `<img src="${this.urls.four[i]}">`;
                //     }
                // }
                // let fourImgStr = `<a class="mint-cell">` +
                //     `<div class="mint-cell-left"></div>` +
                //     `<div class="mint-cell-wrapper">` +
                //     `<div class="mint-cell-title">` +
                //     `<span class="mint-cell-text"></span>` +
                //     `</div>` +
                //     `<div class="mint-cell-value">` +
                //     `<div class="mint_cell_img_title">${fourImg.title}</div>` +
                //     `<div class="mint_cell_img">${fourImgSrc}</div>` +
                //     `<p class="mint_cell_img_content">${fourImg.content}</p>` +
                //     `</div>` +
                //     `</div>` +
                //     `<div class="mint-cell-right"></div>` +
                //     `</a>`;
                // let allContent = {
                //     oneImgContent: oneImg,
                //     twoImgContent: twoImg,
                //     threeImgContent: threeImg,
                //     fourImgContent: fourImg
                // }
                // let allOrgContent = oneImgStr + twoImgStr + threeImgStr + fourImgStr;
                let data = {
                    "catProps": [],
                    "detailImgs": detailImg,
                    "productImgs": mainImg
                }
                // 组合标题
                let titles = '';
                // this.resize.proValList通过queryPropVal接口查询
                for (let i = 0; i < this.resize.proValList.length; i++) {
                    if (this.resize.proValList[i].propValList.length === 0) {
                        data.catProps.push({
                            propType: 2,
                            propId: this.resize.proValList[i].id,
                            propertyVal: this.resize.proValList[i].proVal
                        })
                        // 采摘时间、香型、工艺
                        if (['采摘时间', '香型', '工艺'].indexof(this.resize.proValList[i].propName) != -1) {
                            titles = titles + this.resize.proValList[i].proVal;
                        }
                    } else {
                        data.catProps.push({
                            propType: 1,
                            propId: this.resize.proValList[i].id,
                            propertyVal: this.resize.proValList[i].proVal,
                            propValId: this.resize.proValList[i].proValId
                        })
                        // 采摘时间、香型、工艺
                         if (['采摘时间', '香型', '工艺'].indexof(this.resize.proValList[i].propName) != -1) {
                            titles = titles + this.resize.proValList[i].proVal;
                        }
                    }
                }
                // 组合标题 = 商品卖点 + 商品品类 + 属性
                titles = this.resize.form.goodsSell + this.resize.form.goodTypes.replace(/-/g, '') + titles;
                if (this.resize.selId.pp) {
                    this.$api.post(`/oteao/productInfo/updateProductInfo` +
                        `?frontOrgProInfoDetailVo.proId=${encodeURI(this.resize.mainId)}` +
                        `&frontOrgProInfoDetailVo.proName=${encodeURI(titles)}` +                                             // 组合标题
                        `&frontOrgProInfoDetailVo.catId=${encodeURI(this.resize.twoClass)}` +
                        `&frontOrgProInfoDetailVo.brandId=${encodeURI(this.resize.selId.pp)}` +
                        `&frontOrgProInfoDetailVo.reason=${encodeURI(this.resize.form.goodsSell)}` +
                        // `&frontOrgProInfoDetailVo.unint=${ encodeURI(this.resize.form.goodsDw) }` +
                        `&frontOrgProInfoDetailVo.weight=${encodeURI(this.resize.form.goodsMz)}` +
                        // `&frontOrgProInfoDetailVo.netWeight=${ encodeURI(this.resize.form.goodsJz) }` +
                        // `&frontOrgProInfoDetailVo.reason=${ encodeURI(this.resize.form.goodsSell) }` +
                        `&frontOrgProInfoDetailVo.stockNum=${encodeURI(this.resize.form.goodsKc)}` +
                        `&frontOrgProInfoDetailVo.proPrice=${encodeURI(this.resize.form.goodsSj)}` +
                        `&frontOrgProInfoDetailVo.retailPrice=${encodeURI(this.resize.form.goodsPtsj)}` +
                        `&frontOrgProInfoDetailVo.memberNum=${encodeURI(this.resize.form.goodsGroupNum)}` +
                        `&frontOrgProInfoDetailVo.groupPrice=${encodeURI(this.resize.form.goodsGroup)}` +
                        `&frontOrgProInfoDetailVo.isSaveOnShelf=${encodeURI(stata)}`, JSON.stringify(data), res => {
                            this.sucFlag = true;
                            this.loading1 = false;
                            this.loading2 = false;
                            if (stata == 0) {
                                this.sussTips = '修改成功！';
                            } else {
                                this.sussTips = '成功上架！';
                            }
                        }, res => {
                            return Toast({
                                message: res.errorMsg,
                                iconClass: 'icon icon-fail'
                            });
                        })
                } else {
                    this.$api.post(`/oteao/productInfo/updateProductInfo` +
                        `?frontOrgProInfoDetailVo.proId=${encodeURI(this.resize.mainId)}` +
                        `&frontOrgProInfoDetailVo.proName=${encodeURI(titles)}` +                                             // 组合标题
                        `&frontOrgProInfoDetailVo.catId=${encodeURI(this.resize.twoClass)}` +
                        `&frontOrgProInfoDetailVo.reason=${encodeURI(this.resize.form.goodsSell)}` +
                        // `&frontOrgProInfoDetailVo.unint=${ encodeURI(this.resize.form.goodsDw) }` +
                        `&frontOrgProInfoDetailVo.weight=${encodeURI(this.resize.form.goodsMz)}` +
                        // `&frontOrgProInfoDetailVo.netWeight=${ encodeURI(this.resize.form.goodsJz) }` +
                        // `&frontOrgProInfoDetailVo.reason=${ encodeURI(this.resize.form.goodsSell) }` +
                        `&frontOrgProInfoDetailVo.stockNum=${encodeURI(this.resize.form.goodsKc)}` +
                        `&frontOrgProInfoDetailVo.proPrice=${encodeURI(this.resize.form.goodsSj)}` +
                        `&frontOrgProInfoDetailVo.retailPrice=${encodeURI(this.resize.form.goodsPtsj)}` +
                        `&frontOrgProInfoDetailVo.memberNum=${encodeURI(this.resize.form.goodsGroupNum)}` +
                        `&frontOrgProInfoDetailVo.groupPrice=${encodeURI(this.resize.form.goodsGroup)}` +
                        `&frontOrgProInfoDetailVo.isSaveOnShelf=${encodeURI(stata)}`, JSON.stringify(data), res => {
                            this.sucFlag = true;
                            this.loading1 = false;
                            this.loading2 = false;
                            if (stata == 0) {
                                this.sussTips = '修改成功！';
                            } else {
                                this.sussTips = '成功上架！';
                            }
                        }, res => {
                            return this.$messageBox({
                                title: '提示',
                                message: res.errorMsg,
                                confirmButtonText: '我知道了'
                            })
                        }
                    );
                }
            },
            handleChangeMain(index) {
                this.changeIndex.main = index + 1;
            },
            handleChangeOne(index) {
                this.changeIndex.one = index + 1;
            },
            handleChangeTwo(index) {
                this.changeIndex.two = index + 1;
            },
            handleChangeThree(index) {
                this.changeIndex.three = index + 1;
            },
            handleChangeFour(index) {
                this.changeIndex.four = index + 1;
            },
            //继续创建
            goCreated() {
                this.$store.commit('SET_RESIZE');
                this.$router.push({
                    name: '新品上架-1'
                });
            },
            //预览图片
            onPreview(type, e) {
                if (e.target.files[0].size > 8 * 1024 * 1024) return Toast({
                    message: '图片不能超出8M哦~',
                    iconClass: 'icon icon-info'
                });
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                if (type === 'main') {
                    reader.onload = (e) => {
                        this.resize.imgs.mainImg.push(e.target.result);
                    }
                    this.resize.mainImgFile.push(e.target.files[0]);
                } else if (type === 'one') {
                    reader.onload = (e) => {
                        this.resize.imgs.detailImg1.push(e.target.result);
                    }
                    this.resize.oneImgFile.push(e.target.files[0]);
                } else if (type === 'two') {
                    reader.onload = (e) => {
                        this.resize.imgs.detailImg2.push(e.target.result);
                    }
                    this.resize.secondImgFile.push(e.target.files[0]);
                } else if (type === 'three') {
                    reader.onload = (e) => {
                        this.resize.imgs.detailImg3.push(e.target.result);
                    }
                    this.resize.thirdImgFile.push(e.target.files[0]);
                } else if (type === 'four') {
                    reader.onload = (e) => {
                        this.resize.imgs.imgsStep4.push(e.target.result);
                    }
                    this.resize.fourImgFile.push(e.target.files[0]);
                }
            },
            goShopMange() {
                let status = '';
                // if (this.sussTips === '修改成功！') {
                //     status = 'OFF_SHELF';
                // } else {
                //     status = 'ON_SHELF';
                // }
                if(this.saveOrCreated == 'save'){
                    status = 'OFF_SHELF';
                }
                else{
                     status = 'ON_SHELF';
                }
                this.$router.push({
                    name: '商品管理',
                    query: {
                        state: status
                    }
                })
            },
            deleteImg(index, type) {                              //删除图片
                if (type === 'main') {
                    this.resize.imgs.mainImg.splice(index, 1);
                    this.resize.mainImgFile.splice(index, 1);
                } else if (type === 'one') {
                    this.resize.imgs.detailImg1.splice(index, 1);
                    this.resize.oneImgFile.splice(index, 1);
                } else if (type === 'two') {
                    this.resize.imgs.detailImg2.splice(index, 1);
                    this.resize.secondImgFile.splice(index, 1);
                } else if (type === 'three') {
                    this.resize.imgs.detailImg3.splice(index, 1);
                    this.resize.thirdImgFile.splice(index, 1);
                } else if (type === 'four') {
                    this.resize.imgs.imgsStep4.splice(index, 1);
                    this.resize.fourImgFile.splice(index, 1);
                }
            },
            // 获取预览大图图片地址
            getPrevImgSrc(index, type) {
                this.previewFlag = true;
                if (type == 'main') {
                    this.previewImgSrc = this.resize.imgs.mainImg[index]
                }
                if (type == 'detailImg1') {
                    this.previewImgSrc = this.resize.imgs.detailImg1[index]
                }
            },
            closePreviewBtn() {
                console.log(this.previewFlag);
                this.previewFlag = !this.previewFlag;
                console.log(this.previewFlag);
            }
        },
        beforeRouteEnter(to, from, next) {
            if (store.state.member.member.id) {
                next();
            } else {
                store.dispatch('getMemberData').then(res => {
                    next();
                }).catch(res => {
                    next(vm => {
                        vm.$router.push('/login')
                    })
                })
            }
        },
        head: {
            title() {
                return {
                    inner: '新品上架'
                }
            }
        }
    }
</script>
<style lang="less">
    @import '~@/styles/seller/newshelves2.less';
    /* _add为新增，_fix为修改 */

    .newshelves3_wrapper {
        /* 商品轮播图 */
        ._add-main-imgs {
            padding-top: 0.3rem!important;
            font-size: 0.26rem;
            padding-bottom: 0.4rem;
        }
        ._add-title {
            height: 0.8rem;
            line-height: 0.8rem;
            background-color: #f5f5f5;
            padding: 0rem 0.3rem;
            display: flex;
            font-size: 0.26rem;
            justify-content: space-between;
            position: relative;
            ._add-title-text {
                color: #333333;
                display: flex;
                align-items: center;
                line-height: 1;
                ._add-title-small-box {
                    position: absolute;
                    left: 0rem;
                    width: 0.08rem;
                    height: 0.24rem;
                    background-color: #f08200;
                }
            }
            ._add-title-tips {
                display: flex;
                color: #f08200;
                & .iconfont {
                    margin-right: 0.1rem;
                }
            }
        }
        ._fix-main-img-box {
            display: flex!important;
            flex-wrap: wrap;
            border: none!important;
            height: unset!important;
            margin-top: 0rem!important;
            ._fix-img-box {
                width: 1.55rem;
                height: 1.55rem;
                position: relative;
                display: flex;
                align-items: center;
                border: 0.02rem solid #f2f2f2;
                margin-top: 0.3rem;
                margin-right: 0.16rem;
                ._fix-delete-btn {
                    top: -0.17rem;
                    right: -0.17rem;
                }
                & img{
                   max-height: 1.55rem;
                }
            }
            ._add-upload-box {
                display: flex;
                flex-direction: column;
                position: relative;
                background-color: #f5f5f5;
                ._fix-camera-bg {
                    position: unset;
                    width: 0.88rem;
                    height: 0.88rem;
                    top: 0rem;
                    left: 0rem;
                    margin: 0.2rem auto 0;
                }
                ._add-up-num {
                    margin-top: 0.10rem;
                }
            }
        }
        /* 商品详情图 */
        ._fix-detail-imgs {
            margin-top: 0rem!important;
        }

        /* 预览大图 */
        ._add-preview {
            .preview-inner {
                width: 5rem;
                height: 5rem;
                position: absolute;
                left: 50%;
                top: 50%;
                margin-left: -2.5rem;
                margin-top: -2.5rem;
                .preview-close-btn {
                    background-color: #fff;
                    position: absolute;
                    top: -1.0rem;
                    right: 0rem;
                    border-radius: 50%;
                    width: 0.78rem;
                    height: 0.78rem;
                    & .iconfont {
                        width: 0.78rem;
                        height: 0.78rem;
                        font-size: 0.8rem;
                        color: rgba(0, 0, 0, 0.6);
                        position: absolute;
                        left: 0rem;
                        top: 0rem;
                        bottom: 0rem;
                        right: 0rem;
                    }
                }
            }
        }
    }
</style>