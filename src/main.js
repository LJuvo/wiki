import Vue from "vue";
import VueResource from "vue-resource";
import App from "./App.vue";
import router from "./router";
import config from "./config/";
import higeroo from "../node_modules/higeroo/src/lib/index";
// import higeroo from "higeroo";
// import BeetColor from "beet-color";
import BeetColor from "../node_modules/beet-color/dist/js/index.c6219dc2";

Vue.use(BeetColor);

Vue.use(VueResource);
Vue.use(higeroo);
Vue.config.productionTip = false;
Vue.prototype.$config = config;
window._ = require("lodash");

new Vue({
    router,
    render: h => h(App),
    created: function() {
        //process msg
        // const msg = new MSG();
        // msg.init();
        // if (config.enableAuth) {
        //     //fetch account
        //     const token = Vue.ls.get("TOKEN");
        //     if (token) {
        //         store.dispatch("fetchAccount");
        //     }
        // }
    }
}).$mount("#app");