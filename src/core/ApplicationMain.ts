import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import {IApplicationMain} from '@/core/interface/IApplicationMain';

Vue.config.productionTip = false;

export default class ApplicationMain implements IApplicationMain {

    public constructor() {
        /* tslint:disable-no-empty-block */
    }

    public load() {
        new Vue({
            router,
            render: (h) => h(App)
        }).$mount('#app');
    }
}
