<template>
  <div class="Login">
    <h2><span>登</span><span>录</span></h2>
    <el-form :model="User" status-icon :rules="rules" ref="User">
      <el-form-item prop="username">
        <el-input
          v-model="User.username"
          placeholder="请输入用户名或者邮箱"
          @keyup.enter.native="onSubmit('User')"
        >
          <i slot="prefix" class="el-input__icon el-icon-user"></i
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="User.password"
          autocomplete="off"
          @keyup.enter.native="onSubmit('User')"
          placeholder="请输入密码"
        >
          <i slot="prefix" class="el-input__icon el-icon-unlock"></i
        ></el-input>
      </el-form-item>
      <el-form-item class="imgCode" prop="code">
        <el-input
          placeholder="请输入验证码"
          v-model="User.code"
          @keyup.enter.native="onSubmit('User')"
        >
          <i slot="prefix" class="el-input__icon el-icon-news"></i
        ></el-input>
        <el-tooltip effect="dark" content="看不清-换一张" placement="top-start">
          <el-button
            class="imgSvg"
            type="text"
            @click="ObtainCode"
            v-html="imgSvg"
          ></el-button>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('User')" class="loginbut"
          >登录</el-button
        >
      </el-form-item>
      <el-form-item class="retchenge">
        <el-button type="primary">
          <router-link to="/reg">注册</router-link>
        </el-button>
        <el-button type="primary">
          <router-link to="/Ret">找回密码</router-link>
        </el-button>
        <el-button type="primary">
          <router-link to="/Chenge">修改密码</router-link>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      User: {
        username: "",
        password: "",
        code: "",
      },
      rules: {
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
    async deposit() {
      if (this.User.username.search("@") > 0) {
        /// 当使用邮箱登陆的时候执行
        const { data } = await this.$http.get(
          `/user/email/${this.User.username}`
        );
        localStorage.setItem("userId", data.user._id);
      } else {
        /// 当使用用户名登录的时候执行
        const { data } = await this.$http.get(
          `/user/username/${this.User.username}`
        );
        localStorage.setItem("userId", data.user._id);
      }
    },
    async onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.User.username = this.User.username.toLocaleLowerCase();
          const { data } = await this.$http.post("/login", this.User);
          if (data.statusCode === 500) {
            this.$message.error(data.message);
          } else {
            this.$message.success("登录成功");
            //1000 * 60 * 60 * 24 * 7
            // storage.save("token", data.token, 1000 * 60 * 60 * 24 * 7);

            try {
              this.deposit();
            } catch (error) {
              console.log(error);
            }
            this.$router.push("/");
          }
        } else {
          this.$message.error("请调整正确的输入框");
          return false;
        }
      });
    },
    async ObtainCode() {
      try {
        const { data } = await this.$http.get("/login/code");
        sessionStorage.setItem("code", data.text);
        this.imgSvg = data.img;
      } catch (error) {
        this.$message.error("获取验证码失败，请重试" + this.error.name);
      }
    },
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
  },
  created() {
    this.ObtainCode();
  },
};
</script>
<style lang="scss">
.Login {
  h2 {
    color: #fff;
    text-align: center;
    letter-spacing: 5px;
    font-weight: bold;
    span {
      margin: 0 10px;
    }
  }
  .el-form {
    .imgSvg {
      border: 2px solid #fff;
      svg {
        border-radius: 10px;
      }
    }
    padding: 15px 20px;
    .el-form-item {
      margin: 30px 20px;
      .el-input {
        box-sizing: content-box;
        input {
          border-radius: 15px;
          height: 48px;
          background: rgba(0, 0, 0, 0);
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
        padding: 0;
        border-radius: 15px;
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
    .retchenge {
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
  }
  .imgCode {
    .el-input {
      width: 167px !important;
      margin-right: 15px;
    }
  }
}
</style>