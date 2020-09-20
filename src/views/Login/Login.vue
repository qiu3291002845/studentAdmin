<template>
  <div>
    <vue-particles
      color="#fff"
      :particleOpacity="0.8"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.8"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="bg"
    >
    </vue-particles>
    <div class="loginBox">
      <div class="title">
        <h1>管理员登录</h1>
      </div>
      <el-form
        :model="userFrom"
        label-position="top"
        class="userForm"
        ref="form"
        :rules="form"
      >
        <el-form-item class="userInput" prop="username">
          <label for="username">用户名</label>
          <el-input
            placeholder="请输入用户名"
            v-model="userFrom.username"
            id="username"
            @keyup.enter.native="onSubmit('form')"
            suffix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item class="userInput" prop="password">
          <label for="password">密码</label>
          <el-input
            placeholder="请输入密码"
            v-model="userFrom.password"
            id="password"
            @keyup.enter.native="onSubmit('form')"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="userInput imgCode" prop="code">
          <el-input
            placeholder="请输入验证码"
            v-model="userFrom.code"
            id="code"
            @keyup.enter.native="onSubmit('form')"
          ></el-input>
          <el-tooltip
            effect="dark"
            content="看不清-换一张"
            placement="top-start"
          >
            <el-button
              class="imgSvg"
              type="text"
              @click="resetCode"
              v-html="imgSvg"
            ></el-button>
          </el-tooltip>
        </el-form-item>
        <el-form-item>
          <el-button class="submit" type="primary" @click="onSubmit('form')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      userFrom: {
        username: "",
        password: "",
        code: "",
      },
      form: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [
          {
            validator: this.validateCode,
            trigger: "blur",
          },
        ],
      },
      imgSvg: "",
    };
  },
  methods: {
    // 检验验证码
    async validateCode(rule, value, callback) {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else {
        let sessioncode = sessionStorage.getItem("code");
        if (value.toLowerCase() != sessioncode.toLowerCase()) {
          return callback(new Error("验证码不正确"));
        } else {
          return callback();
        }
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data } = await this.$http.post("/login", this.userFrom);
          if (data.statusCode === 500) {
            this.$message.error(data.message);
          } else {
            this.$message.success("登录成功");
            localStorage.setItem("token", data.token);
            this.$router.push("/");
          }
        } else {
          this.$message.error("请调整正确的输入框");
          return false;
        }
      });
    },
    async reqCode() {
      const { data } = await this.$http.get("login/code");
      sessionStorage.setItem("code", data.text);
      this.imgSvg = data.img;
    },
    resetCode() {
      this.reqCode();
    },
  },
  created() {
    this.reqCode();
  },
};
</script>

<style lang="scss">
body {
  .loginBox {
    width: 35rem;
    height: 35rem;
    border-radius: 10px;
    overflow: hidden;
    margin: auto;
    position: absolute;
    background: rgba(255, 255, 255, 0.9);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    .title {
      margin-top: 1.75rem;
      font-size: 1.125rem;
    }
    .userForm {
      margin: 0 auto;
      text-align: left;
      .imgCode {
        .el-input {
          width: 14.875rem;
          margin-right: 1.755rem;
        }
        .imgSvg {
          width: 8.2rem;
          height: 3.5rem;
          transform: translateY(0.7rem);
          border: 1px solid #ddd;
          background: white;
          padding: 0.255rem;
        }
      }
      .userInput {
        margin: 1.175rem 5rem 0rem 5rem;
        label {
          font-size: 1.15rem;
        }
        input {
          height: 3.5rem;
          font-size: 2rem;
          &::placeholder {
            font-size: 1.25rem;
          }
        }
        i {
          font-size: 1.25rem;
          margin-right: 0.275rem;
        }
      }
      .submit {
        width: 25rem;
        height: 3.3rem;
        font-size: 1.45rem;
        background: #409eff;
        margin: 2.75rem 5rem 0rem 5rem;
      }
    }
  }

  .bg {
    background: url("http://127.0.0.1:8080/bg.jpg") no-repeat;
    background-size: 100% 100%;
    height: 100vh;
  }
  position: relative;
  overflow: hidden;
}
</style>
