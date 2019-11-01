<template>
  <div>
    <Frame :pagetitle="pagetitle">
      <el-row style="min-width:1000px">
        <el-col :span="3">
          <br />
        </el-col>
        <el-col :span="7">
          <div class="demo-basic--circle">
            <el-avatar :size="230">
              <nobr style="font-size:60px">USER</nobr>
            </el-avatar>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="bigtitle">{{timeduring}}，{{user.username?user.username:'未登录用户'}}！</div>
          <br />
          <br />
          <i class="el-icon-user-solid"></i>
          &ensp;用户名称：{{user.username}}
          <br />
          <br />
          <i class="el-icon-s-shop"></i>
          &ensp;所属组织：{{user.group}}
          <br />
          <br />
          <i class="el-icon-s-order"></i>
          &ensp;待提交任务：{{user.mission}}个
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
        group: "",
        mission: 0
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
          "/api/user/get_username.do",
          qs.stringify({ token: localStorage.token }),
          {}
        )
        .then(res => {
          if (res.data.status == 1) {
            this.$message.error("获取失败：" + res.data.msg);
            return;
          }
          this.user.username=res.data.data.username;
          this.user.group=res.data.data.group;
          this.user.mission=res.data.data.mission;
        })
        .catch(error => {
          this.$message.error("获取失败：服务器连接超时");
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