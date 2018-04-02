import searchBar from './searchBar.vue';
import plusOreduce from './plusOreduce.vue'
import goodsItem from './goodsItem.vue';
import goodsImg from './goodsImg.vue';
import mayLike from './mayLike.vue';
import editPrice from './editPrice';
import msgPopup from './msgPopup';
import collection from './collection';
import redActive from './redMessage.js'

export default {
    install(Vue,option) {
        Vue.component(searchBar.name,searchBar);
        Vue.component('plusOreduce',plusOreduce);
        Vue.component(goodsImg.name,goodsImg);
        Vue.component(goodsItem.name,goodsItem);
        Vue.component(mayLike.name,mayLike);
        Vue.component(msgPopup.name,msgPopup);
        Vue.component(collection.name,collection);
        Vue.prototype.$editPrice = editPrice;
        Vue.prototype.$redActive = redActive;
    }
}