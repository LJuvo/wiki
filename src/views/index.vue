<template>
  <div style="width:100%;height:100%;">
    <router-view></router-view>
  </div>
</template>

<script>
import { appRouter } from "../router/defines";
export default {
  data() {
    return {
      menus: appRouter.children
    };
  },
  computed: {
    user() {
      return this.$store.getters.user || {};
    },
    isAdmin() {
      return this.$ls.get("IS_ADMIN");
    },
    authMenus() {
      return this.$ls.get("AUTH_MENUS");
    }
  },
  methods: {
    onMenuChanged(type) {
      if (type === "logout") {
        this.$store.dispatch("logout");
      } else {
        this.$router.push({ name: type });
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>