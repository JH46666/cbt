<template>
    <div id="address">
        <div class="address-wrap">
            <template v-for="(item,index) in value">
                <div class="address-item" @click="setBalance(item)">
                    <div class="hd">
                        <div class="had-head">
                            <div class="name">{{ item.recName }}</div>
                            <div class="tel">{{ item.mobilePhone }}</div>
                        </div>
                        <div class="address-detail">
                            {{ item.provinceName + item.cityName + item.areaName + item.detailAddress }}
                        </div>
                    </div>
                    <div class="bd">
                        <div class="check-default">
                            <span class="mint-checkbox-core" :class="{active: !!item.isDefault}" @click.stop="setDefault(index)"></span>设为默认地址
                        </div>
                        <div class="edit" @click.stop="$router.push({name: '编辑地址',query: {id: item.id}})"><i class="icon-bianji"></i>编辑</div>
                        <div class="del" @click.stop="delAddress(index)"><i class="icon-shanchu1"></i>删除</div>
                    </div>
                </div>
            </template>
        </div>
        <div class="add-address">
            <mt-button type="default" @click="$router.push({name: '新增地址'})">新增地址</mt-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: []
            }
        },
        methods: {
            // 设置默认地址
            setDefault(i) {
                if(this.value[i].isDefault === 1) return;
                this.$api.post('/oteao/deliveryAddress/updateDefauleAddress',{
                    deliveryAddressId: this.value[i].id
                },res => {
                    for (let j = 0; j < this.value.length; j ++) {
                        if(j === i) {
                            this.value[i].isDefault = 1;
                        } else {
                            this.value[j].isDefault = 0;
                        }
                    }
                    this.$toast('设置成功');
                })
            },
            // 删除地址
            delAddress(i) {
                this.$messageBox({
                    title:'提示', 
                    message:`确定要删除地址吗？`,
                    showCancelButton: true,
                    cancelButtonText: '取消',
                    confirmButtonText: '确定'
                }).then(res => {
                    if(res === 'cancel') {
                        return;
                    } else {
                        this.$api.delete('/oteao/deliveryAddress/deleteDeliveryAddress',{
                            deliveryAddressId: this.value[i].id
                        },res => {
                            this.getData();
                        })
                    }
                })
            },
            // 获取数据
            getData() {
                this.$api.get('/oteao/deliveryAddress/searchDeliveryAddress',{
                    pageNumber: 1,
                    pageSize: 100000
                },res => {
                    this.value = res.data;
                })
            },
            // 结算页设置地址
            setBalance(val) {
                let edit = Boolean(sessionStorage.edit);
                if(!edit) return;
                sessionStorage.setItem('address',JSON.stringify(val));
                this.$router.go(-1);
            }
        },
        created() {
            // 设置title
            this.$store.commit('SET_TITLE','地址管理');
            
            this.getData();
        }
    }
</script>


<style lang="less" scoped>
    @import url('~@/styles/center/address.less');
</style>