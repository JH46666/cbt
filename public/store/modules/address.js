import $api from '../../api'

const state = {
    data: []
}
const mutations = {
    SET_ADDRESS(state,newVal) {
        if(newVal instanceof Array) {
            state.data = newVal
        }
    }
}

const actions = {
    getAddress({commit}) {
        $api.get('/oteao/baseRegion/getRegionTree',{},res => {
            commit('SET_ADDRESS',res.data);
        })
    }
}


export default {
    state,
    mutations,
    actions
}