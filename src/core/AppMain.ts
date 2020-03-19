import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import {IAppMain} from '@/core/interface/IAppMain';

Vue.config.productionTip = false;

export default class AppMain implements IAppMain {

    public constructor() {
        /* tslint:disable-no-empty-block */
    }

    public load() {
        new Vue({
            router,
            render: (h) => h(App)
        }).$mount('#app');
    }

    /**
     * init
     */
    public init() {
        // tslint-disable:no-empty-block
    }
}

