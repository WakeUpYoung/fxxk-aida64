<template>
  <div id="main-page">
<!--    <div id="toolbar-trigger" @mouseenter="showToolbar"></div>
    <Toolbar id="toolbar"></Toolbar>-->
    <Dashboard></Dashboard>
  </div>
</template>

<script>

import Dashboard from "../Dashboard";
export default {
  name: 'MainPage',
  components: {Dashboard},
  data() {
    return {

    }
  },
  methods: {

    showToolbar() {
      let toolbar = document.getElementById('toolbar')
      toolbar.style.top = '0'
      console.log('show .. it')
    },
    hideToolbar() {
      let toolbar = document.getElementById('toolbar')
      toolbar.style.top = '-2rem'
      console.log('hide .. it')
    }
  },

  mounted() {

  }
}
</script>

<style lang="css" scoped>
#main-page {
  overflow: hidden;
  background: url("../../assets/imgs/tech-g4e8397df3_1920.jpg");
  background-size: 100%;
}

#toolbar-trigger {
  position: absolute;
  top: 2rem;
  left: 0;
  height: 1rem;
  width: 100%;
  background-color: rgba(140, 216, 216, 0.8);
}
#toolbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 100%;
}


</style>
