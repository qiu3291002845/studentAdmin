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
        title="用户账号注册"
        :visible.sync="RegDrawer"
        size="50%"
      >
        <div>
          <reg @regEmail="regEmailCode"></reg>
          <el-drawer
            title="验证用户邮箱"
            :append-to-body="true"
            :before-close="handleClose"
            :visible.sync="RegInnerDrawer"
          >
            <regEmailCode @regEmailCodeSend="regEmailCodeAccept"></regEmailCode>
          </el-drawer>
        </div>
      </el-drawer>
      <el-drawer
        :destroy-on-close="true"
        custom-class="Drawer-size"
        title="用户修改密码"
        :visible.sync="chengeDrawer"
        size="50%"
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
        title="用户找回密码"
        :visible.sync="RetDrawer"
        size="50%"
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
        role: "5f71e5ab8169903a6070158a",
      },
      RegEmailCodeData: "",

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
    // 检验验证码
    handleClose(done) {
      this.$confirm("你还未输入验证码，确定关闭吗？？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    chengeHandleClose(done) {
      this.$confirm("你还未输入验证码，确定关闭吗？？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    RetHandleClose(done) {
      this.$confirm("你还未输入验证码，确定关闭吗？？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    async deposit() {
      if (this.userFrom.username.search("@") > 0) {
        /// 当使用邮箱登陆的时候执行
        const uid = await this.$http.get(
          `/user/email/${this.userFrom.username}`
        );
        let id = uid.data.user._id;
        const { data } = await this.$http.get(`/user/${id}`);
        this.$store.state.userInfo = data.data;
        console.log(this.$store.state.userFrom);
      } else {
        /// 当使用用户名登录的时候执行
        const uid = await this.$http.get(
          `/user/username/${this.userFrom.username}`
        );
        let id = uid.data.user._id;
        const { data } = await this.$http.get(`/user/${id}`);
        this.$store.state.userInfo = data.data;
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
          this.deposit();
          if (data.statusCode === 500) {
            this.$message.error(data.message);
          } else {
            this.$message.success("登录成功");
            this.storageInfo();

            //1000 * 60 * 60 * 24 * 7
            storage.save("token", data.token, 1000 * 60 * 60 * 24 * 7);
              // this.$router.push("/");
          }
        } else {
          this.$message.error("请调整正确的输入框");
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
              this.RegForm.role = item._id;
            }
          }
        });
      } catch (error) {
        this.$message.error("获取失败请刷新重试" + this.error.name);
      }
    },
    // 请求注册接口
    async createrUser() {
      try {
        const { data } = await this.$http.post("/user", this.RegForm);
        if (data.statusCode === 200) {
          this.$notify({
            title: "成功",
            message: "这是一条成功的提示消息",
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
    regEmailCodeAccept(code) {
      if (this.RegEmailCodeData == code) {
        this.createrUser();
        this.RegInnerDrawer = false;
      } else {
        this.$notify({
          title: "错误",
          message: "验证码错误，请再次输入验证码",
          type: "warning",
        });
      }
    },

    chengeAccept(id) {
      this.chengeInnerDrawer = true;
      this.chengeId = id;
    },

    // 请求邮箱验证接口
    async sendEmailCode() {
      try {
        const { data } = await this.$http.get(
          `/tool/email/${this.RegForm.email}`
        );
        this.RegEmailCodeData = data.code;
      } catch (error) {
        this.$message.error("邮箱验证码获取失败，请重试" + this.error.name);
      }
      console.log(this.RegEmailCodeData);
    },
    regEmailCode(form) {
      this.RegForm = {
        username: form.userName,
        password: form.pass,
        avatar: "https://czh1010.oss-cn-beijing.aliyuncs.com/avatar/1.gif",
        name: form.name,
        email: form.email,
        role: this.RegForm.role, // 动态获取role值,
      };
      this.sendEmailCode();
      this.RegInnerDrawer = true;
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
      this.obtainRole(); //获取角色中的id
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
