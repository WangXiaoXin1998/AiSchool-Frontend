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
          <span>贫困信息维护</span>
          <el-button
            style="float: right"
            round
            size="small"
            type="primary"
            @click="addCardVisible=true;resetForm('addCardForm')"
          >添加评级数据</el-button>
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
            <el-table-column label="操作" width="150px">
              <template slot-scope="scope">
                <el-button size="mini" round @click="showEdit(scope.row)">编辑</el-button>
                <el-button size="mini" round type="danger" @click="DeletePoor(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-dialog
        title="添加评级数据"
        :visible.sync="addCardVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>
          <el-form
            :model="addCardForm"
            :rules="CardRules"
            label-width="80px"
            ref="addCardForm"
            class="demo-addCardForm"
            size="small"
          >
            <el-form-item label="用户名" class="inputtable" prop="username">
              <el-input v-model="addCardForm.username"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="addCardForm.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="城市等级" prop="city">
              <el-select v-model="addCardForm.city" placeholder="请选择城市等级">
                <el-option label="一线城市" value="1"></el-option>
                <el-option label="二线城市" value="2"></el-option>
                <el-option label="三线城市" value="3"></el-option>
                <el-option label="四线城市" value="4"></el-option>
                <el-option label="五线城市" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单亲家庭" prop="dq">
              <el-radio-group v-model="addCardForm.dq">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="烈士子女" prop="ls">
              <el-radio-group v-model="addCardForm.ls">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="孤儿家庭" prop="gr">
              <el-radio-group v-model="addCardForm.gr">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="建档立卡" prop="card">
              <el-radio-group v-model="addCardForm.card">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="月均收入" class="inputtable" prop="income">
              <el-input v-model.number="addCardForm.income"></el-input>
            </el-form-item>
            <el-form-item label="平均消费" class="inputtable" prop="consume">
              <el-input v-model.number="addCardForm.consume"></el-input>
            </el-form-item>
            <el-form-item label="贫困评级" prop="level">
              <el-radio-group v-model="addCardForm.level">
                <el-radio label="不困难"></el-radio>
                <el-radio label="一般困难"></el-radio>
                <el-radio label="非常困难"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCardVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addCardForm')">提 交</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="修改评级数据"
        :visible.sync="reviseCardVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>
          <el-form
            :model="addCardForm"
            :rules="CardRules"
            ref="addCardForm"
            label-width="80px"
            class="demo-addCardForm"
            size="small"
          >
            <el-form-item label="用户名" class="inputtable" prop="username">{{addCardForm.username}}</el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="addCardForm.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="城市等级" prop="city">
              <el-select v-model="addCardForm.city" placeholder="请选择城市等级">
                <el-option label="一线城市" value="1"></el-option>
                <el-option label="二线城市" value="2"></el-option>
                <el-option label="三线城市" value="3"></el-option>
                <el-option label="四线城市" value="4"></el-option>
                <el-option label="五线城市" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单亲家庭" prop="dq">
              <el-radio-group v-model="addCardForm.dq">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="烈士子女" prop="ls">
              <el-radio-group v-model="addCardForm.ls">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="孤儿家庭" prop="gr">
              <el-radio-group v-model="addCardForm.gr">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="建档立卡" prop="card">
              <el-radio-group v-model="addCardForm.card">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="月均收入" class="inputtable" prop="income">
              <el-input v-model.number="addCardForm.income"></el-input>
            </el-form-item>
            <el-form-item label="平均消费" class="inputtable" prop="consume">
              <el-input v-model.number="addCardForm.consume"></el-input>
            </el-form-item>
            <el-form-item label="贫困评级" prop="level">
              <el-radio-group v-model="addCardForm.level">
                <el-radio label="不困难"></el-radio>
                <el-radio label="一般困难"></el-radio>
                <el-radio label="非常困难"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCardVisible = false">取 消</el-button>
          <el-button type="primary" @click="EditPoor('addCardForm')">提 交</el-button>
        </span>
      </el-dialog>
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
      addCardForm: {
        username: "",
        sex: "",
        city: "",
        consume: "",
        income: "",
        ls: "",
        gr: "",
        dq: "",
        card: "",
        level: ""
      },
      CardRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        city: [
          { required: true, message: "请选择城市等级", trigger: "change" }
        ],
        consume: [
          { required: true, message: "请输入平均消费", trigger: "change" }
        ],
        income: [
          { required: true, message: "请输入月均收入", trigger: "change" }
        ],
        ls: [
          { required: true, message: "请选择是否烈士家庭", trigger: "change" }
        ],
        gr: [
          { required: true, message: "请选择是否孤儿家庭", trigger: "change" }
        ],
        dq: [
          { required: true, message: "请选择是否单亲家庭", trigger: "change" }
        ],
        card: [
          { required: true, message: "请选择是否建档立卡", trigger: "change" }
        ],
        level: [
          { required: true, message: "请选择困难等级", trigger: "change" }
        ]
      },
      pagetitle: "信息维护",
      tableData: [],
      addCardVisible: false,
      reviseCardVisible: false,
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
          this.summary[1].number = 0;
          this.summary[2].number = 0;
          this.summary[3].number = 0;
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
    showEdit(row) {
      this.reviseCardVisible = true;
      this.addCardForm.username = row.username;
      this.addCardForm.sex = row.sex == "男" ? "1" : "0";
      this.addCardForm.gr = row.gr == "是" ? "1" : "0";
      this.addCardForm.ls = row.ls == "是" ? "1" : "0";
      this.addCardForm.dq = row.dq == "是" ? "1" : "0";
      this.addCardForm.card = row.card == "是" ? "1" : "0";
      this.addCardForm.consume = row.consume;
      this.addCardForm.income = row.income;
      this.addCardForm.city = row.city;
      this.addCardForm.level = row.level;
      console.log(this.addCardForm);
    },
    EditPoor(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var reviseForm = this.addCardForm;
          reviseForm.city = this.translateCityLevel(reviseForm.city);
          console.log(reviseForm);
          this.$axios
            .post(
              "/apife/api/updatepoordata",
              qs.stringify({
                reviseForm: reviseForm,
                token: localStorage.token
              }),
              {}
            )
            .then(res => {
              if (res.data.error_num != 1) {
                this.$message({
                  message: "修改成功：用户数据已修改",
                  type: "success"
                });
                this.getPoor();
                this.reviseCardVisible = false;
              } else {
                this.$message.error("修改失败：" + res.data.msg);
              }
            })
            .catch(error => {
              console.log(error);
              this.$message.error("修改失败：服务器连接超时");
            });
        } else {
          return false;
        }
      });
    },
    DeletePoor(row) {
      this.$confirm("确定删除用户" + row.username + "的所有信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(
              "/apife/api/delpoordata",
              qs.stringify({
                username: row.username,
                token: localStorage.token
              }),
              {}
            )
            .then(res => {
              if (res.data.error_num != 1) {
                this.$message({
                  message: "删除成功：用户数据已删除",
                  type: "success"
                });
                this.getPoor();
              } else {
                this.$message.error("删除失败：" + res.data.msg);
              }
            })
            .catch(error => {
              console.log(error);
              this.$message.error("删除失败：服务器连接超时");
            });
        })
        .catch(() => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              "/apife/api/addpoordata",
              qs.stringify({
                addform: this.addCardForm,
                token: localStorage.token
              }),
              {}
            )
            .then(res => {
              if (res.data.error_num != 1) {
                this.$message({
                  message: "添加成功：用户数据已新增",
                  type: "success"
                });
                this.getPoor();
                this.addCardVisible = false;
              } else {
                this.$message.error("添加失败：" + res.data.msg);
              }
            })
            .catch(error => {
              console.log(error);
              this.$message.error("添加失败：服务器连接超时");
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
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

.inputtable {
  width: 60%;
}
</style>