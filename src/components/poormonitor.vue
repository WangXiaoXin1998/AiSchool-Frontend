<template>
  <div id="control">
    <Frame v-bind:pagetitle="pagetitle">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item of summary" :key="item">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="summarytitle">
                <span>{{item.name}}</span>
              </div>
              <div class="summarycontent">{{item.number}}</div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <br />
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>存疑评级数据区</span>
        </div>
        <div>
          <el-table
            ref="filterTable"
            :data="tableData1"
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
              prop="level"
              label="原评级"
              width="100"
              :filters="[{ text: '一般困难', value: '一般困难' }, { text: '非常困难', value: '非常困难' }, { text: '不困难', value: '不困难' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag :type="getTag(scope.row.level)" disable-transitions>{{scope.row.level}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="prelevel"
              label="预估评级"
              width="100"
              :filters="[{ text: '一般困难', value: '一般困难' }, { text: '非常困难', value: '非常困难' }, { text: '不困难', value: '不困难' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="getTag(scope.row.prelevel)"
                  disable-transitions
                >{{scope.row.prelevel}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="prepersent" label="相似度" sortable></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="success" round @click="updateLevel(scope.row)">一键更正</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <br />
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>正常评级数据区</span>
        </div>
        <div>
          <el-table
            ref="filterTable"
            :data="tableData2"
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
              prop="level"
              label="贫困评级"
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
Vue.component("Frame", frame);
Vue.use(qs);

export default {
  name: "managelist",
  data() {
    return {
      pagetitle: "错评监测",
      tableData: [],
      tableData1: [],
      tableData2: [],
      showResult: false,
      tableLoading: true,
      summary: [
        {
          name: "学生总数",
          number: 0
        },
        {
          name: "正常评级数据",
          number: 0
        },
        {
          name: "存疑评级数据",
          number: 0
        },
        {
          name: "评级符合度",
          number: 0
        }
      ],
      formInline: {
        city: "",
        // sex: "",
        income: 0,
        dq: "",
        ls: "",
        gr: "",
        card: "",
        consume: 0
      },
      result: []
    };
  },
  methods: {
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
    updateLevel(row) {
      this.$axios
        .post(
          "/apife/api/updatepoorlevel",
          qs.stringify({
            username: row.username,
            newlevel: row.prelevel,
            token: localStorage.token
          }),
          {}
        )
        .then(res => {
          if (res.data.error_num != 1) {
            this.$message({
              message: "更正成功：用户评级已更正",
              type: "success"
            });
            this.getPoor();
            this.reviseCardVisible = false;
          } else {
            this.$message.error("更正失败：" + res.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error("更正失败：服务器连接超时");
        });
    },
    async getPoor() {
      this.tableLoading = true;
      this.tableData = [];
      this.tableData1 = [];
      this.tableData2 = [];
      this.summary[0].number = 0;
      this.summary[1].number = 0;
      this.summary[2].number = 0;
      this.summary[3].number = 0;
      var resultTable = [];
      await this.$axios
        .post("/apife/api/chpooragain", {})
        .then(res => {
          resultTable = res.data.result;
        })
        .catch(error => {
          console.log(error);
          this.$message.error("获取失败：服务器连接超时");
        });
      await this.$axios
        .get("/apife/api/getpoor", {})
        .then(res => {
          this.tableData = [];
          for (var i = 0; i < res.data.list.length; i++) {
            var data = {
              username: res.data.list[i].fields.username,
              sex: res.data.list[i].fields.sex ? "男" : "女",
              city: this.getCityLevel(res.data.list[i].fields.city),
              income: res.data.list[i].fields.income,
              dq: res.data.list[i].fields.dq ? "是" : "否",
              ls: res.data.list[i].fields.ls ? "是" : "否",
              gr: res.data.list[i].fields.gr ? "是" : "否",
              card: res.data.list[i].fields.card ? "是" : "否",
              consume: res.data.list[i].fields.consume,
              level: res.data.list[i].fields.level,
              prelevel: resultTable[i][0],
              prepersent: resultTable[i][1].toFixed(2).toString() + "%"
            };
            if (data.level == data.prelevel) {
              this.tableData2.push(data);
              this.summary[1].number = this.summary[1].number + 1;
            } else {
              this.tableData1.push(data);
              this.summary[2].number = this.summary[2].number + 1;
            }
          }
          this.summary[0].number = res.data.list.length;
          this.summary[3].number =
            ((100 * this.summary[1].number) / this.summary[0].number)
              .toFixed(2)
              .toString() + "%";
          this.tableLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.$message.error("获取失败：服务器连接超时");
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
</style>