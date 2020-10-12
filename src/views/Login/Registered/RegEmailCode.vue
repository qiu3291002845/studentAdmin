<template>
  <div class="RegEmailCode">
    邮箱验证码：<el-input
      @keyup.enter.native="reg"
      v-model="input"
      placeholder="请输入验证码"
    ></el-input>
    <el-button @click="reg">确认注册</el-button>
  </div>
</template>
<script>
export default {
  props: ["regForm"],
  data() {
    return {
      input: "",
    };
  },
  methods: {
    // 请求注册接口
    async createrUser() {
      try {
        const { data } = await this.$http.post("/user", this.regForm);
        if (data.statusCode === 200) {
          this.$notify({
            title: "成功",
            message: "注册成功，请登录",
            type: "success",
          });
          this.$emit("regEmailSend");
        } else {
          if (data.error === "username") {
            this.$notify({
              title: "错误",
              message: "用户名被占用，请重新输入",
              type: "warning",
            });
          } else if (data.error === "email") {
            this.$notify({
              title: "错误",
              message: "邮箱被占用，请重新输入",
              type: "warning",
            });
          } else {
            this.$notify({
              title: "错误",
              message: "错误请重新注册",
              type: "warning",
            });
          }
        }
      } catch (error) {
        this.$message.error("注册失败，请刷新页面重试" + this.error.name);
      }
    },
    regEmailCodeAccept() {
      let code = sessionStorage.getItem("regCode");
      if (code) {
        if (code == this.input) {
          this.createrUser();
        } else {
          this.$notify({
            title: "错误",
            message: "验证码错误，请再次输入验证码",
            type: "warning",
          });
        }
      } else {
        this.$notify({
          title: "错误",
          message: "请重新注册",
          type: "warning",
        });
        this.$emit("regEmailSend");
      }
    },
    reg() {
      this.regEmailCodeAccept();
      this.input = "";
    },
  },
};
</script>
<style lang="scss" scoped>
.RegEmailCode {
  padding: 20px 30px;
}
</style>