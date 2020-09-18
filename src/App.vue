<template>
  <div id="app">
    <Main></Main>
  </div>
</template>

<script>
export default {
  components: {
    Main: () => import("./views/Main/Main"),
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
