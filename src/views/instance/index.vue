<template>
  <div class="screen">
    <div class="screen-content">
      <ContentLoader :height="160" :width="400" :speed="2">
        <rect x="0" y="0" rx="3" ry="3" width="70" height="10" />
        <rect x="80" y="0" rx="3" ry="3" width="100" height="10" />
        <rect x="190" y="0" rx="3" ry="3" width="10" height="10" />
        <rect x="15" y="20" rx="3" ry="3" width="130" height="10" />
        <rect x="155" y="20" rx="3" ry="3" width="130" height="10" />
        <rect x="15" y="40" rx="3" ry="3" width="90" height="10" />
        <rect x="115" y="40" rx="3" ry="3" width="60" height="10" />
        <rect x="185" y="40" rx="3" ry="3" width="60" height="10" />
        <rect x="0" y="60" rx="3" ry="3" width="30" height="10" />
        <circle cx="306.17" cy="133.21" r="50.54" />
      </ContentLoader>
    </div>
    <div class="screen-tools">
      <ContentLoader :height="160" :width="280" :speed="2">
        <rect x="0" y="0" rx="3" ry="3" width="280" height="40" />

        <rect x="185" y="40" rx="3" ry="3" width="60" height="10" />
        <rect x="0" y="60" rx="3" ry="3" width="30" height="10" />
        <circle cx="306.17" cy="133.21" r="50.54" />
      </ContentLoader>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    ContentLoader: () => import("./comps/ContentLoader")
  },
  data() {
    return {};
  },
  mounted() {
    this.initDocFontSize();
  },
  methods: {
    initDocFontSize() {
      let offsetWidth = parseInt(document.documentElement.clientWidth) / 80;
      document.documentElement.style.fontSize = offsetWidth + "px";
    }
  }
};
</script>

<style lang="less" scoped>
.screen {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  min-height: 600px;
  min-width: 1200px;
  &-content {
    flex: 1;
  }
  &-tools {
    width: 300px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>