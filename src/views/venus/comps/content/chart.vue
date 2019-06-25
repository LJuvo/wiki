<template>
  <div>
    <h1>Chart Content</h1>

    <h1>VENUS</h1>
    <h1>VENUS</h1>
    <h1>VENUS</h1>
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
  watch: {
    crtdata(v) {
      console.log(v);
    }
  }
};
</script>

<style>
</style>
