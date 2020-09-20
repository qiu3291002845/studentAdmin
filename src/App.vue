<template>
  <div id="app">
    <transition name="left" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">

* {
  margin: 0;
  padding: 0;
}
</style>
