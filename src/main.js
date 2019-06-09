import Vue from "vue";
import VueResource from "vue-resource";
import App from "./App.vue";
import router from "./router";
import config from "./config/";

Vue.use(VueResource);
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