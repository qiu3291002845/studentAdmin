<template>
  <div>
    <Bread></Bread>
    <Tabl></Tabl>
  </div>
</template>
<script>
import Bread from "./component/BreadCrumbs";
import Tabl from "./component/table";
export default {
  name: "UserList",
  data() {
    return {};
  },
  methods: {
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
  components: {
    Bread, //面包屑
    Tabl, //tab表格
  },
  created() {
    this.check();
  },
};
</script>
<style scoped>
</style>