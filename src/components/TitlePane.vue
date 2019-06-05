<template>
  <div class="title-pane">
    <div class="title-pane-main">
      <span class="title-pane-main-tip"></span>
      <span class="title-pane-main-label">色彩搭配</span>
      <span class="title-pane-main-inner">COLOR MATCHING</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.title-pane {
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  &-main {
    flex: 1;
    display: flex;
    align-items: flex-end;
    &-tip {
      width: 5px;
      height: 30px;
      display: inline-block;
      background: #ccc;
    }
    &-label {
      height: 30px;
      line-height: 30px;
      margin: 0;
      margin-left: 15px;
      font-size: 24px;
      font-weight: 600;
      color: #333;
    }
    &-inner {
      height: 24px;
      margin-left: 15px;
      font-size: 14px;
      color: #bfbfbf;
      // align-items: flex-end;
    }
  }
}
</style>
