<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <transition name="left" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "Main",
};
</script>
<style lang="scss">
.left-enter {
  transform: translateX(100%);
}

.left-enter-active {
  transition: 0.35s;
}

.left-leave-to {
  transform: translateX(-100%);
}

.left-leave-active {
  transition: 0.35s;
}
body {
  overflow-x: hidden;
}
</style>
