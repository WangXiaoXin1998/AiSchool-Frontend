<template>
  <div id="control">
    <Frame v-bind:pagetitle="pagetitle">
      <center>
        <el-button type="primary" @click="viewreport">全屏查看</el-button>
      </center>
      <yearlybilldetail></yearlybilldetail>
    </Frame>
  </div>
</template>

<script>
import Vue from "vue";
import qs from "qs";
import frame from "./frame.vue";
import yearlybilldetail from "./yearlybilldetail.vue";
Vue.component("Frame", frame);
Vue.component("yearlybilldetail", yearlybilldetail);
Vue.use(qs);

export default {
  name: "managelist",
  data() {
    return {
      pagetitle: "年度账单"
    };
  },
  methods: {
    viewreport(){
      this.$router.push('yearlybilldetail')
    }
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>