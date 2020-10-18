<template>
  <div style="margin: 0 auto; width: 100%">
    <el-form :model="userData" ref="userData" :rules="rules">
      <el-form-item label="用户名称：" prop="username">
        <el-input
          v-model="userData.username"
          placeholder="请输入用户名称"
          clearable
          maxlength="10"
          minlength="1"
          show-word-limit
          prefix-icon="el-icon-user-solid"
          title="用户名称"
          :disabled="pwd"
        ></el-input>
      </el-form-item>

      <el-form-item label="用户密码：" prop="password" v-if="!id">
        <el-input
          v-model="userData.password"
          placeholder="请输入用户密码"
          show-password
          clearable
          :disabled="pwd"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>

      <el-form-item label="用户昵称：" prop="name">
        <el-input
          v-model="userData.name"
          placeholder="请输入用户昵称"
          clearable
          maxlength="10"
          minlength="1"
          show-word-limit
          prefix-icon="el-icon-user-solid"
          title="用户昵称"
        ></el-input
      ></el-form-item>

      <el-form-item label="用户邮箱：" prop="email">
        <el-input
          v-model="userData.email"
          placeholder="请输入用户邮箱"
          clearable
          prefix-icon="el-icon-s-promotion"
          title="用户邮箱"
          :disabled="pwd"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户权限：" prop="role">
        <el-select
          v-if="!id"
          clearable
          v-model="userData.role"
          :placeholder="id ? roleName : `请选择角色`"
          @visible-change="findRole"
        >
          <el-option
            v-for="item in roles"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
         <el-select
          v-else
          clearable
          v-model="roleId"
          :placeholder="id ? roleName : `请选择角色`"
          @visible-change="findRole"
        >
          <el-option
            v-for="item in roles"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户头像：" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="http://www.aimmeng.com:1903/upload"
          title="头像上传"
          accept="file"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :before-upload="beforeUpload"
          :show-file-list="false"
        >
          <img
            v-if="userData.avatar"
            :src="userData.avatar"
            class="avatar-uploader-icon"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button @click="submitUserEdit('userData')">
        {{ !id ? "新建用户" : "保存修改" }}
      </el-button>
      <el-button v-if="id" @click="changePwd">修改密码</el-button>
      <el-button v-if="id" @click="changeEmail">修改邮箱</el-button>
      <!-- 修改密码弹框 -->
      <el-dialog
        title="请输入密码"
        :visible.sync="dialogPwd"
        width="30%"
        :before-close="handleClose"
      >
        <el-form :model="formPassword">
          <el-form-item label="旧密码:" size="medium">
            <el-input
              style="width: 60%"
              v-model="formPassword.oldPassword"
              placeholder="请输入旧密码:"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码:" size="medium">
            <el-input
              style="width: 60%"
              v-model="formPassword.newPassword"
              placeholder="请输入新密码:"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogPwd = false">取 消</el-button>
          <el-button type="primary" @click="oldVerify">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改邮箱弹框 -->
      <el-dialog
        :visible.sync="dialogEmail"
        title="修改邮箱"
        :before-close="handleClose"
        width="30%"
      >
        <b>点击获取验证码</b>
        <el-form :model="formEmail">
          <el-form-item class="emailModel">
            <el-input
              type="email"
              v-model="formEmail.newEmail"
              style="width: 50%"
              clearable
              placeholder="请输入邮箱验证码"
            ></el-input>
            <el-button
              class="ml-3"
              style="border: 1px solid #34c447"
              @click="emailCode"
              >获取验证码</el-button
            >
          </el-form-item>
          <el-button type="success" style="width: 50%">下一步</el-button>
        </el-form>
      </el-dialog>
    </el-row>
  </div>
</template> 

<script>
export default {
  name: "UserForm",
  props: ["userData", "id", "rules", "roleName"],
  data() {
    return {
      formPassword: {
        // 旧密码
        oldPassword: "",
        // 新密码
        newPassword: "",
      },
      formEmail: {
        newEmail: "",
      },
      roleId: "",
      // 密码对话框
      dialogPwd: false,
      // 邮箱对话框
      dialogEmail: false,
      // 密码框的可选可不选
      pwd: null,
      roles: [],
    };
  },
  methods: {
    // 验证码
    async emailCode() {
      const { data } = this.$http.get(``);
      console.log(data);
    },
    async findRole() {
      const { data } = await this.$http.get("/role");
      this.roles = data.data;
    },
    // 点击修改密码对话框
    async changePwd() {
      this.dialogPwd = true;
    },
    // 点击修改邮箱对话框
    async changeEmail() {
      this.dialogEmail = true;
    },
    // 检验旧密码
    async oldVerify() {
      // 判断密码不能为空
      if (
        this.formPassword.oldPassword == "" ||
        this.formPassword.newPassword == ""
      ) {
        this.$message.error("密码不能为空");
        return false;
      }
      // 判断密码是否相同
      if (this.formPassword.oldPassword === this.formPassword.newPassword) {
        this.$message.error("密码不能一致");
        return false;
      }
      // 判断旧密码
      await this.$http
        .post("/user/volidateOldPass", {
          id: this.id,
          pass: this.formPassword.oldPassword,
        })
        .then(async ({ data }) => {
          if (data.statusCode === 500) {
            this.$message.info("与旧密码不符合");
            return;
          } else {
            // 修改密码
            await this.$http.post("/user/updatePass", {
              id: this.id,
              pass: this.formPassword.newPassword,
            });
            this.$message.success("密码修改成功");
          }
        });
    },
    // 关闭弹框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    // 上传文件之前的钩子
    beforeUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg" || "image/gif" || "image/png";
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG,png,gif 格式!");
      }
      return isJPG;
    },
    // 头像上传成功
    async uploadSuccess(response, file) {
      this.userData.avatar = URL.createObjectURL(file.raw);
      this.userData.avatar = response.src;
      console.log(file);
    },
    // 上传失败
    uploadError() {
      this.$refs["upload"].clearFiles();
      this.$message.error("上传失败,请重新上传");
    },
    // 用户提交
    submitUserEdit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.id) {
            if (this.roleId !== "") {
              this.userData = { ...this.userData, role: this.roleId };
            }
            await this.$http.put(`/user/${this.userData._id}`, this.userData);
            this.$message.success("修改成功");
          } else {
            // await this.$http.post("/user", this.userData);
            // this.$message.success("新建成功");
            // this.$router.push("/");
          }
        } else {
          return false;
        }
      });
    },
    // 判断密码可选可不选
    pwds() {
      this.pwd = true;
    },
  },
  mounted() {
    this.id && this.pwds();
  },
};
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.el-form-item {
  margin: 2rem;
}
.el-input {
  width: 40rem;
}
.emailModel {
  margin: 0;
}
/* 头像上传样式 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .avatar-uploader-icon:hover {
  border-color: #409eff;
  color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  margin-left: 1.6rem;
  border: 1px solid #cccccc;
}
</style>