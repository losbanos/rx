import Vue from 'vue';
import router from '@/router/';
import Poke from '@views/poke/Poke.vue';

new Vue({
    router,
    render: h => h(Poke)
}).$mount('#poke');
