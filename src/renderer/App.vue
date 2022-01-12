<template>
  <div id="app" class="m-0 p-0">
    <router-view class="h-100 w-100"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'tunnelSimulator',
  }
</script>

<style>
@import "~animate.css/animate.min.css";
#app {
  height: 100vh;
  overflow: hidden;
}
</style>
