import searchBar from './searchBar.vue';
import plusOreduce from './plusOreduce.vue'
import goodsItem from './goodsItem.vue';
import goodsImg from './goodsImg.vue';

export default {
    install(Vue,option) {
        Vue.component(searchBar.name,searchBar);
        Vue.component('plusOreduce',plusOreduce);
        Vue.component(goodsImg.name,goodsImg);
        Vue.component(goodsItem.name,goodsItem);
    }
}