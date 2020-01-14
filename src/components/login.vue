<template>
  <div id="control">
    <vue-particles
      color="#ccc"
      :particleOpacity="0.7"
      :particlesNumber="200"
      shapeType="circle"
      :particleSize="3"
      linesColor="#dedede"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    ></vue-particles>
    <div class="loginform">
      <el-card class="box-card" shadow="always">
        <div slot="header" class="clearfix">
          <span>
            <b>智慧校园系统 - 登录</b>
          </span>
          <el-button style="float: right; padding: 3px 0" @click="forgetpwd" type="text">忘记密码？</el-button>
        </div>
        <el-form
          hide-required-asterisk
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
          </el-form-item>-->
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
import qs from "qs";
import VueParticles from "vue-particles";
Vue.use(VueParticles);
Vue.use(qs);

export default {
  name: "login",
  data() {
    return {
      loginform: {
        username: "",
        password: ""
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
            .post("apife/api/login", qs.stringify(loginform), {})
            .then(res => {
              if (res.data.error_num == 1) {
                this.$message.error("登录失败：" + res.data.msg);
                return;
              }
              localStorage.clear();
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("username", loginform.username);
              localStorage.setItem("role", res.data.role);
              this.$router.push("index");
            })
            .catch(error => {
              this.$message.error("登录失败：服务器连接超时");
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
