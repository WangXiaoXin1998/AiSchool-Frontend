<template>
  <div id="control">
    <Frame v-bind:pagetitle="pagetitle">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>贫困生预测评级</span>
        </div>
        <div>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="城市等级">
              <el-select v-model="formInline.city" placeholder="请选择城市等级">
                <el-option label="一线城市" value="1"></el-option>
                <el-option label="二线城市" value="2"></el-option>
                <el-option label="三线城市" value="3"></el-option>
                <el-option label="四线城市" value="4"></el-option>
                <el-option label="五线城市" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单亲家庭">
              <el-select v-model="formInline.dq" placeholder="是否单亲家庭">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="烈士子女">
              <el-select v-model="formInline.ls" placeholder="是否烈士子女">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="孤儿家庭">
              <el-select v-model="formInline.gr" placeholder="是否孤儿家庭">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="建档立卡">
              <el-select v-model="formInline.card" placeholder="是否建档立卡">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="月均收入">
              <el-input v-model="formInline.income" placeholder="月均收入"></el-input>
            </el-form-item>
            <el-form-item label="平均消费">
              <el-input v-model="formInline.consume" placeholder="正餐平均消费金额"></el-input>
            </el-form-item>
          </el-form>
          <center>
            <el-button type="primary" @click="prePoor">一键评级</el-button>
            <el-button type="default" @click="resetPoor">重置表单</el-button>
          </center>
          <div v-if="showResult">
            <el-divider></el-divider>
            <!-- <div class="title">贫困生评级预测结果</div> -->
            <el-row :gutter="20">
              <el-col :span="11">
                <center>
                  <div class="grid-content bg-purple">
                    <div id="poorChart" :style="{width: '400px', height: '350px'}"></div>
                  </div>
                </center>
              </el-col>
              <el-col :span="11">
                <b>
                  <div class="grid-content bg-purple">
                    <div class="suggestti">
                      该生贫困等级建议：
                      <div class="suggestre">{{resultLevel}}</div>
                    </div>
                    <br />
                    <div class="suggestde" v-for="i in result" :key="i">{{i.name}}相似度：{{i.persent}}%</div>
                  </div>
                </b>
              </el-col>
            </el-row>
            <!-- 根据已有的训练数据，该生的贫困等级判断情况如下：
            <div v-for="i in result" :key="i">{{i[0]}}：{{i[1].toFixed(2)}}%</div>-->
          </div>
        </div>
      </el-card>
      <br />
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>训练信息数据集</span>
        </div>
        <div>
          <el-table
            ref="filterTable"
            :data="tableData"
            style="width: 100%"
            v-loading="tableLoading"
          >
            <el-table-column prop="username" label="用户名" sortable></el-table-column>
            <el-table-column prop="sex" label="性别" sortable></el-table-column>
            <el-table-column prop="city" label="城市级别" sortable></el-table-column>
            <el-table-column prop="income" label="月均收入" sortable></el-table-column>
            <el-table-column prop="dq" label="单亲家庭" sortable></el-table-column>
            <el-table-column prop="ls" label="烈士子女" sortable></el-table-column>
            <el-table-column prop="gr" label="孤儿" sortable></el-table-column>
            <el-table-column prop="card" label="建档立卡" sortable></el-table-column>
            <el-table-column prop="consume" label="平均消费" sortable></el-table-column>
            <el-table-column
              prop="tag"
              label="标签"
              width="100"
              :filters="[{ text: '一般困难', value: '一般困难' }, { text: '非常困难', value: '非常困难' }, { text: '不困难', value: '不困难' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag :type="getTag(scope.row.level)" disable-transitions>{{scope.row.level}}</el-tag>
              </template>
            </el-table-column>
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
  name: "managelist",
  data() {
    return {
      pagetitle: "贫困评级",
      tableData: [],
      showResult: false,
      tableLoading: true,
      summary: [
        {
          name: "学生总数",
          number: 0
        },
        {
          name: "不困难学生数",
          number: 0
        },
        {
          name: "一般困难学生数",
          number: 0
        },
        {
          name: "非常困难学生数",
          number: 0
        }
      ],
      formInline: {
        city: "",
        // sex: "",
        income: null,
        dq: "",
        ls: "",
        gr: "",
        card: "",
        consume: null
      },
      resultLevel: "",
      result: [
        {
          name: "不困难",
          persent: 0
        },
        {
          name: "一般困难",
          persent: 0
        },
        {
          name: "非常困难",
          persent: 0
        }
      ]
    };
  },
  methods: {
    resetPoor() {
      this.formInline.city = "";
      this.formInline.income = "";
      this.formInline.dq = "";
      this.formInline.ls = "";
      this.formInline.gr = "";
      this.formInline.card = null;
      this.formInline.consume = null;
    },
    getTag(level) {
      if (level == "非常困难") {
        return "warning";
      } else if (level == "一般困难") {
        return "default";
      } else {
        return "success";
      }
    },
    filterTag(value, row) {
      return row.level === value;
    },
    async getPoor() {
      await this.$axios
        .post(
          "/apife/api/getpoor",
          qs.stringify({
            token: localStorage.token
          }),
          {}
        )
        .then(res => {
          if (res.data.error_num == 1) {
            this.$message.error("获取失败：" + res.data.msg);
            this.toLogin();
            return;
          }
          this.tableData = [];
          for (var i = 0; i < res.data.list.length; i++) {
            this.tableData.push({
              username: res.data.list[i].fields.username,
              sex: res.data.list[i].fields.sex ? "男" : "女",
              city: this.getCityLevel(res.data.list[i].fields.city),
              income: res.data.list[i].fields.income,
              dq: res.data.list[i].fields.dq ? "是" : "否",
              ls: res.data.list[i].fields.ls ? "是" : "否",
              gr: res.data.list[i].fields.gr ? "是" : "否",
              card: res.data.list[i].fields.card ? "是" : "否",
              consume: res.data.list[i].fields.consume,
              level: res.data.list[i].fields.level
            });
            if (res.data.list[i].fields.level == "不困难") {
              this.summary[1].number = this.summary[1].number + 1;
            } else if (res.data.list[i].fields.level == "一般困难") {
              this.summary[2].number = this.summary[2].number + 1;
            } else {
              this.summary[3].number = this.summary[3].number + 1;
            }
          }
          this.summary[0].number = res.data.list.length;
          this.tableLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.$message.error("获取失败：服务器连接超时");
        });
    },
    async prePoor() {
      if (
        this.formInline.city == "" ||
        this.formInline.dq == "" ||
        this.formInline.ls == "" ||
        this.formInline.gr == "" ||
        this.formInline.card == "" ||
        this.formInline.income == null ||
        this.formInline.consume == null
      ) {
        this.$message.warning("评级失败：请将属性填写完成");
        return;
      }
      var check = this.formInline;
      // check.push(this.formInline);
      await this.$axios
        .post(
          "apife/api/checkpoor",
          qs.stringify({
            token: localStorage.token,
            check: JSON.stringify(check)
          }),
          {}
        )
        .then(res => {
          var result = res.data.result[0];
          this.resultLevel = result[0][0];
          for (var i = 0; i < 3; i++) {
            this.result[i].persent = 0;
          }
          for (var i = 0; i < result.length; i++) {
            if (result[i][0] == "不困难") {
              this.result[0].persent = result[i][1].toFixed(2);
            } else if (result[i][0] == "一般困难") {
              this.result[1].persent = result[i][1].toFixed(2);
            } else {
              this.result[2].persent = result[i][1].toFixed(2);
            }
          }
          this.showResult = true;
          this.$message({
            message: "评级成功：请查看评级结果",
            type: "success"
          });
        })
        .catch(error => {
          console.log(error);
          this.$message.error("评级失败：服务器连接超时");
          return;
        });
      this.drawLine();
    },
    drawLine() {
      let myChart = echarts.init(document.getElementById("poorChart"));
      myChart.setOption({
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
            name: "预测等级",
            type: "pie",
            radius: "65%",
            roseType: "angle",
            data: [
              { value: this.result[2].persent, name: "非常困难" },
              { value: this.result[1].persent, name: "一般困难" },
              { value: this.result[0].persent, name: "不困难" }
            ]
          }
        ]
      });
    }
  },
  mounted() {
    this.getPoor();
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

.title {
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
}

.suggestti {
  font-size: 30px;
}

.suggestde {
  font-size: 25px;
}

.suggestre {
  color: red;
  text-align: center;
  font-size: 50px;
}
</style>