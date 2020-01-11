<template>
  <div class="frame">
    <el-container>
      <el-header
        style="background:white;border-bottom-style:groove;border-bottom-width: 0.8px;height:0px"
      >
        <div style="margin-top:-60px">
          <a
            href
            onClick="javascript:this.$router.go(-1);"
            target="_self"
            style="text-decoration:none;color:black"
          >
            <i class="el-icon-arrow-left"></i> 返回
          </a>&nbsp;|&nbsp;
          <b>{{pagetitle}}</b>
        </div>
        <nobr style="float:right;margin-top:-60px">
          <el-button plain @click="exit" size="small">退出登陆</el-button>
        </nobr>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-openeds="['1','2','3','4']">
            <el-submenu index="1" v-if="role">
              <template slot="title">
                <i class="el-icon-user-solid"></i>我的主页
              </template>
              <el-link @click="goto('index')" target="_self">
                <el-menu-item index="1-1">个人信息</el-menu-item>
              </el-link>
              <el-link @click="goto('safe')" target="_self">
                <el-menu-item index="1-2">账户安全</el-menu-item>
              </el-link>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>用户功能
              </template>
              <el-link @click="goto('consume')" target="_self">
                <el-menu-item index="2-1">消费监控</el-menu-item>
              </el-link>
              <el-link @click="goto('yearlybill')" target="_self">
                <el-menu-item index="2-2">年度账单</el-menu-item>
              </el-link>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-folder-opened"></i>评级功能
              </template>
              <el-link @click="goto('poorlevel')" target="_self">
                <!-- 文件组中的任务+用邀请码添加的任务，专指自己需要上传的任务 -->
                <el-menu-item index="3-1">贫困评级</el-menu-item>
              </el-link>
              <el-link @click="goto('excellentlevel')" target="_self">
                <!-- 加入的文件组、创建文件组 -->
                <el-menu-item index="3-2">评优评级</el-menu-item>
              </el-link>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <slot></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Vue from "vue";
import qs from "qs";
Vue.use(qs);

export default {
  name: "frame",
  props: ["pagetitle"],
  data() {
    return {
      pagetlitle: "",
      token: "",
      role: 0
    };
  },
  methods: {
    goto(router) {
      this.$router.push(router);
    },
    exit() {
      this.$axios
        .post(
          "/apifes/user/logout.do",
          qs.stringify({ token: localStorage.token }),
          {}
        )
        .then(res => {
          if (res.data.status == 1) {
            this.$message.error("登出失败：" + res.data.msg);
            return;
          }
          this.$message({
            message: "登出成功：您已安全退出",
            type: "success"
          });
        })
        .catch(error => {
          // this.$message.error("登出失败：服务器连接超时");
          return;
        });
      this.toLogin();
    },
  },
  mounted() {
    if (!localStorage["token"]) {
      this.toLogin();
    }
    this.token = localStorage.token;
    this.role = localStorage.role;
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