<template>
  <div>
    <Frame :pagetitle="pagetitle" :token="token">aaa</Frame>
  </div>
</template>

<script>
import Vue from "vue";
import qs from "qs";
import Frame from "./frame.vue";
Vue.component("Frame", Frame);
Vue.use(qs);

export default {
  name: "index",
  data() {
    return {
      pagetitle: "个人信息",
      token: ""
    };
  },
  methods: {
    getdata() {}
  },
  mounted() {
    this.getdata();
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