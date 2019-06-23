<template>
  <div class="controls">
    <div class="controls-settings">
      <div v-for="(item,key) in controlsArr" :key="key">
        <span>{{item.label}}:</span>
        <input v-model="item.val">
      </div>
      <Button @click="onGetControls">刷新</Button>
    </div>
    <div class="controls-output">Output</div>
  </div>
</template>

<script>
import { ClampToEdgeWrapping } from "three";
export default {
  data() {
    return {
      controlsArr: [
        {
          label: "基础参数",
          type: "textarea",
          val: `{data:[value:100,label:"ABLabel"]}`
        },
        {
          label: "数值参数",
          type: "number",
          min: 0,
          max: 300,
          val: 100
        },
        {
          label: "名称参数",
          type: "input",
          val: "Venus Name"
        }
      ]
    };
  },
  watch: {
    // controlsArr: {
    //   handler(newVal, oldVal) {
    //     console.log(newVal);
    //   },
    //   immediate: true
    // }
    controlsArr(newVal, oldVal) {
      console.log(newVal, oldVal);
    }
  },
  methods: {
    onGetControls() {
      console.log(this.controlsArr);
    }
  }
};
</script>

<style>
</style>
