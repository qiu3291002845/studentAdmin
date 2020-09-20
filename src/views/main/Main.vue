<template>
  <el-container>
    <el-aside
      width="200px"
      style="background-color: rgb(238, 241, 246);height:100vh"
    >
      <el-menu router>
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>学生管理</template
          >
          <el-menu-item-group>
            <template slot="title">学生系统</template>
            <el-menu-item index="/">学生管理</el-menu-item>
            <el-menu-item index="/edit">学生编辑</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>评分管理</template>
          <el-menu-item-group>
            <template slot="title">评分系统</template>
            <el-menu-item index="/score">评分系统</el-menu-item>
            <el-menu-item index="/scoreEdit">评分编辑</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container style="height:100vh;">
      <el-header style="text-align: right; font-size: 12px;height:6.5vh">
        <el-dropdown trigger="click">
          <el-button type="text" style="color:white">
            管理员<i class="el-icon-arrow-down el-icon--right"></i>
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
  methods: {
    loginout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>
