<template>
  <div id="app" class="m-0 p-0">
    <Toolbar class=""></Toolbar>
    <router-view class="h-100 w-100"></router-view>
  </div>
</template>

<script>
  import Toolbar from "./components/Toolbar";
  export default {
    name: 'memorandum',
    components: {Toolbar}
  }
</script>

<style lang="css">
#app {
  height: 100vh;
  overflow: hidden;
}
</style>
