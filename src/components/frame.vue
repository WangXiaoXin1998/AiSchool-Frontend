<template>
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
        </a> |
        <b>{{title}}</b>
      </div>
      <nobr style="float:right;margin-top:-60px">
        <el-button plain @click="exit" size="small">退出登陆</el-button>
      </nobr>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['1','2','3','4']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>我的主页
            </template>
            <el-link href="M_information.html" target="_self">
              <el-menu-item index="1-1">个人信息</el-menu-item>
            </el-link>
            <el-link href="M_information.html" target="_self">
              <el-menu-item index="1-2">账户安全</el-menu-item>
            </el-link>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>账号管理
            </template>
            <el-link href="M_mAccount.html" target="_self">
              <el-menu-item index="2-1">管理员列表</el-menu-item>
            </el-link>
            <el-link href="M_uAccount.html" target="_self">
              <el-menu-item index="2-2">用户列表</el-menu-item>
            </el-link>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-folder-opened"></i>文件管理
            </template>
            <el-link href="M_mGoods.html" target="_self">
              <!-- 文件组中的任务+用邀请码添加的任务，专指自己需要上传的任务 -->
              <el-menu-item index="3-1">任务列表</el-menu-item>
            </el-link>
            <el-link href="M_mGoods.html" target="_self">
              <!-- 加入的文件组、创建文件组 -->
              <el-menu-item index="3-2">我的文件组</el-menu-item>
            </el-link>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-folder-add"></i>创建管理
            </template>
            <el-link href="M_mGoods.html" target="_self">
              <!-- 用户创建的任务查看及创建任务 -->
              <el-menu-item index="4-1">我的任务</el-menu-item>
            </el-link>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Vue from "vue";
import qs from "qs";
Vue.use(qs);

export default {
  name: "frame",
  data() {
    return {};
  },
  methods: {
    exit() {
      localStorage.clear();
      this.$router.push("login");
    }
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