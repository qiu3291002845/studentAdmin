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
      <el-form-item label="昵称" prop="name">
        <el-input
          @keyup.enter.native="submitForm('ruleForm')"
          v-model="ruleForm.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input
          @keyup.enter.native="submitForm('ruleForm')"
          v-model="ruleForm.userName"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          @keyup.enter.native="submitForm('ruleForm')"
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          @keyup.enter.native="submitForm('ruleForm')"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址" prop="email">
        <el-input
          v-model="ruleForm.email"
          @keyup.enter.native="submitForm('ruleForm')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >注册</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Reg",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value.search("@") > 0) {
        callback(new Error("用户名中不允许有特殊符号"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        userName: "",
        pass: "",
        checkPass: "",
        email: "",
      },
      role: "",
      rules: {
        name: [
          { required: true, message: "请输入用户名昵", trigger: "blur" },
          {
            min: 1,
            max: 12,
            message: "长度在 1 到 12 个字符",
            trigger: "blur",
          },
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 4,
            max: 16,
            message: "长度在 4 到 16 个字符",
            trigger: "blur",
          },
          {
            validator: validateUsername,
            trigger: "blur",
          },
        ],
        pass: [
          {
            required: true,
            min: 6,
            max: 16,
            message: "请输入密码",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
        checkPass: [
          {
            required: true,
            min: 6,
            max: 16,
            message: "请输入确认密码",
            trigger: "blur",
          },
          { validator: validatePass2, trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    // 动态获取role的值
    async obtainRole() {
      try {
        const { data } = await this.$http.get("/role");
        data.data.map((item) => {
          if (item.type === 0 && item.purview !== []) {
            let pur = true;
            for (let rous in item.purview) {
              if (item.purview[rous] === 1) {
                pur = false;
              }
            }
            if (pur) {
              this.role = item._id;
            }
          }
        });
      } catch (error) {
        this.$message.error("获取失败请刷新重试" + this.error.name);
      }
    },
    // 请求邮箱验证接口
    async sendEmailCode() {
      try {
        const { data } = await this.$http.get(
          `/tool/email/${this.ruleForm.email}`
        );
        sessionStorage.setItem("regCode", data.code);
      } catch (error) {
        this.$message.error("邮箱验证码获取失败，请重试" + this.error);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let RegForm = {
            username: this.ruleForm.userName,
            password: this.ruleForm.pass,
            avatar: "https://czh1010.oss-cn-beijing.aliyuncs.com/avatar/1.gif",
            name: this.ruleForm.name,
            email: this.ruleForm.email,
            role: this.role, // 动态获取role值,
          };

          this.sendEmailCode();
          this.$emit("regEmailDrArawer", RegForm);
          this.resetForm("ruleForm");
          
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    this.obtainRole(); //动态获取角色内容
    sessionStorage.removeItem("regCode");
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
.emailCode {
  z-index: 999;
}
</style>