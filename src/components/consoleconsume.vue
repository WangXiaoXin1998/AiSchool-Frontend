<template>
  <div id="control">
    <Frame v-bind:pagetitle="pagetitle">
      <div>由于消费行为应由用户线下产生，该页面用于模拟消费行为的产生。</div>
      <br />
      <el-select v-model="select1" placeholder="请选择交易地点">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="input2" placeholder="请输入交易内容" style="width:200px"></el-input>
      <el-input v-model="input3" placeholder="请输入交易金额" style="width:200px"></el-input>
      <el-button type="primary" @click="addConsume">添加消费信息</el-button>
    </Frame>
  </div>
</template>

<script>
import Vue from "vue";
import qs from "qs";
import frame from "./frame.vue";
Vue.component("Frame", frame);
Vue.use(qs);

export default {
  name: "managelist",
  data() {
    return {
      pagetitle: "交易维护",
      options: [
        {
          value: "第一餐厅1楼",
          label: "第一餐厅1楼"
        },
        {
          value: "第一餐厅2楼",
          label: "第一餐厅2楼"
        },
        {
          value: "第二餐厅1楼",
          label: "第二餐厅1楼"
        },
        {
          value: "第二餐厅2楼",
          label: "第二餐厅2楼"
        },
        {
          value: "第三餐厅1楼",
          label: "第三餐厅1楼"
        },
        {
          value: "第三餐厅2楼",
          label: "第三餐厅2楼"
        }
      ],
      select1: "",
      input2: "",
      input3: "",
      consumelist: [],
      tableData: []
    };
  },
  methods: {
    filterTag(value, row) {
      return row.tag === value;
    },
    async addConsume() {
      var FormData = {
        token: localStorage.token,
        place: this.select1,
        content: this.input2,
        money: this.input3
      };
      await this.$axios
        .post("/apife/api/createconsume", qs.stringify(FormData), {})
        .then(res => {
          if (res.data.error_num != 1) {
            this.$message({
              message:
                "添加成功：该条记录被判定为" +
                (res.data.state == 0 ? "正常" : "可疑"),
              type: "success"
            });
          } else {
            this.$message.error("添加失败：" + res.data.msg);
          }
        })
        .catch(error => {
          this.$message.error("添加失败：服务器连接超时");
        });
      this.getConsume();
    }
  },
  mounted() {}
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