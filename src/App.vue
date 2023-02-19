<template>
  <div class="container">
    <router-view />
  </div>
</template>

<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--global-font);
}

.container {
  width: 100%;
  max-width: 700px;
  margin: 50px auto;
}
</style>
