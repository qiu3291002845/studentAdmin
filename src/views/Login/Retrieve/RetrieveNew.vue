<template>
  <div class="RegEmailCode">
    <div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-button @click="reg('ruleForm')">确认新密码</el-button>
  </div>
</template>
<script>
export default {
  props: ["RetId"],
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

    return {
      ruleForm: {
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [
          {
            required: true,
            min: 8,
            max: 16,
            message: "请输入密码",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
        checkPass: [
          {
            required: true,
            min: 8,
            max: 16,
            message: "请输入确认密码",
            trigger: "blur",
          },
          { validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    async sendUserPass() {
      let us = {
        id: this.RetId,
        pass: this.ruleForm.pass,
      };
      const { data } = await this.$http.post("/user/updatePass", us);

      this.$notify({
        title: "成功",
        message: data.success,
        type: "success",
      });
      this.$emit("retShutDown");
    },
    reg(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.RetId) {
            this.sendUserPass();
          } else {
            console.log("1111");
          }
        } else {
          this.$notify({
            title: "错误",
            message: "请输入正规密码",
            type: "warning",
          });
          return false;
        }
      });
    },
  },

  created() {
    this.ruleForm = {
      pass: "",
      checkPass: "",
    };
  },
};
</script>
<style lang="scss" scoped>
.RegEmailCode {
  padding: 20px 30px;
}
</style>