<template>
  <div class="chenge">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item prop="userEmail">
        <el-input
          @keyup.enter.native="submitForm('ruleForm')"
          v-model="ruleForm.userEmail"
          placeholder="请输入邮箱地址或用户名"
        >
          <i slot="prefix" class="iconfont icon-xingmingyonghumingnicheng"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          @keyup.enter.native="submitForm('ruleForm')"
          v-model="ruleForm.password"
          autocomplete="off"
          placeholder="请输入密码"
        >
          <i slot="prefix" class="iconfont icon-mima"></i>
        </el-input>
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
import "../../css/iconfont.css";
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
            message: "请输入或邮箱地址或用户名",
            trigger: "blur",
          },
          {
            min: 8,
            max: 32,
            message: "长度在 8 到 32 个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            min: 6,
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
      let datar = {};
      if (this.ruleForm.userEmail.search("@") > 0) {
        const { data } = await this.$http.get(
          `/user/email/${this.ruleForm.userEmail}`
        );
        datar = data.user;
      } else {
        const { data } = await this.$http.get(
          `/user/username/${this.ruleForm.userEmail}`
        );
        datar = data.user;
      }
      if (datar !== null) {
        this.userId = datar._id;
        this.requesLogin();
      } else {
        // 没有user 为空是 没有该用户
        this.$notify({
          title: "错误",
          message: "该用户未注册，请重新确认",
          type: "warning",
        });
      }
    },
    //发起请求校验密码的api
    async requesLogin() {
      let user = {
        id: this.userId,
        pass: this.ruleForm.password,
      };
      const { data } = await this.$http.post("/user/volidateOldPass", user);
      if (data.statusCode === 200) {
        this.$router.push({
          name: "ChengePass",
          params: {
            id: this.userId,
          },
        });
        this.ruleForm = {
          userEmail: "",
          password: "",
        };
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
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss">
.chenge {
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