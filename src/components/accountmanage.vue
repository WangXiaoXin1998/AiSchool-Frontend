<template>
  <div id="control">
    <Frame v-bind:pagetitle="pagetitle">
      <div style="text-align:right">
        <el-input v-model="newaccount" placeholder="请输入新增的账号名" style="width:200px"></el-input>
        <el-input v-model="newname" placeholder="请输入用户姓名" style="width:200px"></el-input>
        <el-button type="primary" @click="addAccount">添加账号信息</el-button>
      </div>
      <el-table ref="filterTable" :data="tableData" style="width: 100%" v-loading="tableLoading">
        <el-table-column prop="username" label="用户名" sortable column-key="date"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <!-- <el-table-column prop="role" label="角色"></el-table-column> -->
        <el-table-column
          prop="role"
          label="账户类型"
          :filters="[{ text: '管理员', value: '管理员' }, { text: '用户', value: '用户' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.role === '用户' ? 'success' : 'defalut'"
              disable-transitions
            >{{scope.row.role}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleReset(scope.row)">重置</el-button>
            <el-button
              v-if="scope.row.role!='管理员'"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除</el-button>
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
  name: "accountmanage",
  data() {
    return {
      pagetitle: "账号管理",
      newaccount: "",
      newname: "",
      consumelist: [],
      tableData: [],
      tableLoading: true
    };
  },
  methods: {
    filterTag(value, row) {
      return row.role === value;
    },
    async addAccount() {
      var datatable = {
        accountname: this.newaccount,
        newname: this.newname,
        token: localStorage.token
      };
      await this.$axios
        .post("/apife/api/addaccount", qs.stringify(datatable), {})
        .then(res => {
          if (res.data.error_num != 1) {
            this.$message({
              message: "添加成功：初始密码为用户名",
              type: "success"
            });
          } else {
            this.$message.error("添加失败：" + res.data.msg);
          }
        })
        .catch(error => {
          this.$message.error("添加失败：服务器连接超时");
        });
      this.getAccount();
    },
    async getAccount() {
      await this.$axios
        .post(
          "/apife/api/getaccount",
          qs.stringify({ token: localStorage.token }),
          {}
        )
        .then(res => {
          this.tableData = [];
          for (var i = 0; i < res.data.userlist.length; i++) {
            this.tableData.push({
              username: res.data.userlist[i][0],
              name: res.data.userlist[i][1],
              role: res.data.userlist[i][2] == "1" ? "用户" : "管理员"
            });
          }
          console.log(this.tableData);
        })
        .catch(error => {
          console.log(error);
          this.$message.error("获取失败：服务器连接超时");
        });
      this.tableLoading = false;
    },
    handleReset(row) {
      var datatable = {
        accountname: row.username,
        token: localStorage.token
      };
      this.$axios
        .post("/apife/api/resetaccount", qs.stringify(datatable), {})
        .then(res => {
          if (res.data.error_num != 1) {
            this.$message({
              message: "重置成功：密码已重置为用户名",
              type: "success"
            });
          } else {
            this.$message.error("重置失败：" + res.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error("重置失败：服务器连接超时");
        });
    },
    async handleDelete(row) {
      var datatable = {
        accountname: row.username,
        token: localStorage.token
      };
      await this.$axios
        .post("/apife/api/delaccount", qs.stringify(datatable), {})
        .then(res => {
          if (res.data.error_num != 1) {
            this.$message({
              message: "删除成功：该账户已被删除",
              type: "success"
            });
          } else {
            this.$message.error("删除失败：" + res.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error("删除失败：服务器连接超时");
        });
      this.getAccount();
    }
  },
  mounted() {
    this.getAccount();
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