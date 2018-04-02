
let title = document.querySelector('title');
const state = {
    title: '茶帮通'
}


const mutations = {
    SET_TITLE(state,val) {
        state.title = val
        title.innerHTML = val;
    }
}


export default {
    state,
    mutations
}