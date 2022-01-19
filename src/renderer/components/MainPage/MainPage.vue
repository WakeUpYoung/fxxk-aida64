<template>
  <div>
    <div id="toolbar-trigger" @mouseenter="showToolbar" @mouseleave="hideToolbar"></div>
    <Toolbar id="toolbar"></Toolbar>
    <b-button class="mt-5" @click="onClick">Click me</b-button>
    <Dashboard></Dashboard>
  </div>
</template>

<script>

import Dashboard from "../Dashboard";
import Toolbar from "../Toolbar";
export default {
  name: 'MainPage',
  components: {Toolbar, Dashboard},
  data() {
    return {

    }
  },
  methods: {
    onClick() {
      let toolbar = document.getElementById('toolbar')
      toolbar.style.top = '0'
      console.log('click .. it', toolbar)
    },

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
  }
}
</script>

<style lang="css" scoped>
#main-page {
  overflow: hidden;
}

#toolbar-trigger {
  position: absolute;
  top: -1rem;
  left: 0;
  height: 4rem;
  width: 100%;
  background-color: transparent;
  z-index: 999;
}
#toolbar {
  position: absolute;
  top: -2rem;
  left: 0;
  width: 100%;
  opacity: 100%;
  z-index: 3;
}


</style>
