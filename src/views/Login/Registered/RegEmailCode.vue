<template>
  <div class="RegEmailCode">
    邮箱验证码：<el-input v-model="input" placeholder="请输入验证码"></el-input>
    <el-button @click="reg">确认注册</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
    };
  },
  methods: {
    reg() {
      this.$emit("regEmailCodeSend", this.input);
    },
  },
  created() {
    this.input = "";
  },
};
</script>
<style lang="scss" scoped>
.RegEmailCode {
  padding: 20px 30px;
}
</style>