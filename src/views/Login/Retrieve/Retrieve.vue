<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="邮箱地址" prop="email">
        <el-input
          @keyup.enter.native="reg('ruleForm')"
          v-model="ruleForm.email"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="reg('ruleForm')">立即发送验证码</el-button>
      </el-form-item>

      <el-form-item label="验证码">
        <el-input
          @keyup.enter.native="submitForm('ruleForm')"
          v-model="code"
        ></el-input>
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
export default {
  name: "Retrieve",
  data() {
    return {
      ruleForm: {
        userName: "",
        email: "",
      },
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
      },
      RetId: "",
    };
  },
  methods: {
    submitForm() {
      let code = sessionStorage.getItem("retCode");
      if (this.code == code) {
        this.$emit("retsendbool", this.RetId);
        this.ruleForm = {
          userName: "",
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
    },
    // 根据邮箱查询用户
    async caches() {
      const { data } = await this.$http.get(
        `/user/email/${this.ruleForm.email}`
      );
      if (data.user !== null) {
        this.RetId = data.user._id;
        this.sendCode();
      } else {
        this.$notify({
          title: "错误",
          message: "没有该用户，请前往注册,或重试",
          type: "warning",
        });
      }
    },
    reg(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.caches();
        } else {
          this.$notify({
            title: "错误",
            message: "请输入正确的邮箱地址",
            type: "warning",
          });
          return false;
        }
      });
    },
  },
  created() {
    sessionStorage.removeItem("retCode");
  },
};
</script>
<style lang="scss" scoped>
.el-form {
  padding: 20px 40px;
  .el-form-item {
    .el-input {
      .el-input__inner {
        border-radius: 15px;
      }
    }
  }
}
</style>