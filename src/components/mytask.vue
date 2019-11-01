<template>
  <div id="control">
    <Frame v-bind:pagetitle="pagetitle"></Frame>
  </div>
</template>

<script>
import Vue from "vue";
import qs from "qs";
import frame from "./frame.vue";
Vue.component("Frame",frame)
Vue.use(qs);

export default {
  name: "mytask",
  data() {
    return {
      pagetitle:"我的任务",
    };
  },
  methods: {}
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