<template>
  <div id="control">
    <Frame v-bind:pagetitle="pagetitle">
      <el-row :gutter="20">
        <el-col :span="12" :key="item">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="summarytitle">
                <span>{{summary[0].name}}</span>
              </div>
              <div class="summarycontent">
                {{summary[0].content}}
                <br />
                <div class="button2">共计消费{{summary[0].remark}}次</div>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="12" :key="item">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="summarytitle">
                <span>{{summary[1].name}}</span>
                <el-button class="button1" @click="changefood" type="text">
                  <i class="el-icon-refresh">换一换</i>
                </el-button>
              </div>
              <div class="summarycontent">
                {{summary[1].content}}
                <br />
                <div class="button2">来自用户{{summary[1].remark}}推荐</div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <br />
      <el-table ref="filterTable" :data="tableData" style="width: 100%" v-loading="tableloading">
        <el-table-column prop="time" label="交易时间" sortable column-key="date"></el-table-column>
        <el-table-column
          prop="place"
          label="交易地点"
          :filters="[{ text: '第一餐厅1楼', value: '第一餐厅1楼' }, { text: '第一餐厅2楼', value: '第一餐厅2楼' },{ text: '第二餐厅1楼', value: '第二餐厅1楼' }, { text: '第二餐厅2楼', value: '第二餐厅2楼' },{ text: '第三餐厅1楼', value: '第三餐厅1楼' }, { text: '第三餐厅2楼', value: '第三餐厅2楼' }]"
          :filter-method="filterPlace"
        ></el-table-column>
        <el-table-column prop="content" label="交易内容"></el-table-column>
        <el-table-column prop="money" label="交易金额"></el-table-column>
        <el-table-column
          prop="state"
          label="交易状态"
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
        <el-table-column prop="description" label="备注"></el-table-column>
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
      tableloading: true,
      select1: "",
      input2: "",
      consumelist: [],
      summary: [
        {
          name: "当月消费总额",
          content: 0,
          remark: 0,
        },
        {
          name: "猜你喜欢吃",
          content: "/",
          remark: 0,
        }
      ],
      reindex: 0,
      tableData: [],
      predictResult: []
    };
  },
  methods: {
    filterTag(value, row) {
      return row.state === value;
    },
    filterPlace(value, row) {
      return row.place === value;
    },
    changefood() {
      length = this.predictResult.length;
      if (this.reindex == length - 1) {
        this.reindex = 0;
      }
      this.reindex = this.reindex + 1;
      this.summary[1].remark = this.predictResult[this.reindex].username;
      this.summary[1].content = this.predictResult[this.reindex].food;
    },
    getConsume() {
      this.$axios
        .get("/apife/api/getconsume?username=" + localStorage.username, {})
        .then(res => {
          this.tableData = [];
          for (var i = res.data.list.length - 1; i >= 0; i--) {
            res.data.list[i].fields.time = res.data.list[i].fields.time
              .replace("T", " ")
              .substring(0, 19);
            this.tableData.push({
              money: "¥ " + res.data.list[i].fields.money.toFixed(2),
              time: res.data.list[i].fields.time,
              place: res.data.list[i].fields.place,
              content: res.data.list[i].fields.content,
              state: res.data.list[i].fields.state == 0 ? "正常" : "可疑",
              description: this.getDes(res.data.list[i].fields.state)
            });
          }
          this.tableloading = false;
        })
        .catch(error => {
          console.log(error);
          this.$message.error("获取失败：服务器连接超时");
        });
    },
    getSummary() {
      this.$axios
        .post(
          "/apife/api/getsummary",
          qs.stringify({ token: localStorage.token }),
          {}
        )
        .then(res => {
          this.summary[0].content = "¥ " + res.data.totalmoney.toFixed(2);
          this.summary[0].remark = res.data.totalnumber;
          for (var re of res.data.predictResult) {
            this.predictResult.push({ food: re[0], username: re[1] });
          }
          if (this.predictResult.length > 0) {
            this.summary[1].remark = this.predictResult[0].username;
            this.summary[1].content = this.predictResult[0].food;
          }
          console.log(this.predictResult);
        })
        .catch(error => {
          console.log(error);
          this.$message.error("获取失败：服务器连接超时");
        });
    },
    getDes(state) {
      if (state == 16) {
        return "消费金额、时间、地点可疑";
      } else if (state == 8) {
        return "消费时间、地点可疑";
      } else if (state == 4) {
        return "消费金额、时间可疑";
      } else if (state == 2) {
        return "消费金额、地点可疑";
      } else if (state == 1) {
        return "消费金额可疑";
      }
    }
  },
  mounted() {
    this.getConsume();
    this.getSummary();
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

.summarytitle {
  text-align: center;
  font-weight: 500;
  font-size: 18px;
}

.summarycontent {
  font-size: 40px;
  font-weight: 500;
  text-align: center;
}

.button1 {
  float: right;
  /* position: absolute; */
  padding: 3px 0;
}
.button2 {
  /* padding: 3px 0; */
  font-size: 15px;
  color: #a9a9a9;
  margin-top: 8px;
}
</style>