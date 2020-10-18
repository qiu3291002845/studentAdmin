<template>
  <div class="ret">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item prop="email">
        <el-input
          @keyup.enter.native="caches('ruleForm')"
          v-model="ruleForm.email"
          placeholder="请输入输入邮箱账号"
        >
          <i slot="prefix" class="iconfont icon-youxiang"></i>
          <i class="yuankuang" slot="suffix">
            <el-button @click="caches('ruleForm')">发送验证码</el-button>
          </i>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          @keyup.enter.native="submitForm('ruleForm')"
          placeholder="请输入邮箱验证码"
          v-model="code"
        >
          <i slot="prefix" class="iconfont icon-yanzhengma"></i>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import "../../css/iconfont.css";
export default {
  name: "Retrieve",
  data() {
    var validateCode = (rule, value, callback) => {
      let code = sessionStorage.getItem("retCode");
      if (value != code) {
        return callback(new Error("验证码不正确"));
      } else if (code === undefined) {
        return callback(new Error("你还没有获取验证码，请获取验证码后输入"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        email: "",
      },
      validateCode: validateCode,
      code: "",
      rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        code: [{ required: false, message: "请输入邮箱地址", trigger: "blur" }],
      },
      RetId: "",
    };
  },
  methods: {
    submitForm() {
      let code = sessionStorage.getItem("retCode");
      if (this.code == code) {
        this.$router.push({
          name: "RetPass",
          params: {
            id: this.RetId,
          },
        });
        this.ruleForm = {
          email: "",
        };
        this.codeData = "";
        this.resetForm("ruleForm");
        this.code = "";
      } else {
        this.$notify({
          title: "错误",
          message: "验证码错误，请重试",
          type: "warning",
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 请求code验证码
    async sendCode() {
      const { data } = await this.$http.get(
        `/tool/email/${this.ruleForm.email}`
      );
      sessionStorage.setItem("retCode", data.code);
      this.rules.code.push({
        required: true,
        message: "请输入邮箱验证码",
        trigger: "blur",
      });
    },
    // 根据邮箱查询用户
    async caches(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.email();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addrules() {
      const newRulesCode = [
        { required: true, message: "请输入验证码地址", trigger: "blur" },
        {
          validator: this.validateCode,
          trigger: "blur",
        },
      ];
      const newRulesEmail = [
        { required: true, message: "请输入邮箱地址", trigger: "blur" },
        {
          type: "email",
          message: "请输入正确的邮箱地址",
          trigger: ["blur", "change"],
        },
      ];

      this.rules = Object.assign({}, this.rules, {
        email: newRulesEmail,
        code: newRulesCode,
      });
    },
    async email() {
      const { data } = await this.$http.get(
        `/user/email/${this.ruleForm.email}`
      );
      if (data.user !== null) {
        this.RetId = data.user._id;
        this.sendCode();
        this.$message({
          showClose: true,
          message: "邮箱验证码发送成功，请查收并输入验证码",
          type: "success",
        });
        this.addrules();
      } else {
        this.$notify({
          title: "错误",
          message: "没有该用户，请前往注册,或重试",
          type: "warning",
        });
      }
    },
  },
  created() {
    sessionStorage.removeItem("retCode");
  },
};
</script>
<style lang="scss">
.ret {
  .fanhui {
    cursor: pointer;
    position: absolute;
    span {
      font-size: 40px;
      color: #fff;
      font-size: bold;
    }
  }

  .yuankuang {
    position: relative;
    left: -30px;
    margin: 0;
    padding: 0;
    .el-button {
      margin: 0 !important;
      padding: 0 !important;
      background: rgba(0, 0, 0, 0) !important;
      border: 0 !important;
      outline: none;
    }
    span {
      width: 40px;
    }
  }
  h2 {
    color: #fff;
    text-align: center;
    letter-spacing: 5px;
    font-weight: bold;
    span {
      margin: 0 10px;
    }
  }
  .yuankuang {
    position: relative;
    left: -30px;
    margin: 0;
    padding: 0;
    .el-button {
      margin: 0 !important;
      padding: 0 !important;
      background: rgba(0, 0, 0, 0) !important;
      border: 0 !important;
      outline: none;
    }
    span {
      width: 40px;
    }
  }
  .el-form {
    padding: 30px 20px;
    .el-form-item {
      margin: 30px 20px;
      .el-form-item__content {
        margin: 0 !important;
      }
      .el-input {
        box-sizing: content-box;
        input {
          border-radius: 15px;
          height: 43px;
          background: rgba(0, 0, 0, 0);
        }
        i {
          margin-left: 3px;
        }
        .el-input__inner {
          color: #fff;
          &::placeholder {
            color: #fff;
          }
        }
        span {
          color: #fff !important;
        }
      }
      .el-button {
        border-radius: 15px;
        width: 40%;
        margin: 15px;
        color: rgb(255, 255, 255);
      }
      .loginbut {
        line-height: 45px;
        width: 100%;
        font-size: 19px;
        font-weight: bold;
        border: 2px solid rgb(59, 77, 89);
        background: rgba(59, 77, 89, 0.8);
        outline: none;
        transition: all 0.3s;
        span {
          letter-spacing: 5px;
        }
        &:hover {
          transition: all 0.3s;
          color: rgb(255, 255, 255);
          background: rgba(0, 0, 0, 0);
        }
      }
    }
    .el-button {
      margin: 0 10px;
      transition: all 0.3s;
      padding: 10px 18px;
      animation: all 03s;
      border: 2px solid rgb(59, 77, 89);
      background: rgba(59, 77, 89, 0.8);

      a {
        text-decoration: none;
        transition: all 0.3s;
        animation: all 03s;
        color: #fff;
        font-weight: bold;
        letter-spacing: 1px;
      }
      &:hover {
        transition: all 0.3s;
        background: rgba(0, 0, 0, 0);
        a {
          transition: all 0.3s;
          color: #fff;
        }
      }
    }
  }
  .emailCode {
    z-index: 999;
  }
}
</style>