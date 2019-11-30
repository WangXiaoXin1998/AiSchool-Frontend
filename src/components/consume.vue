<template>
  <div id="control">
    <Frame v-bind:pagetitle="pagetitle">
      <div style="text-align:right">
        <el-select v-model="select1" placeholder="请选择消费地点">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input v-model="input2" placeholder="请输入消费金额" style="width:200px"></el-input>
        <el-button type="primary" @click="addConsume">添加消费信息</el-button>
      </div>
      <el-table ref="filterTable" :data="tableData" style="width: 100%">
        <el-table-column prop="time" label="时间" sortable column-key="date"></el-table-column>
        <el-table-column prop="place" label="地点"></el-table-column>
        <el-table-column prop="money" label="金额"></el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
          width="100"
          :filters="[{ text: '正常', value: '正常' }, { text: '可疑', value: '可疑' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state === '正常' ? 'success' : 'warning'"
              disable-transitions
            >{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
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
      pagetitle: "消费监控",
      options: [
        {
          value: "第一餐厅",
          label: "第一餐厅"
        },
        {
          value: "第二餐厅",
          label: "第二餐厅"
        },
        {
          value: "第三餐厅",
          label: "第三餐厅"
        },
        {
          value: "第四餐厅",
          label: "第四餐厅"
        }
      ],
      select1: "",
      input2: "",
      consumelist: [],
      tableData: []
    };
  },
  methods: {
    filterTag(value, row) {
      return row.tag === value;
    },
    async addConsume() {
      await this.$axios
        .get(
          "/apife/api/createconsume?username=" +
            localStorage.username +
            "&money=" +
            this.input2 +
            "&place=" +
            this.select1,
          {}
        )
        .then(res => {
          if (res.data.error_num != 1) {
            this.$message({
              message:
                "添加成功：该条记录被判定为" +
                (res.data.state == "1" ? "正常" : "可疑"),
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
    },
    getConsume() {
      this.$axios
        .get("/apife/api/getconsume?username=" + localStorage.username, {})
        .then(res => {
          // this.$message({
          //   message: "获取成功：已获取最近的消费记录",
          //   type: "success"
          // });
          this.tableData = [];
          for (var i = res.data.list.length - 1; i >= 0; i--) {
            res.data.list[i].fields.time = res.data.list[i].fields.time
              .replace("T", " ")
              .substring(0, 19);
            this.tableData.push({
              money: res.data.list[i].fields.money,
              time: res.data.list[i].fields.time,
              place: res.data.list[i].fields.place,
              state: res.data.list[i].fields.state == "1" ? "正常" : "可疑"
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error("获取失败：服务器连接超时");
        });
    }
  },
  mounted() {
    this.getConsume();
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