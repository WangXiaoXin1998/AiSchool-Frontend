<template>
  <div id="control">
    <frame v-bind:pagetitle="pagetitle"></frame>
  </div>
</template>

<script>
import Vue from "vue";
import qs from "qs";
import frame from "./frame.vue";
Vue.use(qs);

export default {
  name: "safe",
  components: {
    frame
  },
  data() {
    return {
      pagetitle:"账户安全",
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