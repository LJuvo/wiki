<template>
  <div class="basic-switch">
    <div class="switch-container">
      <input id="switch" type="checkbox" class="switch" />
      <label for="switch" onclick="test()"></label>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
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

.switch-container {
  height: 30px;
  width: 60px;
  margin-bottom: 5px;

  .switch {
    display: none;
  }

  label {
    display: block;
    background-color: #eeeeee;
    height: 100%;
    width: 100%;
    cursor: pointer;
    border-radius: 25px;
  }

  label:before {
    content: "";
    display: block;
    border-radius: 25px;
    height: 100%;
    width: 30px;
    background-color: white;
    opacity: 1;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
    -ms-transition: all 0.2s ease; /* IE 9 */
    -moz-transition: all 0.2s ease; /* Firefox */
    -webkit-transition: all 0.2s ease; /* Safari and Chrome */
    -o-transition: all 0.2s ease; /* Opera */
  }

  label:after {
    position: relative;
    top: -30px;
    left: 30px;
    content: "";
    display: block;
    border-radius: 25px;
    height: 100%;
    width: 30px;
    background-color: white;
    opacity: 0;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
    -ms-transition: all 0.2s ease; /* IE 9 */
    -moz-transition: all 0.2s ease; /* Firefox */
    -webkit-transition: all 0.2s ease; /* Safari and Chrome */
    -o-transition: all 0.2s ease; /* Opera */
  }

  #switch:checked ~ label:after {
    opacity: 1;
  }

  #switch:checked ~ label:before {
    opacity: 0;
  }

  #switch:checked ~ label {
    background-color: green;
  }
}
</style>