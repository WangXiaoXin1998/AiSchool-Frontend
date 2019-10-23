<template>
  <div id="control">
    <bglizi></bglizi>
    <div class="pwdform">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            <b>CMC文件云</b>
          </span>
          <el-button style="float: right; padding: 3px 0" @click="relogin" type="text">返回登录</el-button>
        </div>
        <el-steps :active="step" align-center finish-status="success">
          <el-step title="填写信息"></el-step>
          <el-step title="验证密保"></el-step>
          <el-step title="设置密码"></el-step>
        </el-steps>
        <div class="form0" v-if="step==0">
          <el-form
            hide-required-asterisk="true"
            :model="pwdform0"
            status-icon
            :rules="rules"
            ref="pwdform0"
            label-width="140px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" size="medium" prop="username">
              <el-input v-model="pwdform0.username" placeholder="请输入用户名" class="input"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="character">
              <el-radio-group v-model="pwdform0.character" class="chooseType">
                <el-radio label="用户"></el-radio>
                <el-radio label="管理员"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>

        <div class="form1" v-if="step==1">
          <el-form
            hide-required-asterisk="true"
            :model="pwdform1"
            status-icon
            :rules="rules"
            ref="pwdform1"
            label-width="140px"
            class="demo-ruleForm"
          >
            <el-form-item label="密保一" size="medium" prop="answer1">
              <el-input v-model="pwdform1.answer1" :placeholder="pwdform1.question1" class="input"></el-input>
            </el-form-item>
            <el-form-item label="密保二" size="medium" prop="answer2">
              <el-input v-model="pwdform1.answer2" :placeholder="pwdform1.question2" class="input"></el-input>
            </el-form-item>
            <el-form-item label="密保三" size="medium" prop="answer3">
              <el-input v-model="pwdform1.answer3" :placeholder="pwdform1.question3" class="input"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div class="form2" v-if="step==2">
          <el-form
            hide-required-asterisk="true"
            :model="pwdform2"
            status-icon
            :rules="rules"
            ref="pwdform2"
            label-width="140px"
            class="demo-ruleForm"
          >
            <el-form-item label="新密码" size="medium" prop="password" autocomplete="off">
              <el-input
                type="password"
                v-model="pwdform2.newpwd"
                placeholder="请输入密码"
                class="input"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="再输一次" size="medium" prop="password" autocomplete="off">
              <el-input
                type="password"
                v-model="pwdform2.agapwd"
                placeholder="请再次输入密码"
                class="input"
                show-password
              ></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div class="form3" v-if="step==3">
          <br />密码重置成功
          <div class="des">3秒后跳转至<el-button type="text" @click="relogin()">登录</el-button>界面</div>
        </div>

        <div class="button" v-if="step<3">
          <el-button @click="resetForm('pwdform'+step)">重置</el-button>
          <el-button type="primary" @click="submit('pwdform'+step)">{{!(step>1)?'下一步':'确定'}}</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import bglizi from "./bglizi.vue";
Vue.component("bglizi", bglizi);

export default {
  name: "forgetpwd",
  data() {
    return {
      step: 0,
      pwdform0: {
        username: "",
        character: "用户"
      },
      pwdform1: {
        question1: "11111？",
        question2: "22222？",
        question3: "33333？",
        answer1: "",
        answer2: "",
        answer3: ""
      },
      pwdform2: {
        newpwd: "",
        agapwd: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        character: [{ required: true, message: "请选择角色", trigger: "blur" }],
        answer1: [
          { required: true, message: "请输入问题答案", trigger: "blur" }
        ],
        answer2: [
          { required: true, message: "请输入问题答案", trigger: "blur" }
        ],
        answer3: [
          { required: true, message: "请输入问题答案", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit(formName) {
      if(this.step==2){
          setTimeout(() => {
            this.relogin()
          }, 3000);
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.step = this.step + 1;
          this.pwdform.answer1 = "";
          this.pwdform.answer2 = "";
          this.pwdform.answer3 = "";
        }
      });
      return;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var pwdform = {
            username: this.pwdform.username,
            password: this.pwdform.password
          };
          this.$axios
            .post("/api/user/login.do", qs.stringify(loginform), {})
            .then(res => {
              console.log(res);
              localStorage.clear();
              sessionStorage.clear();
              const token = res.data.token;
              const User = res.data.user;
            })
            .catch(error => {
              if (error.response.hasOwnProperty("status")) {
                switch (error.response.status) {
                  case 400:
                    this.$notify("登录失败：账号不存在");
                    break;
                  case 401:
                    this.$notify("登录失败：账号或密码错误");
                    break;
                  case 403:
                    this.$notify("登录失败：该账号已被禁止登陆");
                    break;
                  case 404:
                    this.$notify("登录失败：账号不存在");
                    break;
                  case 500:
                    this.$notify("登录失败：服务器内部错误");
                    break;
                  default:
                    this.$notify("登录失败：服务器未知异常");
                }
                this.changestate(false);
                return;
              } else {
                this.$notify("登录失败：服务器通信异常");
                this.changestate(false);
              }
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    relogin() {
      this.$router.push("../login");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.background {
  z-index: -1;
}

.input {
  width: 230px;
}

.pwdform {
  position: fixed;
  top: 10%;
  left: 50%;
  width: 500px;
  margin-left: -300px;
}

.box-card {
  width: 500px;
  height: 400px;
}

.form0 {
  margin-top: 50px;
}

.form1 {
  margin-top: 25px;
}

.form2 {
  margin-top: 50px;
}

.form3 {
  margin-top: 30px;
  text-align: center;
  font-size: 20px;
}

.des {
  font-size: 14px;
}

.button {
  left: 175px;
  position: absolute;
  bottom: 20px;
}
</style>