<template>
  <div>
    <h1>Chart Menu</h1>
    <div class="type-kind">
      <a v-for="(item,key) in kindArr" :key="key" @click="onCheckKind(item.kind)">
        <span :class="{'type-kind-active':item.checked}">{{item.label}}</span>
      </a>
    </div>
    <div class="type-menu">
      <div class="type-menu-item" v-for="(item,key) in kindTypeArr" :key="key">
        <img :src="'chart/'+item.kind+'/'+item.thumb">
        <span class="type-menu-item-title">{{item.label}}</span>
      </div>
    </div>
    <div class="type-menu">
      <div class="type-menu-item" v-for="(item,key) in chartTypeArr" :key="key">
        <img :src="item.thumb">
      </div>
      <div class="type-menu-item"></div>
      <div class="type-menu-item"></div>
      <div class="type-menu-item"></div>
    </div>
  </div>
</template>

<script>
import { templates, kind } from "../../../../data/menu";
export default {
  data() {
    return {
      kindArr: [
        { label: "基础型", kind: "basic", checked: false },
        { label: "功能型", kind: "func", checked: false }
      ],
      kindTypeArr: [],
      chartTypeArr: []
    };
  },
  mounted() {
    this.chartTypeArr = templates;
    console.log(_.groupBy(this.chartTypeArr, "function_type"));
    console.log(_.groupBy(this.chartTypeArr, "chart_type"));
    let tmp = [];
    this.chartTypeArr.forEach(ele => {
      tmp.push(ele.dataSrc);
    });
    console.log(_.groupBy(tmp, "srcType"));
    console.log(_.groupBy(tmp, "dataType"));

    this.onCheckKind("basic");
  },
  methods: {
    onCheckKind(v) {
      this.kindArr.forEach(ele => {
        ele.checked = false;
        if (ele.kind == v) ele.checked = true;
      });
      this.kindTypeArr = _.filter(kind, { kind: v });
    }
  }
};
</script>

<style lang="less">
.type-kind {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: #aaaaaa;
  &-active {
    color: #ffffff;
  }
}
.type-menu {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  // grid-template-rows: 60px auto 60px;
  &-item {
    width: calc(100% - 20px);
    height: 50px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
    img {
      width: 80%;
    }
    &-title {
      font-size: 10px;
    }
  }
}
</style>

