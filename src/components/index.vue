<template>
  <div id="control">
    <frame></frame>
  </div>
</template>

<script>
import Vue from "vue";
import bglizi from "./bglizi.vue";
import qs from "qs";
import frame from "./frame.vue";
Vue.component("bglizi", bglizi);
Vue.use(qs);

export default {
  name: "index",
  components: {
    frame
  },
  data() {
    return {};
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

<script>
export default {
  data() {
    return {};
  },
  methods: {
    exit() {
      localStorage.clear();
      this.$router.push("login");
    }
  }
};
</script>