<template>
  <el-button style="border: none;" plain @click="Notice"> </el-button>
</template>
<script>
export default {
  methods: {
    Notice() {
      //通知按钮
      const h = this.$createElement;
      this.$notify({
        title: this.$store.state.userInfo.name + "欢迎来到用户管理页面",
        message: h(
          "i",
          { style: "color:green;" },
          "可以根据自己所有的权限操作"
        ),
      });
    },
  },
  created() {
    this.Notice();
    console.log(this.$store.state.userInfo.name);
  },
};
</script>
