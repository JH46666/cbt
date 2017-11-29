import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
// 模块
import app from './modules/app';
import seo from './modules/seo'
import order from './modules/order'
import seller from './modules/seller'
import address from './modules/address'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        device: '',
    },
    mutations: {
        SET_DEVICE(state,val) {
            state.device = val
        }
    },
    getters,
    modules: {
        app,
        seo,
        order,
        seller,
        address
    }
})
