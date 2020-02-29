<template>
  <div>
    <Frame :pagetitle="pagetitle">
      <br />
      <br />
      <el-row style="min-width:1000px">
        <el-col :span="3">
          <br />
        </el-col>
        <el-col :span="7">
          <div class="demo-basic--circle">
            <el-avatar :size="230">
              <nobr style="font-size:60px">{{user.role==1?'USER':'ADMIN'}}</nobr>
            </el-avatar>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="bigtitle">{{timeduring}}，{{user.name?user.name:'未登录用户'}}！</div>
          <br />
          <br />
          <i class="el-icon-user-solid"></i>
          &ensp;用户账号：{{user.username}}
          <br />
          <br />
          <i class="el-icon-s-shop"></i>
          &ensp;所属组织：{{user.org}}
          <br />
          <br />
          <i class="el-icon-phone"></i>
          &ensp;手机号码：{{user.phone}}
          <el-button @click="openRevise()" type="text">{{user.phone?'修改':'绑定'}}</el-button>
        </el-col>
      </el-row>
    </Frame>
  </div>
</template>

<script>
import Vue from "vue";
import qs from "qs";
import Frame from "./frame.vue";
Vue.component("Frame", Frame);
Vue.use(qs);

export default {
  name: "index",
  data() {
    return {
      pagetitle: "个人信息",
      timeduring: "",
      user: {
        username: "",
        org: "",
        role: "",
        name: "",
        phone: "",
      }
    };
  },
  methods: {
    getTime() {
      var hour = new Date().getHours();
      if (hour < 6) {
        this.timeduring = "凌晨好";
      } else if (hour < 12) {
        this.timeduring = "上午好";
      } else if (hour < 17) {
        this.timeduring = "下午好";
      } else {
        this.timeduring = "晚上好";
      }
    },
    getData() {
      this.$axios
        .post(
          "/apife/api/getuserinfor",
          qs.stringify({ token: localStorage.token }),
          {}
        )
        .then(res => {
          if (res.data.error_num == 1) {
            this.$message.error("获取失败：" + res.data.msg);
            return;
          }
          this.user.username = localStorage.username;
          this.user.org = res.data.org;
          this.user.name = res.data.name;
          this.user.phone = res.data.phone;
          this.user.role = res.data.role;
        })
        .catch(error => {
          this.$message.error("获取失败：服务器连接超时");
        });
    },
    openRevise() {
      this.$prompt("用于接收异常操作短信提醒", "请输入手机号码", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^1[3456789]\d{9}$/,
        inputErrorMessage: "手机号格式不正确"
      }).then(({ value }) => {
        this.$axios
          .post(
            "/apife/api/changephone",
            qs.stringify({ token: localStorage.token, phone: value }),
            {}
          )
          .then(res => {
            if (res.data.error_num == 1) {
              this.$message.error("修改失败：" + res.data.msg);
              return;
            }
            this.$message({
              type: "success",
              message: "修改成功：手机号更新为" + value
            });
            this.user.phone = value;
          })
          .catch(error => {
            this.$message.error("修改失败：服务器连接超时");
          });
      });
    }
  },
  mounted() {
    this.getTime();
    this.getData();
  }
};
</script>

<style>
.bigtitle {
  font-size: 25px;
  font-weight: 500;
}
</style>