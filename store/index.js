import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import $api from '../api'
// 模块
import app from './modules/app';
import seo from './modules/seo'
import order from './modules/order'
import seller from './modules/seller'
import address from './modules/address'
import cart from './modules/cart'
import member from './modules/member'
import create from './modules/create'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        device: '',
        IM_user:'buyer',
        url:''
    },
    mutations: {
        SET_DEVICE(state,val) {
            state.device = val
        },
        SET_IMUSER(state,val){
          state.IM_user = val
        },
        SET_URL(state,val){
          state.url = val
        }
    },
    actions: {
        getBlock({commit,dispatch},code) {
            return new Promise((resolve,reject) => {
                $api.post('/htmlModuleManage/seachByNo',{
                    'htmlModuleManage.htmlNo': code
                },res => {
                    resolve(res);
                },res => {
                    reject(res);
                })
            })
        }
    },
    getters,
    modules: {
        app,
        seo,
        order,
        seller,
        address,
        cart,
        member,
        create
    }
})
