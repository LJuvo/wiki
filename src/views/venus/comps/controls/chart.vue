<template>
  <div class="controls">
    <h1>{{crtdata.title}}</h1>
    <p>{{crtdata.label}}</p>
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
export default {
  props: {
    crtdata: {
      type: Object,
      default: () => {}
    }
  },

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
    crtdata(v) {
      console.log(v);
    },
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
