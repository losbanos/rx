import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
Vue.config.productionTip = false;

export class ApplicationMain {

    public ApplicationMain() {

    }

    public init() {
        new Vue({
            router,
            render: h => h(App)
        }).$mount('#app');
    }
}