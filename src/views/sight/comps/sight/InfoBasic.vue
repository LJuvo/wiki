<template>
  <div class="info-basic">
    <InfoItem
      class="info-basic-item"
      v-for="(item,key) in infoList"
      :key="key"
      :title="item.title"
      :label="item.label"
    ></InfoItem>
  </div>
</template>
<script>
export default {
  props: {},
  components: {
    InfoItem: () => import("./InfoItem")
  },
  data() {
    return {
      infoList: [
        { title: "姓名", label: "大海" },
        { title: "电话", label: "135****1515" },
        { title: "性别", label: "男" },
        { title: "学历", label: "大学" },
        { title: "年龄", label: "20多" },
        { title: "地址", label: "广州市" }
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang='less' scoped>
.info-basic {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 0.5rem;
  margin-top: 0.5rem;
  &-item {
    margin-bottom: 0.5rem;
  }
}
</style>