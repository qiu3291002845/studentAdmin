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
      <el-form-item label="用户名称" prop="userEmail">
        <el-input v-model="ruleForm.userEmail"></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
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
  name: "chenge",
  data() {
    return {
      ruleForm: {
        userEmail: "",
        password: "",
      },
      rules: {
        userEmail: [
          {
            required: true,
            message: "请输入或邮箱地址",
            trigger: "blur",
          },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            min: 8,
            max: 16,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        userId: "",
      },
    };
  },
  methods: {
    // 查询用户
    async requesUser() {
      const { data } = await this.$http.get(
        `/user/email/${this.ruleForm.userEmail}`
      );
      if (data.user !== null) {
        this.userId = data.user._id;
        console.log(this.userId);
        this.requesLogin();
      } else {
        // 没有user 为空是 没有该用户
        this.$notify({
          title: "错误",
          message: "该邮箱地址未注册，请重新确认",
          type: "warning",
        });
      }
    },
    //发起请求校验密码的api
    async requesLogin() {
      // console.log(this.ruleForm);
      let user = {
        id: this.userId,
        pass: this.ruleForm.password,
      };
      const { data } = await this.$http.post("/user/volidateOldPass", user);
      if (data.statusCode === 200) {
        this.$message({
          message: "恭喜你,校验成功，请输入新密码",
          type: "success",
        });
        this.$emit("chengesend", this.userId);
      } else {
        this.$notify({
          title: "错误",
          message: "密码错误请重试",
          type: "warning",
        });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.requesUser();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    this.ruleForm = {
      userEmail: "",
      password: "",
    };
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