<template>
  <div id="nav">
    <app-home></app-home>
  </div>
</template>

<script>
import Home from "@/views/Home";
export default {
  components: { appHome: Home },
};
</script>

<style lang="scss">
@import "./src/assets/_variables";

body {
  margin: 0;
}

#nav {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  background-image: var(--background-crosshatch);
  padding: 30px 0 0 0;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
