<template>
  <div id="app">
    <Main></Main>
  </div>
</template>

<script>
export default {
  components: {
    Main: () => import("./views/main/Main"),
  },
};
</script>

<style scoped></style>
