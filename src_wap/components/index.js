import searchBar from './searchBar.vue';
import plusOreduce from './plusOreduce.vue'


export default {
    install(Vue,option) {
        Vue.component(searchBar.name,searchBar);
        Vue.component('plusOreduce',plusOreduce);
    }
}