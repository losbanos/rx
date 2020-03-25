import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@views/Home.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting this generates a separate chunk (about.[hash].js) for this route
            /* /* which is lazy-loaded when the route is visited. */
            component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
        },
        {
            path: '/poke',
            name: 'Poke',
            component: () => import('@views/poke/Poke.vue')
        },
        {
            path: '/rxjs',
            name: 'RxJs',
            component: () => import ('@views/rxjs/ViewRx.vue'),
            children: [
                {
                    path: 'news',
                    name: 'News',
                    component: () => import('@views/rxjs/News.vue')
                },
                {
                    path: 'system',
                    name: 'System',
                    component: () => import('@views/rxjs/SystemView.vue')
                }
            ]
        }
    ]
});
