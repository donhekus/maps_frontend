import Vue from 'vue'
import VueRouter from 'vue-router'
import App from "@/components/App";
import Edit from "@/components/Edit";
import List from "@/components/List";
import Home from "@/components/Home";
import Maps from "@/components/Maps";
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

window.axios = require('axios').default;

Vue.use(VueRouter);

export const eventBus = new Vue();

Vue.component('list', List);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '',
            name: 'home',
            component: Home
        },
        {
            path: '/:id?/edit',
            name: 'edit',
            component: Edit
        },
        {
            path: '/map/:name',
            name: 'map',
            component: Maps
        }
    ]
});

window.app = new Vue({
    components: {App},
    render: h => h(App),
    router,
}).$mount('#app');
