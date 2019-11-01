<template>
  <div id="control">
    <Frame v-bind:pagetitle="pagetitle">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="密码修改" name="revisePWD">
          <el-form
            hide-required-asterisk="true"
            :model="reviseForm"
            status-icon
            :rules="rules"
            ref="reviseForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="用户名"
              class="input"
              size="medium"
              prop="oldpwd"
              autocomplete="off"
            >{{username}}</el-form-item>
          </el-form>
          <el-form
            :model="reviseForm"
            status-icon
            :rules="rules"
            ref="reviseForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="旧密码" class="input" size="medium" prop="oldpwd" autocomplete="off">
              <el-input
                type="password"
                v-model="reviseForm.oldpwd"
                placeholder="请输入密码"
                class="input"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" class="input" size="medium" prop="newpwd" autocomplete="off">
              <el-input
                type="password"
                v-model="reviseForm.newpwd"
                placeholder="请输入密码"
                class="input"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item
              label="请再输一次"
              class="input"
              size="medium"
              prop="agapwd"
              autocomplete="off"
            >
              <el-input
                type="password"
                v-model="reviseForm.agapwd"
                placeholder="请再次输入密码"
                class="input"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onRevisepwd('reviseForm')">提交修改</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="设置密保问题" name="setQUE">徐赫洋nb！</el-tab-pane>
        <el-tab-pane label="重置密保问题" name="resetQUE">徐赫洋nb+1！</el-tab-pane>
      </el-tabs>
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
  name: "safe",
  data() {
    var validatePass1 = (rule, value, callback) => {
      var reg = /^[0-9A-Za-z]{6,20}$/;
      if (value == this.reviseForm.oldpwd) {
        callback(new Error("新密码与旧密码不能相同"));
      }
      if (!reg.test(value)) {
        callback(new Error("密码必须为6-20位的数字或字母"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.reviseForm.newpwd) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      pagetitle: "账户安全",
      activeName: "revisePWD",
      username: "",
      reviseForm: {
        oldpwd: "",
        newpwd: "",
        agapwd: ""
      },
      rules: {
        oldpwd: [{ required: true, trigger: "blur", message: "请输入旧密码" }],
        newpwd: [{ required: true, validator: validatePass1, trigger: "blur" }],
        agapwd: [{ required: true, validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    onRevisepwd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              "/api/user/reset_password.do",
              qs.stringify({
                passwordOld: this.reviseForm.oldpwd,
                passwordNew: this.reviseForm.agapwd,
                token: localStorage.token
              }),
              {}
            )
            .then(res => {
              if (res.data.status == 1) {
                this.$message.error("修改失败：" + res.data.msg);
                return;
              } else {
                this.$message({
                  message: "修改成功：请牢记新密码",
                  type: "success"
                });
              }
            })
            .catch(error => {
              this.$message.error("修改失败：服务器连接超时");
            });
        }
      });
    }
  },
  mounted() {
    this.username = localStorage.username;
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

.input {
  width: 300px;
}
</style>