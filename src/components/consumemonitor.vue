<template>
  <div id="control">
    <Frame v-bind:pagetitle="pagetitle">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>异常时间分布</span>
            </div>
            <div>
              <div id="timeChart" :style="{width: '100%', height: '300px'}"></div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>异常原因比例</span>
            </div>
            <div>
              <div id="resultChart" :style="{width: '100%', height: '300px'}"></div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <br />
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>近期异常数据</span>
        </div>
        <div>
          <el-table
            ref="filterTable"
            :data="tableData"
            style="width: 100%"
            v-loading="tableloading"
          >
            <el-table-column prop="username" label="用户名" sortable column-key="username"></el-table-column>
            <el-table-column prop="time" label="交易时间" sortable column-key="date"></el-table-column>
            <el-table-column
              prop="place"
              label="交易地点"
              :filters="[{ text: '第一餐厅1楼', value: '第一餐厅1楼' }, { text: '第一餐厅2楼', value: '第一餐厅2楼' },{ text: '第二餐厅1楼', value: '第二餐厅1楼' }, { text: '第二餐厅2楼', value: '第二餐厅2楼' },{ text: '第三餐厅1楼', value: '第三餐厅1楼' }, { text: '第三餐厅2楼', value: '第三餐厅2楼' }]"
              :filter-method="filterPlace"
            ></el-table-column>
            <el-table-column prop="content" label="交易内容"></el-table-column>
            <el-table-column prop="money" label="交易金额"></el-table-column>
            <el-table-column prop="description" label="可疑原因"></el-table-column>
          </el-table>
        </div>
      </el-card>
    </Frame>
  </div>
</template>

<script>
import Vue from "vue";
import qs from "qs";
import frame from "./frame.vue";
import echarts from "echarts";
Vue.prototype.$echarts = echarts;
Vue.component("Frame", frame);
Vue.use(qs);

export default {
  name: "consumemonitor",
  data() {
    return {
      pagetitle: "消费监测",
      tableloading: true,
      consumelist: [],
      tableData: [],
      error: {
        time: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        result: [0, 0, 0, 0, 0]
      }
    };
  },
  methods: {
    filterTag(value, row) {
      return row.state === value;
    },
    filterPlace(value, row) {
      return row.place === value;
    },
    drawLine() {
      let timeChart = echarts.init(document.getElementById("timeChart"));
      timeChart.setOption({
        xAxis: {
          type: "category",
          data: [
            "0点",
            "1点",
            "2点",
            "3点",
            "4点",
            "5点",
            "6点",
            "7点",
            "8点",
            "9点",
            "10点",
            "11点",
            "12点",
            "13点",
            "14点",
            "15点",
            "16点",
            "17点",
            "18点",
            "19点",
            "20点",
            "21点",
            "22点",
            "23点"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.error.time,
            type: "line",
            symbol: "triangle",
            symbolSize: 10
          }
        ]
      });
      let resultChart = echarts.init(document.getElementById("resultChart"));
      resultChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        itemStyle: {
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        },
        series: [
          {
            name: "异常原因",
            type: "pie",
            radius: "65%",
            roseType: "angle",
            data: [
              { value: this.error.result[0], name: "消费金额、时间、地点可疑" },
              { value: this.error.result[1], name: "消费时间、地点可疑" },
              { value: this.error.result[2], name: "消费金额、时间可疑" },
              { value: this.error.result[3], name: "消费金额、地点可疑" },
              { value: this.error.result[4], name: "消费金额可疑" },
            ]
          }
        ]
      });
    },
    getConsume() {
      this.$axios
        .post(
          "/apife/api/geterrorconsume",
          qs.stringify({ token: localStorage.token }),
          {}
        )
        .then(res => {
          this.tableData = [];
          for (var i = res.data.list.length - 1; i >= 0; i--) {
            var temptime = parseInt(res.data.list[i].fields.time.substring(11,13))
            console
            this.error.time[temptime] = this.error.time[temptime] + 1
            res.data.list[i].fields.time = res.data.list[i].fields.time
              .replace("T", " ")
              .substring(0, 19);
            this.tableData.push({
              money: "¥ " + res.data.list[i].fields.money.toFixed(2),
              time: res.data.list[i].fields.time,
              username: res.data.list[i].fields.username,
              place: res.data.list[i].fields.place,
              content: res.data.list[i].fields.content,
              description: this.getDes(res.data.list[i].fields.state)
            });
          }
          this.tableloading = false;
          this.drawLine();
        })
        .catch(error => {
          console.log(error);
          this.$message.error("获取失败：服务器连接超时");
        });
    },
    getDes(state) {
      if (state == 16) {
        this.error.result[0] = this.error.result[0] + 1;
        return "消费金额、时间、地点可疑";
      } else if (state == 8) {
        this.error.result[1] = this.error.result[1] + 1;
        return "消费时间、地点可疑";
      } else if (state == 4) {
        this.error.result[2] = this.error.result[2] + 1;
        return "消费金额、时间可疑";
      } else if (state == 2) {
        this.error.result[3] = this.error.result[3] + 1;
        return "消费金额、地点可疑";
      } else if (state == 1) {
        this.error.result[4] = this.error.result[4] + 1;
        return "消费金额可疑";
      }
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