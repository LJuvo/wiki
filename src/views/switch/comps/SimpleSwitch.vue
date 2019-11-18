<template>
  <div class="basic-switch">
    <input type="checkbox" id="simple-1" />
    <label for="simple-1"></label>
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: Number,
      default: 60
    }
  },
  components: {},
  computed: {
    height() {
      return (this.width / 60) * 80;
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  beforeDestroy() {}
};
</script>
<style lang='less' scoped>
.basic-switch {
  // width: 200px;
  // height: 100px;
  // box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
input[type="checkbox"] {
  display: none;
  & + label {
    display: inline-block;
    width: 40px;
    height: 20px;
    position: relative;
    transition: 0.3s;
    margin: 0px 20px;
    box-sizing: border-box;
    &:after,
    &:before {
      content: "";
      display: block;
      position: absolute;
      left: 0px;
      top: 0px;
      width: 20px;
      height: 20px;
      transition: 0.3s;
      cursor: pointer;
    }
  }
}

#simple-1,
#simple-2,
#simple-3 {
  &:checked + label {
    &.red {
      background: #eca9a7;
      &:after {
        background: #d9534f;
      }
    }
    &.green {
      background: #aedcae;
      &:after {
        background: #5cb85c;
      }
    }
    &:after {
      left: calc(~"100% - 20px");
    }
  }
  & + label {
    background: #ddd;
    border-radius: 20px;
    box-shadow: 1px 1px 3px #aaa;
    &:after {
      background: #fff;
      border-radius: 50%;
      box-shadow: 1px 1px 3px #aaa;
    }
  }
}
</style>