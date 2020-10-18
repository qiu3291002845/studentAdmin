<template>
  <div>
    <vue-particles
      color="#fff"
      :particleOpacity="0.8"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.8"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="bg"
    >
    </vue-particles>
    <div class="loginBox">
      <div class="content">
        <transition name="left" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Logins",
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
body {
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

  .bg {
    background: url("https://czh1010.oss-cn-beijing.aliyuncs.com/images/20200928/bg.jpg")
      no-repeat;
    background-size: 100% 100%;
    height: 100vh;
  }
  .loginBox {
    width: 100%;
    height: 100%;
    .content {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 470px;
      height: 500px;
      border-radius: 30px;
      padding: 30px;
      background: rgba(0, 0, 0, 0.3);
      overflow: hidden;
    }
  }
  overflow: hidden;
}
</style>