<template>
  <div class="screen">
    <div class="screen-header">
      <BasicFlexRow>
        <GoldBtn label="数据"></GoldBtn>
        <div class="screen-header-btn">
          <GoldBtn :checked="true" width="5rem"></GoldBtn>
          <GoldBtn width="5rem" style="margin-left:0.25rem"></GoldBtn>
          <GoldBtn width="5rem" style="margin-left:0.25rem"></GoldBtn>
        </div>
      </BasicFlexRow>
    </div>
    <div class="screen-content">
      <FlexBox align="auto">
        <FlexBox direction="column" justify="flex-start" style="flex:1">
          <FlexBox width="100%">
            <GoldBtn label="数据"></GoldBtn>
            <div class="screen-header-btn">
              <GoldBtn :checked="true" width="5rem"></GoldBtn>
              <GoldBtn width="5rem" style="margin-left:0.25rem"></GoldBtn>
              <GoldBtn width="5rem" style="margin-left:0.25rem"></GoldBtn>
            </div>
          </FlexBox>

          <FlexBox justify="flex-start" width="100%" textAlign="left" style="flex-flow:wrap">
            <LabelNumber class="label-num-item" width="10rem"></LabelNumber>
            <LabelNumber class="label-num-item" width="10rem"></LabelNumber>
            <LabelNumber class="label-num-item" width="10rem"></LabelNumber>
            <LabelNumber class="label-num-item" width="10rem"></LabelNumber>
          </FlexBox>
          <FlexBox width="100%" style="height:500px">
            <!-- <img style="width:100%" src="./map.png" /> -->
            <ModelBuildingLine></ModelBuildingLine>
          </FlexBox>
          <FlexBox direction="column" justify="flex-start" width="100%">
            <GoldBtn
              label="实时告警情况"
              width="100%"
              color="#fff"
              style="font-size:14px;margin-bottom:10px"
            ></GoldBtn>

            <TrendBoxTime style="height:200px"></TrendBoxTime>
          </FlexBox>
        </FlexBox>
        <div style="width:300px;margin-left:10px;">
          <FlexBox direction="column" justify="flex-start">
            <GoldBtn label="情况排行" width="100%" color="#fff" style="font-size:1rem;"></GoldBtn>
            <FlexBox direction="column" justify="flex-start" width="100%">
              <TopLabel></TopLabel>
              <TopLabel></TopLabel>
              <TopLabel :checked="false"></TopLabel>
              <TopLabel :checked="false" barWidth="60%"></TopLabel>
              <TopLabel :checked="false" barWidth="40%"></TopLabel>
              <TopLabel :checked="false" barWidth="20%"></TopLabel>
            </FlexBox>
          </FlexBox>
          <FlexBox direction="column" justify="flex-start">
            <GoldBtn label="历史统计" width="100%" color="#fff" style="font-size:1rem;"></GoldBtn>
            <!-- <div>历史数据</div> -->
            <BlackHole></BlackHole>
            <BtnPane></BtnPane>
          </FlexBox>
        </div>
      </FlexBox>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    BasicFlexRow: () => import("./BasicFlexRow"),
    FlexBox: () => import("./FlexBox"),
    GoldBtn: () => import("./GoldBtn"),
    TopLabel: () => import("./TopLabel"),
    LabelNumber: () => import("./LabelNumber"),
    BlackHole: () => import("./BlackHole"),

    BtnPane: () => import("./BtnPane"),
    TrendBoxTime: () => import("./TrendBoxTime"),
    ModelBuilding: () => import("./ModelBuilding"),
    ModelBuildingLine: () => import("./ModelBuildingLine"),
    ModelBuildingFace: () => import("./ModelBuildingFace")
  },
  data() {
    return {};
  },
  mounted() {
    this.initDocFontSize();
  },
  methods: {
    initDocFontSize() {
      let offsetWidth = parseInt(document.documentElement.clientWidth) / 80;
      document.documentElement.style.fontSize = offsetWidth + "px";
    }
  }
};
</script>

<style lang="less" scoped>
@screen-gold-black : #2F2F2F;
@screen-gold-grey : #9A9A9A;
@screen-gold-white : #FFFFFF;
@screen-gold-yellow : #FFBE34;
@screen-gold-orange : #FF3800;
.screen {
  background: @screen-gold-black;
  color: @screen-gold-yellow;
  height: 100vh;
  width: 100vw;
  padding: 1.5rem;
  overflow: hidden;
  &-header {
    margin-bottom: 1rem;
    &-btn {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }
  }
  &-content {
  }
}
.label-num-item {
  margin-right: 0.5rem;
}
</style>