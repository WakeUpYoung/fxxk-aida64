<template>
  <b-container>
    Hello World
    <div>{{ currentTemperature }} ℃</div>
    <div>{{ memoryUsed }}%</div>
    <div>{{ cpuUsed }}%</div>
    <div>{{ cpuSpeed }} GHz</div>
  </b-container>
</template>

<script>
import Constant from '../constant'
import sys from 'systeminformation'
import Toolbar from "./Toolbar";
import osu from 'node-os-utils'

export default {
  name: "Dashboard",
  components: {Toolbar},
  data() {
    return {
      currentTemperature: 0,
      systemInfoInterval: null,

      memoryUsed: 0,
      cpuUsed: 0,
      cpuSpeed: 0,

    }
  },

  created() {
  },

  mounted() {
    let vm = this
    this.systemInfoInterval = setInterval(() => {

      osu.cpu.usage().then(cpuPercentage => {
        this.cpuUsed = Math.ceil(cpuPercentage)
      })

      sys.cpuCurrentSpeed()
        .then(data => {
          this.cpuSpeed = data.avg
        })
      sys.cpuTemperature()
        .then(data => {
          let tempArray = data.cores.filter(item => !isNaN(item))
          vm.currentTemperature = tempArray.reduce((n1, n2) => n1 + n2) / tempArray.length
        })
        .catch(error => {})

      sys.mem()
        .then(data => {
          vm.memoryUsed = Math.round(data.used / data.total * 100)
      })
    }, 1000)

  },

  beforeDestroy() {
    if (this.systemInfoInterval) {
      clearInterval(this.systemInfoInterval)
    }
  }

}
</script>

<style scoped>

</style>
