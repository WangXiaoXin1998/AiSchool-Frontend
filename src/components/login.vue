<template>
  <div id="control">
    <bglizi></bglizi>
    <div class="loginform">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            <b>CMC文件云</b>
          </span>
          <el-button style="float: right; padding: 3px 0" @click="forgetpwd" type="text">忘记密码？</el-button>
        </div>
        <el-form
          hide-required-asterisk="true"
          :model="loginform"
          status-icon
          :rules="rules"
          ref="loginform"
          label-width="70px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" size="medium" prop="username">
            <el-input v-model="loginform.username" placeholder="请输入用户名" class="input"></el-input>
          </el-form-item>
          <el-form-item label="密码" size="medium" prop="password" autocomplete="off">
            <el-input
              type="password"
              v-model="loginform.password"
              placeholder="请输入密码"
              class="input"
              show-password
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="类型" prop="character">
            <center>
              <el-radio-group v-model="loginform.character" class="chooseType">
                <el-radio label="用户"></el-radio>
                <el-radio label="管理员"></el-radio>
              </el-radio-group>
            </center>
          </el-form-item> -->
        </el-form>
        <center>
          <el-button type="primary" @click="submitForm('loginform')">登录</el-button>
          <el-button @click="resetForm('loginform')">重置</el-button>
        </center>
      </el-card>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import bglizi from "./bglizi.vue";
import qs from 'qs';
Vue.component("bglizi", bglizi);
Vue.use(qs);

export default {
  name: "login",
  data() {
    return {
      loginform: {
        username: "",
        password: "",
        // character: "用户"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        character: [{ required: true, message: "请选择角色", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var loginform = {
            username: this.loginform.username,
            password: this.loginform.password
          };
          this.$axios
            .post("/api/user/login.do", qs.stringify(loginform), {})
            .then(res => {
              if (res.data.status == 1) {
                this.$message.error("登录失败：" + res.data.msg);
                return;
              }
              console.log(res)
              localStorage.clear();
              localStorage.setItem('token', res.data.msg)
							localStorage.setItem('username', loginform.password)
              localStorage.setItem('role', res.data.data)
              this.$router.push("index")
            })
            .catch(error => {
              this.$message.error("登录失败：服务器未知异常");
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    forgetpwd() {
      this.$router.push("forgetpwd");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.background {
  z-index: -1;
}

.loginform {
  position: fixed;
  top: 20%;
  left: 50%;
  width: 400px;
  margin-left: -200px;
}

.input {
  width: 275px;
}

.chooseType {
  margin-top: 10.5px;
}

.box-card {
  width: 400px;
}
</style>
