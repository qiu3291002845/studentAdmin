<template>
  <div>
    <div class="fanhui" @click="fanhui">
      <span class="iconfont icon-fanhui"></span>
    </div>
    <h2><span>找</span><span>回</span><span>密</span><span>码</span></h2>
    <router-view></router-view>
  </div>
</template>
<script>
import "../css/iconfont.css";
export default {
  name: "ret",
  methods: {
    fanhui() {
      this.$router.push("/Login");
    },
  },
};
</script>
<style lang="scss" scoped>
.fanhui {
  cursor: pointer;
  position: absolute;
  span {
    font-size: 40px;
    color: #fff;
    font-size: bold;
  }
}
h2 {
  color: #fff;
  text-align: center;
  letter-spacing: 5px;
  font-weight: bold;
  span {
    margin: 0 10px;
  }
}
h2 {
  color: #fff;
  text-align: center;
  letter-spacing: 5px;
  font-weight: bold;
  span {
    margin: 0 10px;
  }
}
</style>