import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
// 模块
import app from './modules/app';


Vue.use(Vuex)

export default new Vuex.Store({
    getters,
    modules: {
        app
    }
})
