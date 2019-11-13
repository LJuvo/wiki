<template>
  <div class="btnpane" :style="{
    height:height,
    width:width
  }">
    <BasicBtn
      v-for="(item,key) in basicList"
      :key="key"
      style="margin-bottom:1rem"
      :title="item.label"
      :label="item.label"
      :background="item.bg"
      color="#fff"
      :borderColor="item.borderColor"
    ></BasicBtn>
  </div>
</template>
<script>
export default {
  props: {
    height: {
      type: String,
      default: "auto"
    },
    width: {
      type: String,
      default: "100%"
    }
  },
  components: {
    BasicBtn: () => import("./BasicBtn")
  },
  data() {
    return {
      basicList: []
    };
  },
  mounted() {
    this.basicList = this.mockList();
  },
  methods: {
    mockList() {
      let arr = [];
      for (let i = 1; i < 10; i++) {
        arr.push({
          label: "按钮" + i,
          bg: "rgba(" + i * 25.5 + "," + i * 25.5 + "," + i * 25.5 + ",0.4)",
          borderColor: "rgb( " + i * 10 + 100 + ",255,190)"
        });
      }
      return arr;
    }
  }
};
</script>
<style lang="less" scoped>
.btnpane {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
  overflow: hidden;
  overflow-y: auto;
}
</style>