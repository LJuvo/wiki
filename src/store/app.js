// import jsSHA from "jssha";
// import qs from "qs";
import Vue from "vue";
import router from "../router/";
// import Config from "../config";

const app = {
    state: {
        token: "",
        user: {}
    },
    mutations: {
        SET_TOKEN: (state, payload) => (state.token = payload),
        SET_USER: (state, payload) => (state.user = payload)
    },
    actions: {
        fetchToken({ commit, dispatch }, payload) {
            Vue.ls.set("TOKEN", "current");
            Vue.bus.$emit("$wiki_token_changed", "wiki");
            commit("SET_TOKEN", "wiki");
            //   const shaObj = new jsSHA("SHA-1", "TEXT");
            //   shaObj.update(payload.password);
            //   const para = {
            //     ...payload,
            //     password: shaObj.getHash("HEX"),
            //     scope: "ui",
            //     grant_type: "password",
            //     client_id: "browser"
            //   };

            //   Vue.http({
            //     method: "post",
            //     url: "uaa/oauth/token",
            //     data: qs.stringify(para)
            //   })
            //     .then(response => {
            //   Vue.ls.set("TOKEN", response.access_token);
            //   Vue.bus.$emit("$hyz_token_changed", response.access_token);
            //   commit("SET_TOKEN", response.access_token);

            //   dispatch("fetchAccount");

            //如果失效时间小于1天, 那么就调一次refreshtoken
            //保持token有效期。
            //   if (response.expires_in < 60 * 60 * 24) {
            // const refeshPara = {
            //   ...para,
            //   grant_type: "refresh_token"
            // };
            // Vue.$http({
            //   method: "post",
            //   url: "uaa/oauth/token",
            //   data: qs.stringify(refeshPara),
            //   showSpin: false
            // }).then(response => {
            //   Vue.ls.set("TOKEN", response.access_token);
            //   Vue.bus.$emit("$hyz_token_changed", response.access_token);
            //   commit("SET_TOKEN", response.access_token);
            // });
            //   }
            // })
            // .catch(() => {
            //   Vue.bus.$emit("$set_login_loding_false");
            // });
        },

        fetchAccount({ commit }) {
            //   Vue.http({
            //     method: "get",
            //     url: "account/v1/user/current",
            //     showSpin: false,
            //     headers: {
            //       Authorization: "Bearer " + Vue.ls.get("TOKEN")
            //     }
            //   })
            //     .then(response => {
            //   Vue.bus.$emit("$set_login_loding_false");

            //   const menuList = _.filter(response.menuList, {
            //     sysFlag: Config.sysFlag
            //   });
            //   const menus = _.uniq(_.map(menuList, "name"));
            //   Vue.ls.set("AUTH_MENUS", menus);

            //   const isAdmin = response.userName === "admin" ? 1 : 0;
            //   Vue.ls.set("IS_ADMIN", isAdmin);

            //   commit("SET_USER", response);
            //   if (router.currentRoute.path === "/login") {
            //     if (isAdmin) {
            //       router.push("/");
            //     } else {
            //       let name =
            //         menus.indexOf("home") > -1
            //           ? "home"
            //           : _.get(menus, "[0]", "403");
            //       router.push({ name });
            //     }
            //   }
            // })
            // .catch(() => {
            //   Vue.bus.$emit("$set_login_loding_false");
            //   Vue.ls.remove("TOKEN");
            //   router.push("/login");
            // });
        },

        logout() {
            Vue.ls.remove("TOKEN");
            Vue.ls.remove("IS_ADMIN");
            Vue.ls.remove("AUTH_MENUS");
            router.push("/login");
        }
    }
};

export default app;