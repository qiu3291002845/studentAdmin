<template>
  <el-container>
    <el-aside
      width="200px"
      style="background-color: rgb(238, 241, 246); height: 100vh"
    >
      <el-menu router>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>管理系统
          </template>
          <el-menu-item-group>
            <template slot="title">管理系统</template>
            <el-menu-item index="/">学生管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>评分管理
          </template>
          <el-menu-item-group>
            <template slot="title">评分系统</template>
            <el-menu-item index="/score">评分系统</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3" v-if="_isTeacher">
          <template slot="title">
            <i class="el-icon-menu"></i>角色管理
          </template>
          <el-menu-item-group>
            <template slot="title">角色系统</template>
            <el-menu-item index="/rolelist">角色列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4" v-if="_isTeacher">
          <template slot="title">
            <i class="el-icon-s-custom"></i>用户管理
          </template>
          <el-menu-item-group>
            <template slot="title">用户管理</template>
            <el-menu-item index="/UserList">用户管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container style="height: 100vh">
      <el-header style="text-align: right; font-size: 12px; height: 6.5vh">
        <el-dropdown trigger="click">
          <el-button type="text" style="color: white">
            {{ _Jobtitle }}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button type="text" @click="loginout" class="w-100"
                >退出登录</el-button
              ></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main height="height:5vh;">
        <transition name="left" mode="out-in">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss">
.left-enter {
  transform: translateX(100%);
}

.left-enter-active,
.left-leave-active {
  transition: 0.2s;
}
.left-leave-to {
  transform: translateX(-100%);
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
import storage from "sweet-storage";
export default {
  name: "Main",
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(20).fill(item),
    };
  },
  computed: {
    _Jobtitle() {
      return this.$store.state.userInfo.name;
    },
    _isTeacher() {
      let tf = false;
      this.$store.state.userInfo.role.purview.map((item) => {
        if (item) {
          tf = true;
        }
      });
      return tf;
    },
  },
  methods: {
    loginout() {
      localStorage.setItem("userId", "");
      localStorage.clear();
      storage.clear();
      localStorage.setItem("userId", "");
      this.$router.push("/login");
    },
    async ObtainId() {
      let id = localStorage.getItem("userId");
      if (id) {
        const { data } = await this.$http.get(`/user/${id}`);
        this.$store.state.userInfo = data.data;
        if (this.$store.state.userInfo.username.length > 0) {
          if (
            this.$store.state.userInfo.role &&
            this.$store.state.userInfo.role.name.length > 0
          ) {
            console.log("登录成功");
          } else {
            this.ontify("该用户没有设置权限，请先登录管理员设计权限");
            this.$router.push("/login");
          }
        } else {
          this.ontify("该用户不存在，请重新注册登录");
          this.$router.push("/login");
        }
      } else {
        this.ontify("该用户异常操作，请重新登录");
        this.$router.push("/login");
      }
    },
    ontify(mes) {
      this.$notify({
        title: "警告",
        message: mes,
        type: "warning",
      });
    },
  },
  created() {
    this.ObtainId();
  },
};
</script>
