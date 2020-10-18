<template>
  <div class="chengeNew">
    <div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            placeholder="请输入新密码"
            autocomplete="off"
          >
            <i slot="prefix" class="iconfont icon-mima"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            placeholder="请重新输入新密码"
          >
            <i slot="prefix" class="iconfont icon-mima"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="reg('ruleForm')">确认新密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import "../../css/iconfont.css";

export default {
  name: "chengeNew",
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
      },
    };
  },
  methods: {
    async sendUserPass() {
      let us = {
        id: this.$route.params.id,
        pass: this.ruleForm.pass,
      };
      console.log(us);
      const { data } = await this.$http.post("user/updatePass", us);
      if (data.success === "修改成功") {
        this.$notify({
          title: "成功",
          message: "密码修改成功，请登录",
          type: "success",
        });
        this.$router.push("/Login");
      }
      this.ruleForm = {
        pass: "",
        checkPass: "",
      };
    },
    reg(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.params) {
            this.sendUserPass();
          }
        } else {
          return false;
        }
      });
    },
  },
  created() {
    if (this.$route.params.id) {
      if (this.$route.params.id.length > 0) {
        this.$notify({
          title: "成功",
          message: "身份确认成功",
          type: "success",
        });
      } else {
        this.$router.push("/Login");
      }
    } else {
      this.$router.push("/Login");
    }
  },
};
</script>
<style lang="scss">
.chengeNew {
  .el-form {
    padding: 30px 20px;
    .el-form-item {
      margin: 30px 20px;
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
}
</style>