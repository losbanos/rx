import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { ApplicationInitator } from './core/ApplicationInitator';

Vue.config.productionTip = false;

new ApplicationInitator({
    App
}).setService([])
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
