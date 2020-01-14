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
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>贫困生数据评级</span>
        </div>
        <div>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <!-- <el-form-item label="性别">
              <el-select v-model="formInline.sex" placeholder="请选择性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>-->
            <el-form-item label="城市等级">
              <el-select v-model="formInline.city" placeholder="请选择城市等级">
                <el-option label="一线城市" value="1"></el-option>
                <el-option label="二线城市" value="2"></el-option>
                <el-option label="三线城市" value="3"></el-option>
                <el-option label="四线城市" value="4"></el-option>
                <el-option label="五线城市" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="月均收入">
              <el-input v-model="formInline.income" placeholder="月均收入"></el-input>
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
            <el-form-item label="平均消费">
              <el-input v-model="formInline.consume" placeholder="正餐平均消费金额"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="prePoor">评级</el-button>
          <div v-if="showResult">
            根据已有的训练数据，该生的贫困等级判断情况如下：
            <div v-for="i in result" :key="i">{{i[0]}}：{{i[1].toFixed(2)}}%</div>
          </div>
        </div>
      </el-card>
      <!-- <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>添加训练数据</span>
        </div>
        <div></div>
      </el-card>-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>机器训练的已知数据</span>
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
Vue.component("Frame", frame);
Vue.use(qs);

export default {
  name: "managelist",
  data() {
    return {
      pagetitle: "错评监测",
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
    async getPoor() {
      await this.$axios
        .get("/apife/api/getpoor", {})
        .then(res => {
          // this.$message({
          //   message: "获取成功：已获取最近的消费记录",
          //   type: "success"
          // });
          this.tableData = [];
          for (var i = 0; i < res.data.list.length; i++) {
            this.tableData.push({
              username: res.data.list[i].fields.username,
              sex: res.data.list[i].fields.sex ? "男" : "女",
              city: res.data.list[i].fields.city,
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
    prePoor() {
      var check = [];
      check.push(this.formInline);
      console.log(check);
      this.$axios
        .get("apife/api/checkpoor", { params: { check: check } }, {})
        .then(res => {
          this.result = res.data.result[0];
          console.log(this.result);
          this.showResult = true;
        })
        .catch(error => {
          console.log(error);
          this.$message.error("评级失败：服务器连接超时");
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