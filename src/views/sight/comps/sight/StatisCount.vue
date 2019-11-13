<template>
  <div class="static-count" :style="{height:height}">
    <div class="static-count-content">
      <StaticItem
        v-for="(item,key) in basicList"
        :key="key"
        :blockColor="item.block"
        :title="item.title"
        titleColor="#bbbec4"
        :label="item.label"
        labelColor="#bbbec4"
        class="static-count-item"
      ></StaticItem>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    height: {
      type: String,
      default: "100%"
    }
  },
  components: {
    StaticItem: () => import("./StaticItem")
  },
  data() {
    return {
      basicList: [
        { block: "#ffffff", title: "20以下", label: "24%" },
        { block: "#ffbe34", title: "20-30", label: "8%" },
        { block: "#FF3800", title: "30-40", label: "33%" },
        { block: "#ffbe34", title: "40-50", label: "10%" },
        { block: "#495060", title: "50以上", label: "2%" }
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang='less' scoped>
.static-count {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  &-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  &-item {
    margin-bottom: 0.5rem;
  }
}
</style>