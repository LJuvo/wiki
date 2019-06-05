import Vue from "vue";
import Router from "vue-router";
import { routers } from "./defines";
import config from "../config";

Vue.use(Router);

const RouterConfig = {
    mode: "history",
    base: process.env.BASE_URL,
    routes: routers
};

const router = new Router(RouterConfig);

const whiteList = ["login", "403", "404", "500", "static"]; // 不重定向白名单

// router.beforeEach((to, from, next) => {
// if (config.enableAuth) {
//     const token = Vue.ls.get("TOKEN");
//     const isAdmin = Vue.ls.get("IS_ADMIN");
//     // const authMenus = Vue.ls.get("AUTH_MENUS");

//     if (whiteList.includes(to.name)) {
//         next();
//     } else {
//         if (token) {
//             if (to.path === "/login") {
//                 next("/");
//             } else {
//                 if (isAdmin) {
//                     next();
//                 } else {
//                     // if (authMenus.includes(to.name)) {
//                     next();
//                     // } else {
//                     //   next("/403");
//                     // }
//                 }
//             }
//         } else {
//             next("/login");
//         }
//     }
// } else {
//     next();
// }
// });

router.afterEach(() => {
    // window.scrollTo(0, 0);
});

export default router;