<template>
  <div class="screen">
    <ShowPane></ShowPane>
  </div>
</template>
<script>
export default {
  components: {
    ShowPane: () => import("./comps/sight/ShowPane")
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
@screen-gold-black : #2F2F2F;
@screen-gold-grey : #9A9A9A;
@screen-gold-white : #FFFFFF;
@screen-gold-yellow : #FFBE34;
@screen-gold-orange : #FF3800;
.screen {
  background: @screen-gold-black;
  color: @screen-gold-yellow;
  height: 100vh;
  width: 100vw;
  // padding: 1.5rem;
  overflow: hidden;
  &-header {
    margin-bottom: 1rem;
    &-btn {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }
  }
  &-content {
  }
}
.label-num-item {
  margin-right: 0.5rem;
}
</style>