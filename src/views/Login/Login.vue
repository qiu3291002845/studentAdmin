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
          <el-input
            placeholder="请输入用户名或邮箱地址"
            v-model="userFrom.username"
            id="username"
            @keyup.enter.native="onSubmit('form')"
            suffix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item class="userInput" prop="password">
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
        <el-form-item class="read">
          <el-checkbox v-model="readUsername" label="记住账号"></el-checkbox>
          <el-checkbox v-model="readPassword" label="记住密码"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="submit" type="primary" @click="onSubmit('form')"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="footer">
          <a @click="RegDrawer = true">注册</a>
          <a @click="RetDrawer = true">找回密码</a>
          <a @click="chengeDrawer = true">修改密码</a>
        </el-form-item>
      </el-form>
      <el-drawer
        :destroy-on-close="true"
        custom-class="Drawer-size"
        :before-close="handleClose"
        title="用户账号注册"
        :visible.sync="RegDrawer"
      >
        <div>
          <reg @regEmailDrArawer="sendopen"></reg>
          <el-drawer
            title="验证用户邮箱"
            :append-to-body="true"
            :before-close="handleClose"
            :visible.sync="RegInnerDrawer"
          >
            <regEmailCode
              :regForm="RegForm"
              @regEmailSend="regEmailCodeAccept"
            ></regEmailCode>
          </el-drawer>
        </div>
      </el-drawer>
      <el-drawer
        :destroy-on-close="true"
        custom-class="Drawer-size"
        title="用户修改密码"
        :visible.sync="chengeDrawer"
        :before-close="chengeHandleClose"
      >
        <div>
          <chenge @chengesend="chengeAccept"></chenge>
          <el-drawer
            title="验证用户邮箱"
            :append-to-body="true"
            :before-close="chengeHandleClose"
            :visible.sync="chengeInnerDrawer"
            :destroy-on-close="true"
            custom-class="Drawer-size"
          >
            <chengeNew
              :chengeId="chengeId"
              @chengeShutDown="chengeShutDown"
            ></chengeNew>
          </el-drawer>
        </div>
      </el-drawer>
      <el-drawer
        :destroy-on-close="true"
        custom-class="Drawer-size"
        :before-close="RetHandleClose"
        title="用户找回密码"
        :visible.sync="RetDrawer"
      >
        <div>
          <Ret @retsendbool="retAccept"></Ret>
          <el-drawer
            title="验证用户邮箱"
            :append-to-body="true"
            :before-close="RetHandleClose"
            :visible.sync="RetDInnerDrawer"
            :destroy-on-close="true"
            custom-class="Drawer-size"
          >
            <Retnew :RetId="RetId" @retShutDown="retShutDown"></Retnew>
          </el-drawer>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import chenge from "./chenge/chenge"; //  /// 修改密码页面
import chengeNew from "./chenge/chengNew";
import Ret from "./Retrieve/Retrieve"; // 找回密码页面引入
import Retnew from "./Retrieve/RetrieveNew"; // 引入写入密码页面
import reg from "./Registered/Registered"; // 注册页面引入
import regEmailCode from "./Registered/RegEmailCode"; // 注册页面中的邮箱验证
import storage from "sweet-storage";
export default {
  name: "Login",
  data() {
    return {
      readPassword: false,
      readUsername: true,
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
      // Reg  Drawer 数据
      RegDrawer: false,
      RegInnerDrawer: false,
      RegForm: {
        username: "admin",
        password: "123456",
        avatar: "https://czh1010.oss-cn-beijing.aliyuncs.com/avatar/1.gif",
        name: "小白",
        email: "123@qq.com",
        role: " ",
      },

      // 修改密码界面 数据
      chengeDrawer: false,
      chengeInnerDrawer: false,
      chengeId: "",

      // 找回密码中的数据
      RetDrawer: false,
      RetDInnerDrawer: false,
      RetId: "", /// 找回密码中的id
    };
  },
  components: {
    reg,
    regEmailCode,
    Ret,
    Retnew,
    chenge,
    chengeNew,
  },
  methods: {
    storageInfo() {
      if (this.readUsername) {
        if (this.userFrom.username !== "") {
          storage.save(
            "username",
            this.userFrom.username,
            1000 * 60 * 60 * 24 * 21
          );
        }
      }
      if (this.readPassword) {
        if (this.userFrom.password !== "") {
          storage.save(
            "password",
            this.userFrom.password,
            1000 * 60 * 60 * 24 * 21
          );
        }
      }
    },
    /// 确认关闭
    handleClose(done) {
      this.$confirm("你还未注册完成，确定关闭吗？？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    chengeHandleClose(done) {
      this.$confirm("找回密码未完成，确定关闭吗？？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    RetHandleClose(done) {
      this.$confirm("修改密码未完成，确定关闭吗？？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    async deposit() {
      if (this.userFrom.username.search("@") > 0) {
        /// 当使用邮箱登陆的时候执行
        const { data } = await this.$http.get(
          `/user/email/${this.userFrom.username}`
        );
        localStorage.setItem("userId", data.user._id);
      } else {
        /// 当使用用户名登录的时候执行
        const { data } = await this.$http.get(
          `/user/username/${this.userFrom.username}`
        );
        localStorage.setItem("userId", data.user._id);
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
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.userFrom.username = this.userFrom.username.toLocaleLowerCase();
          const { data } = await this.$http.post("/login", this.userFrom);
          if (data.statusCode === 500) {
            this.$message.error(data.message);
          } else {
            this.$message.success("登录成功");
            this.storageInfo();
            //1000 * 60 * 60 * 24 * 7
            storage.save("token", data.token, 1000 * 60 * 60 * 24 * 7);
            this.deposit();
            this.$router.push("/");
          }
        } else {
          this.$message.error("验证码错误，请输入正确的验证码");
          return false;
        }
      });
    },
    async reqCode() {
      try {
        const { data } = await this.$http.get("/login/code");
        sessionStorage.setItem("code", data.text);
        this.imgSvg = data.img;
      } catch (error) {
        this.$message.error("获取验证码失败，请重试" + this.error.name);
      }
    },
    resetCode() {
      this.reqCode();
    },
    regEmailCodeAccept() {
      this.RegInnerDrawer = false;
      this.RegDrawer = false;
    },
    chengeAccept(id) {
      this.chengeInnerDrawer = true;
      this.chengeId = id;
    },

    sendopen(from) {
      this.RegInnerDrawer = true;
      this.RegForm = from;
    },
    retAccept(id) {
      this.RetDInnerDrawer = true;
      this.RetId = id;
    },
    retShutDown() {
      this.RetDrawer = false;
      this.RetDInnerDrawer = false;
    },
    chengeShutDown() {
      this.chengeDrawer = false;
      this.chengeInnerDrawer = false;
      this.$notify({
        title: "成功",
        message: "密码修改成功",
        type: "success",
      });
    },
    readInfo() {
      if (storage.get("username")) {
        this.userFrom.username = storage.get("username");
        this.readUsername = true;
      } else {
        this.readUsername = false;
      }
      if (storage.get("password")) {
        this.userFrom.password = storage.get("password");
        this.readPassword = true;
      } else {
        this.readPassword = false;
      }
    },
  },
  created() {
    try {
      this.readInfo();
      this.reqCode();
    } catch (error) {
      this.$message.error("数据获取失败，请重试" + this.error.name);
    }
  },
};
</script>

<style lang="scss">
body {
  .Drawer-size {
    width: 450px !important;
  }
  .footer {
    width: 70%;
    margin: 0 auto;
    a {
      margin: 0 30px;
      cursor: pointer;
    }
  }
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
      padding-bottom: 40px;
    }
    .userForm {
      margin: 0 auto;
      text-align: left;
      .read {
        margin: 1.175rem 5rem 0rem 5rem;
        .el-checkbox__label {
          font-size: 1.235rem;
          color: #333;
        }
        .is-checked {
          .el-checkbox__inner {
            background-color: #409eff;
            border-color: #409eff;
          }
        }
      }
      .imgCode {
        .el-input {
          width: 14.875rem;
          margin-right: 1.755rem;
        }
        .imgSvg {
          width: 8.2rem;
          height: 3.5rem;
          transform: translateY(-0.7rem);
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
        margin: 1.075rem 5rem 0rem 5rem;
      }
    }
  }

  .bg {
    background: url("https://i.ibb.co/WprXSHJ/bg.jpg") no-repeat;
    background-size: 100% 100%;
    height: 100vh;
  }
  position: relative;
  overflow: hidden;
}
</style>
