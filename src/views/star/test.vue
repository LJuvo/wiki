<template>
  <div>
    <div>
      <h1>测试 textarea 组件</h1>
      <div class="container" ref="wise">
        <button @click="add">add</button>
        <div v-for="(item, index) in listData" :key="index">
          <button @click="handleDelete(index)">delete</button>
          <beet-color-box v-model="item.text" :tools="[]"></beet-color-box>
        </div>
        <beet-color-box
          v-model="testData"
          tag="wise"
          ref="testText"
          maxlength="100"
          @add="handleAdd"
        >
          <div v-if="show">
            <div>
              <label>模版内容</label>
              <input type="text" v-model="form.text" />
            </div>
            <div>
              <button @click="addTag(form.text)">save</button>
            </div>
          </div>
        </beet-color-box>
        <div v-html="testData"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      testData: "",
      listData: [],
      show: false,
      form: {
        text: ""
      }
    };
  },
  methods: {
    add() {
      this.listData.push({ text: "" });
    },
    handleDelete(index) {
      this.listData.splice(index, 1);
      console.log("list", this.listData);
    },
    handleAdd(type) {
      if (type === "tag") {
        this.show = true;
      } else {
        console.log(type);
      }
    },
    addTag(text) {
      this.$refs.testText.addTag(text);
      console.log("testdata", this.testData);
      this.show = false;
    }
  }
};
</script>

