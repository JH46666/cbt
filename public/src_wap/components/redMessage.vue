<template>
    <div class="cbt-editprice active-red" v-show="pannelShow" @click.self="close('cancel')">
        <transition name="down-slow" model="out-in">
            <div class="editprice-wrap " ref="pannel" v-show="mainShow">
                <h4 class="title">激活红包</h4>
                <div class="input-wrap">
                    <div class="input-row">
                        <label><input type="text" v-model="redCode" placeholder="请输入红包激活序号" /></label>
                    </div>
                </div>
                <div class="btnwrap">
                    <mt-button type="default" @click="close('cancel')">取消</mt-button><mt-button type="default"@click="close('confirm')">确定</mt-button>
                </div>
            </div>
        </transition>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                redCode: '',
                pannelShow: true,
                mainShow: false
            }
        },
        methods: {
            close(status) {
                
                if(status === 'cancel') {
                    this.mainShow = false;
                    setTimeout(() => {
                        this.pannelShow = false;
                        return this.callBack({type:status})
                    },200)
                } else {
                    if(this.redCode === '') {
                        return this.$toast('请输入激活码')
                    }

                    this.mainShow = false;
                    setTimeout(() =>{
                        this.pannelShow = false;
                        this.callBack({type:status,redCode:this.redCode})
                    },200)
                }

            },
        },
        mounted() {
            setTimeout(() => {
                this.mainShow = true;
            }, 200);
        }
    }
</script>