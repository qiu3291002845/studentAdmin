<template>
  <div>
    <!-- <Bread></Bread> -->
    <Tabl></Tabl>
    <Welcome></Welcome>
  </div>
</template>
<script>
// import Bread from './component/BreadCrumbs' //面包屑返回主界面
import Tabl from "./component/table"; //table表格
import Welcome from "./component/welcome"; //欢迎来到管理页面
export default {
  name: "UserList",
  data() {
    return {};
  },
  methods: {},
  components: {
    // Bread, //面包屑
    Tabl, //tab表格
    Welcome,
  },
};
</script>
<style scoped></style>
