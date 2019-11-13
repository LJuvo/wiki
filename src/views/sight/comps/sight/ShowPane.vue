<template>
  <div class="basic-pane">
    <FlexBox direction="column" width="100%" justify="flex-start">
      <BasicBtn label="画像分析" width="100%" color="#fff" style="font-size:1rem;"></BasicBtn>
      <BlackHole></BlackHole>
    </FlexBox>
    <FlexBox direction="column" width="100%" justify="flex-start">
      <BasicBtn label="基础信息" width="100%" color="#fff" style="font-size:1rem;"></BasicBtn>
      <InfoBasic></InfoBasic>
    </FlexBox>
    <FlexBox direction="column" width="100%" justify="flex-start">
      <BasicBtn label="数值统计" width="100%" color="#fff" style="font-size:1rem;"></BasicBtn>
      <StatisCount></StatisCount>
    </FlexBox>
    <FlexBox direction="column" width="100%" justify="flex-start">
      <BasicBtn label="环形数值" width="100%" color="#fff" style="font-size:1rem;"></BasicBtn>
      <TrendPieCount></TrendPieCount>
    </FlexBox>
    <FlexBox direction="column" width="100%" justify="flex-start">
      <BasicBtn label="模型" width="100%" color="#fff" style="font-size:1rem;"></BasicBtn>
      <!-- <ModelBuilding style="height:300px"></ModelBuilding> -->
    </FlexBox>
    <FlexBox direction="column" width="100%" justify="flex-start">
      <BasicBtn label="历史统计" width="100%" color="#fff" style="font-size:1rem;"></BasicBtn>
      <ModelBuildingLine></ModelBuildingLine>
    </FlexBox>
    <FlexBox direction="column" width="100%" justify="flex-start">
      <BasicBtn label="历史统计" width="100%" color="#fff" style="font-size:1rem;"></BasicBtn>
      <!-- <ModelBuildingFace></ModelBuildingFace> -->
    </FlexBox>
    <FlexBox direction="column" width="100%" justify="flex-start">
      <BasicBtn label="历史统计" width="100%" color="#fff" style="font-size:1rem;"></BasicBtn>
    </FlexBox>
    <FlexBox direction="column" width="100%" justify="flex-start">
      <BasicBtn label="历史统计" width="100%" color="#fff" style="font-size:1rem;"></BasicBtn>
    </FlexBox>
    <FlexBox direction="column" width="100%" justify="flex-start">
      <BasicBtn label="历史统计" width="100%" color="#fff" style="font-size:1rem;"></BasicBtn>
    </FlexBox>
    <FlexBox direction="column" width="100%" justify="flex-start">
      <BasicBtn label="历史统计" width="100%" color="#fff" style="font-size:1rem;"></BasicBtn>
    </FlexBox>
    <FlexBox direction="column" width="100%" justify="flex-start">
      <BasicBtn label="历史统计" width="100%" color="#fff" style="font-size:1rem;"></BasicBtn>
    </FlexBox>
  </div>
</template>
<script>
export default {
  props: {},
  components: {
    FlexBox: () => import("./FlexBox"),
    BasicBtn: () => import("./BasicBtn"),

    BlackHole: () => import("./BlackHole"),
    InfoBasic: () => import("./InfoBasic"),
    StatisCount: () => import("./StatisCount"),
    TrendPieCount: () => import("./TrendPieCount"),
    ModelBuilding: () => import("./ModelBuilding"),
    ModelBuildingLine: () => import("./ModelBuildingLine"),
    ModelBuildingFace: () => import("./ModelBuildingFace")
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang='less' scoped>
.basic-pane {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1rem;
}
</style>