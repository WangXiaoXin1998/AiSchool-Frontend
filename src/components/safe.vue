<template>
  <div id="control">
    <Frame v-bind:pagetitle="pagetitle">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="密码修改" name="revisePWD">
          <el-form
            hide-required-asterisk
            :model="reviseForm"
            status-icon
            :rules="rules"
            ref="reviseForm"
            label-width="120px"
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
            label-width="120px"
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
              <el-button type="primary" @click="onRevisepwd('reviseForm')">提交</el-button>
              <el-button @click="resetForm('reviseForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="设置密保问题" name="setQUE" v-if="!checkQueSign">
          <el-form
            :model="newQAForm"
            status-icon
            :rules="rules"
            ref="newQAForm"
            label-width="140px"
            class="demo-ruleForm"
          >
            <el-form-item label="密保问题一" size="medium" prop="question1">
              <el-input v-model="newQAForm.question1" :placeholder="请输入第一个密保问题" class="input"></el-input>
            </el-form-item>
            <el-form-item label="问题答案一" size="medium" prop="answer1">
              <el-input v-model="newQAForm.answer1" :placeholder="请输入第一个问题答案" class="input"></el-input>
            </el-form-item>
            <el-form-item label="密保问题二" size="medium" prop="question2">
              <el-input v-model="newQAForm.question2" :placeholder="请输入第二个密保问题" class="input"></el-input>
            </el-form-item>
            <el-form-item label="问题答案二" size="medium" prop="answer2">
              <el-input v-model="newQAForm.answer2" :placeholder="请输入第二个问题答案" class="input"></el-input>
            </el-form-item>
            <el-form-item label="密保问题三" size="medium" prop="question3">
              <el-input v-model="newQAForm.question3" :placeholder="请输入第三个密保问题" class="input"></el-input>
            </el-form-item>
            <el-form-item label="问题答案三" size="medium" prop="answer3">
              <el-input v-model="newQAForm.answer3" :placeholder="请输入第三个问题答案" class="input"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSetque('newQAForm')">提交</el-button>
              <el-button @click="resetForm('newQAForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="删除密保问题" name="resetQUE" v-if="checkQueSign">
          <br/>
          <el-form
            :model="answerForm"
            status-icon
            :rules="rules"
            ref="answerForm"
            label-width="140px"
            class="demo-ruleForm"
          >
            <el-form-item label="密保一" size="medium" prop="answer1">
              <el-input
                v-model="answerForm.answer1"
                :placeholder="questionForm.question1"
                class="input"
              ></el-input>
            </el-form-item>
            <el-form-item label="密保二" size="medium" prop="answer2">
              <el-input
                v-model="answerForm.answer2"
                :placeholder="questionForm.question2"
                class="input"
              ></el-input>
            </el-form-item>
            <el-form-item label="密保三" size="medium" prop="answer3">
              <el-input
                v-model="answerForm.answer3"
                :placeholder="questionForm.question3"
                class="input"
              ></el-input>
            </el-form-item>
            <br/>
            <el-form-item>
              <el-button type="primary" @click="onDelque('answerForm')">确认删除</el-button>
              <el-button @click="resetForm('answerForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
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
    var specialcharacter = (rule, value, callback) => {
      var reg = /^.*[#].*$/;
      if (reg.test(value)) {
        callback(new Error("请勿输入特殊字符"));
      } else {
        callback();
      }
    };
    return {
      pagetitle: "账户安全",
      activeName: "revisePWD",
      username: "",
      checkQueSign: false,
      reviseForm: {
        oldpwd: "",
        newpwd: "",
        agapwd: ""
      },
      questionForm: {
        question1: "",
        question2: "",
        question3: ""
      },
      answerForm: {
        answer1: "",
        answer2: "",
        answer3: ""
      },
      newQAForm: {
        question1: "",
        question2: "",
        question3: "",
        answer1: "",
        answer2: "",
        answer3: ""
      },
      rules: {
        question1: [
          { required: true, message: "请输入密保问题", trigger: "blur" },
          { required: true, validator: specialcharacter, trigger: "blur" }
        ],
        question2: [
          { required: true, message: "请输入密保问题", trigger: "blur" },
          { required: true, validator: specialcharacter, trigger: "blur" }
        ],
        question3: [
          { required: true, message: "请输入密保问题", trigger: "blur" },
          { required: true, validator: specialcharacter, trigger: "blur" }
        ],
        answer1: [
          { required: true, message: "请输入问题答案", trigger: "blur" },
          { required: true, validator: specialcharacter, trigger: "blur" }
        ],
        answer2: [
          { required: true, message: "请输入问题答案", trigger: "blur" },
          { required: true, validator: specialcharacter, trigger: "blur" }
        ],
        answer3: [
          { required: true, message: "请输入问题答案", trigger: "blur" },
          { required: true, validator: specialcharacter, trigger: "blur" }
        ],
        oldpwd: [{ required: true, trigger: "blur", message: "请输入旧密码" }],
        newpwd: [{ required: true, validator: validatePass1, trigger: "blur" }],
        agapwd: [{ required: true, validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onRevisepwd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              "/apife/api/forgetpwd",
              qs.stringify({
                passwordOld: this.reviseForm.oldpwd,
                passwordNew: this.reviseForm.agapwd,
                token: localStorage.token
              }),
              {}
            )
            .then(res => {
              if (res.data.error_num == 1) {
                this.$message.error("修改失败：" + res.data.msg);
                return;
              } else {
                this.$message({
                  message: "修改成功：请牢记新密码",
                  type: "success"
                });
              }
              this.resetForm("reviseForm");
            })
            .catch(error => {
              this.$message.error("修改失败：服务器连接超时");
            });
        }
      });
    },
    onDelque(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              "/apife/api/del_question",
              qs.stringify({
                answer1: this.answerForm.answer1,
                answer2: this.answerForm.answer2,
                answer3: this.answerForm.answer3,
                token: localStorage.token
              }),
              {}
            )
            .then(res => {
              if (res.data.error_num == 1) {
                this.$message.error("删除失败：" + res.data.msg);
                return;
              } else {
                this.$message({
                  message: "删除成功：密保删除请注意密码安全",
                  type: "success"
                });
                this.resetForm(formName)
                this.checkQue();
                this.activeName = "revisePWD"
              }
            })
            .catch(error => {
              this.$message.error("删除失败：服务器连接超时");
            });
        }
      });
    },
    onSetque(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              "/apife/api/set_question",
              qs.stringify({
                question1: this.newQAForm.question1,
                question2: this.newQAForm.question2,
                question3: this.newQAForm.question3,
                answer1: this.newQAForm.answer1,
                answer2: this.newQAForm.answer2,
                answer3: this.newQAForm.answer3,
                token: localStorage.token
              }),
              {}
            )
            .then(res => {
              if (res.data.error_num == 1) {
                this.$message.error("设置失败：" + res.data.msg);
                return;
              } else {
                this.$message({
                  message: "设置成功：请牢记密保问题",
                  type: "success"
                });
                this.resetForm(formName)
                this.checkQue();
                this.activeName = "revisePWD"
              }
            })
            .catch(error => {
              this.$message.error("设置失败：服务器连接超时");
            });
        }
      });
    },
    checkQue() {
      this.$axios
        .post(
          "/apife/api/check_question",
          qs.stringify({
            token: localStorage.token
          }),
          {}
        )
        .then(res => {
          if (res.data.error_num == 1) {
            this.$message.error("获取失败：" + res.data.msg);
            return;
          } else {
            if (res.data.haveQue == 1) {
              this.checkQueSign = true;
              this.questionForm.question1 = res.data.question1;
              this.questionForm.question2 = res.data.question2;
              this.questionForm.question3 = res.data.question3;
            } else {
              this.checkQueSign = false;
            }
          }
        })
        .catch(error => {
          this.$message.error("获取失败：服务器连接超时");
        });
    }
  },
  mounted() {
    this.checkQue();
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