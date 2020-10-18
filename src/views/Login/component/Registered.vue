<template>
  <div class="reg">
    <div class="fanhui" @click="fanhui">
      <span class="iconfont icon-fanhui"></span>
    </div>
    <h2><span>注</span><span>册</span></h2>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item prop="name">
        <el-input
          @keyup.enter.native="submitForm('ruleForm')"
          v-model="ruleForm.name"
          placeholder="请输入用户名称"
        >
          <i slot="prefix" class="iconfont icon-mingcheng"></i
        ></el-input>
      </el-form-item>
      <el-form-item prop="userName">
        <el-input
          @keyup.enter.native="submitForm('ruleForm')"
          v-model="ruleForm.userName"
          placeholder="请输入用户名"
        >
          <i slot="prefix" class="iconfont icon-xingmingyonghumingnicheng"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input
          @keyup.enter.native="submitForm('ruleForm')"
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
          placeholder="请输入密码"
        >
          <i slot="prefix" class="iconfont icon-mima"></i
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          @keyup.enter.native="submitForm('ruleForm')"
          autocomplete="off"
          placeholder="请重新输入密码"
        >
          <i slot="prefix" class="iconfont icon-querenmima"></i
        ></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          v-model="ruleForm.email"
          @keyup.enter.native="submitForm('ruleForm')"
          placeholder="请输入邮箱地址"
        >
          <i slot="prefix" class="iconfont icon-youxiang"></i>
          <i slot="suffix" class="yuankuang" @click="sendEmailCode">
            <el-button type="primary">发送验证码</el-button>
          </i>
        </el-input>
      </el-form-item>

      <el-form-item prop="code">
        <el-input
          v-model="ruleForm.code"
          @keyup.enter.native="submitForm('ruleForm')"
          placeholder="请重新输入邮箱验证码"
        >
          <i slot="prefix" class="iconfont icon-yanzhengma"></i
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
// import { session } from "sweet-storage";
import "../css/iconfont.css";
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
    var validateCode = (rule, value, callback) => {
      let code = sessionStorage.getItem("regCode");
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
        name: "",
        userName: "",
        pass: "",
        checkPass: "",
        email: "",
        code: "",
      },
      role: "",
      rules: {
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
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
        code: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "blur",
          },
          {
            validator: validateCode,
            trigger: "blur",
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
            this.role = item._id;
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
        this.$message({
          showClose: true,
          message: "邮箱发送成功，请查收验证码",
          type: "success",
        });
      } catch (error) {
        this.$message.error("邮箱验证码获取失败，请重试" + this.error);
      }
    },
    fanhui() {
      this.$router.push("/Login");
    },
    // 请求注册接口
    async regApi(from) {
      try {
        const { data } = await this.$http.post("/user", from);
        if (data.statusCode === 200) {
          this.$notify({
            title: "成功",
            message: "注册成功，请登录",
            type: "success",
          });
          this.RegDrawer = false;
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
          this.regApi(RegForm);
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
<style lang="scss">
.reg {
  .fanhui {
    cursor: pointer;
    position: absolute;
    span {
      font-size: 40px;
      color: #fff;
      font-size: bold;
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
    padding: 15px 20px;
    .el-form-item {
      margin: 10px 20px;
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