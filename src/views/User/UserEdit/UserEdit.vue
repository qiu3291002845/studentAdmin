<template>
  <div>
    <el-container>
      <!-- 顶部位置 -->
      <el-header
        ><h5 class="headerTitle el-icon-s-custom">
          <span style="color: #000">当前位置</span> > <router-link to="/userlist">用户管理</router-link> >
          {{ !id ? "新建用户" : "用户编辑" }}
        </h5></el-header
      >
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 用户信息 -->
      <h2 style="color: #000">
        {{ !id ? "新建用户" : "用户编辑" }}
      </h2>
      <el-container class="mt-3" style="background: #fff; padding: 1rem">
        <UserFrom
          :roleName="roleName"
          :id="id"
          :userData="userData"
          :rules="rules"
        ></UserFrom>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import UserFrom from "./components/UserForm";
export default {
  props: ["id"],
  components: {
    UserFrom,
  },
  data() {
    return {
      // 用户权限
      roles: "",
      // 请求的数据
      userData: {
        username: "",
        password: "",
        avatar: "",
        name: "",
        email: "",
        role: "",
      },
      roleName: "",
      // 表单规则验证
      rules: {
        username: [
          { required: true, message: "用户名称不能为空", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" },
          { max: 18, message: "密码最大长度18个字符", trigger: "blur" },
        ],
        name: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" },
        ],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        role: [{ required: true, message: "请选择角色", trigger: "change" }],
        avatar: [
          {
            required: true,
            message: "请上传头像",
            trigger: "change",
          },
        ],
      },
    };
  },
  // 表单规则验证
  methods: {
    // 通过编辑跳转过来请求一条id数据
    async UserEditInfo() {
      const { data } = await this.$http.get(`/user/${this.id}`);
      this.userData = data.data;
      const roleData = await this.$http.get(`/role/${data.data.role._id}`);
      this.userData.role = data.data.role._id;
      this.roleName = roleData.data.data.name;
    },
    check() {
      let tf = false;
      this.$store.state.userInfo.role.purview.map((item) => {
        if (item) {
          tf = true;
        }
      });
      if (!tf) {
        this.$message.info("你没有权限哦，别做做，再做做头打掉，滚走啊");
        this.$router.push("/");
      }
    },
  },
  created() {
    this.$message.success("欢迎来到用户编辑页面");
    this.check();
  },
  mounted() {
    document.body.style.backgroundColor = "#FBFBFB";
    this.id && this.UserEditInfo();
  },
};
</script>

<style scoped>
.el-header {
  background: none;
}
.headerTitle {
  line-height: 60px;
  cursor: pointer;
  font-size: 18px;
  color: rgb(124, 119, 119);
}
.map {
  width: 100%;
  height: 400px;
}
</style>