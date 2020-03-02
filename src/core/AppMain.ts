import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import {IAppMain} from '@/core/interface/IAppMain';

Vue.config.productionTip = false;

export class AppMain  implements IAppMain{

    public constructor() {

    }

    public init() {
        new Vue({
            router,
            render: h => h(App)
        }).$mount('#app');
    }
}