<template>
  <div class="d-flex toolbar">
    <div class="d-flex col">
        <div class="h-100 title ">
          Memorandum []~（￣▽￣）~*
        </div>

      </div>
      <div class="col">
        <div class="d-flex align-items-center justify-content-end h-100">

          <div class="icon none-selection">
            <span class="material-icons" @click="minimize">remove</span>
          </div>
          <div class="icon none-selection close">
            <span class="material-icons" @click="closeApp">close</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'Toolbar',
  methods: {
    moreVert() {

    },
    minimize() {
      ipcRenderer.send('minimize')
    },
    closeApp() {
      ipcRenderer.send('closeApp')
    }
  }
}
</script>

<style scoped lang="css">
  .toolbar {
    height: 2rem;
    background-color: #425B67;
    -webkit-app-region: drag;
    color: white;
  }
  .title {
    font-weight: bold;
    padding-left: 1rem;
    line-height: 2rem;
  }
  .icon {
    -webkit-app-region: no-drag;
    padding-left: 10px;
    padding-right: 10px;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    cursor: pointer;
  }
  .icon span {
    height: 100%;
    width: 100%;
  }

  .icon:hover {
    background-color: #e0dcdc;
  }
  .close:hover {
    background-color: #e35252;
  }
</style>
