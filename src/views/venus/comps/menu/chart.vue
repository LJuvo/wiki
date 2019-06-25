<template>
  <div>
    <h1>Chart Menu</h1>
    <div class="type-kind">
      <a v-for="(item,key) in kindArr" :key="key" @click="onCheckKind(item.kind)">
        <span :class="{'type-kind-active':item.checked}">{{item.label}}</span>
      </a>
    </div>
    <div class="type-menu">
      <div
        class="type-menu-item"
        v-for="(item,key) in kindTypeArr"
        :key="key"
        @click="onCheckKindType(item)"
      >
        <img :src="'chart/'+item.kind+'/'+item.thumb">
        <span class="type-menu-item-title">{{item.label}}</span>
      </div>
    </div>
    <div class="type-menu">
      <div
        class="type-menu-item"
        v-for="(item,key) in chartTypeArr"
        :key="key"
        @click="$emit('on-checked',item)"
      >
        <img :src="item.thumb">
      </div>
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
    },
    onCheckKindType(v) {
      if (v.kind == "basic")
        return (this.chartTypeArr = _.filter(templates, {
          chart_type: v.label
        }));
      if (v.kind == "func") {
        let arr = [];
        templates.forEach(ele => {
          ele.function_type.forEach(el => {
            if (el == v.label + "类") {
              arr.push(ele);
            }
          });
        });
        this.chartTypeArr = arr;
      }
    },
    getCharFromUtf8(str) {
      var cstr = "";
      var nOffset = 0;
      if (str == "") return "";
      str = str.toLowerCase();
      nOffset = str.indexOf("%e");
      if (nOffset == -1) return str;
      while (nOffset != -1) {
        cstr += str.substr(0, nOffset);
        str = str.substr(nOffset, str.length - nOffset);
        if (str == "" || str.length < 9) return cstr;
        cstr += utf8ToChar(str.substr(0, 9));
        str = str.substr(9, str.length - 9);
        nOffset = str.indexOf("%e");
      }
      return cstr + str;
    },
    // 转为unicode 编码
    encodeUnicode(str) {
      var res = [];
      for (var i = 0; i < str.length; i++) {
        res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
      }
      return "\\u" + res.join("\\u");
    },

    // 解码
    decodeUnicode(str) {
      str = str.replace(/\\/g, "%");
      return unescape(str);
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

